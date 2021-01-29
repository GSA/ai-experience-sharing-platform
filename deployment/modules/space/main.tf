data "archive_file" "strapi-image-zip" {
  type        = "zip"
  source_dir  = "./cms"
  output_path = "./deployment/strapi-build-image.zip"
  excludes    = concat(["**/.git"], split("\n", file(".cfignore")))
}

data "cloudfoundry_user_provided_service" "login-gov" {
  name  = "login-gov"
  space = data.cloudfoundry_space.space.id
}

data "cloudfoundry_user_provided_service" "cms-service" {
  name  = "cms-service"
  space = data.cloudfoundry_space.space.id
}

resource "cloudfoundry_service_instance" "strapi-api-db" {
  name            = "strapi-api-db"
  space           = data.cloudfoundry_space.space.id
  service_plan    = data.cloudfoundry_service.rds.service_plans[var.cf_rds_strapi_db_service_plan]
  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudfoundry_service_instance" "strapi-image-bucket" {
  name         = "strapi-image-bucket"
  space        = data.cloudfoundry_space.space.id
  service_plan = data.cloudfoundry_service.s3.service_plans[var.cf_s3_strapi_image_plan]
}

resource "cloudfoundry_service_key" "strapi-image-bucket-key" {
  name             = "strapi-image-bucket"
  service_instance = cloudfoundry_service_instance.strapi-image-bucket.id
}

resource "null_resource" "strapi-image-bucket-media-streaming" {
  triggers = {
    src_hash = sha256(file("${path.module}/cors.json"))
  }
  provisioner "local-exec" {
    # Turn on S3 website hosting mode on the bucket
    command = "aws s3api put-bucket-cors --bucket ${cloudfoundry_service_key.strapi-image-bucket-key.credentials.bucket} --cors-configuration file://${path.module}/cors.json"
    environment = {
      AWS_ACCESS_KEY_ID = cloudfoundry_service_key.strapi-image-bucket-key.credentials.access_key_id
      AWS_SECRET_ACCESS_KEY = cloudfoundry_service_key.strapi-image-bucket-key.credentials.secret_access_key
      AWS_DEFAULT_REGION = cloudfoundry_service_key.strapi-image-bucket-key.credentials.region
    }
  }
}

resource "cloudfoundry_route" "strapi-api-host" {
  domain   = data.cloudfoundry_domain.app.id
  space    = data.cloudfoundry_space.space.id
  hostname = var.strapi_hostname
}

resource "cloudfoundry_app" "strapi-api-host" {
  name             = "strapi-api-host"
  space            = data.cloudfoundry_space.space.id
  path             = "./deployment/strapi-build-image.zip"
  memory           = var.strapi_memory
  instances        = var.strapi_instances
  source_code_hash = data.archive_file.strapi-image-zip.output_base64sha256
  strategy         = "blue-green"
  timeout          = 600
  service_binding {
    service_instance = cloudfoundry_service_instance.strapi-api-db.id
  }
  service_binding {
    service_instance = cloudfoundry_service_instance.strapi-image-bucket.id
  }
  service_binding {
    service_instance = data.cloudfoundry_user_provided_service.login-gov.id
  }
  service_binding {
    service_instance = data.cloudfoundry_user_provided_service.cms-service.id
  }
  routes {
    route = cloudfoundry_route.strapi-api-host.id
  }
  environment = {
    CMSURL = "https://${var.strapi_hostname}.${data.cloudfoundry_domain.app.name}"
  }
}
