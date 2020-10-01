data "cloudfoundry_space" "space" {
  org_name = var.cf_org
  name     = var.cf_space
}

data "cloudfoundry_service" "rds" {
  name = "aws-rds"
}

data "cloudfoundry_service" "s3" {
  name = "s3"
}

data "cloudfoundry_domain" "app" {
  name = "app.cloud.gov"
}

data "archive_file" "strapi-image-zip" {
  type = "zip"
  source_dir = "./"
  output_path = "./deployment/strapi-build-image.zip"
  excludes = concat(["**/.git"], split("\n", file(".cfignore")))
}

resource "cloudfoundry_service_instance" "strapi-api-db" {
  name         = "strapi-api-db-${var.cf_env}"
  space        = data.cloudfoundry_space.space.id
  service_plan = data.cloudfoundry_service.rds.service_plans[var.cf_rds_strapi_db_service_plan]
}

resource "cloudfoundry_service_instance" "strapi-image-bucket" {
  name = "strapi-image-bucket-${var.cf_env}"
  space = data.cloudfoundry_space.space.id
  service_plan = data.cloudfoundry_service.s3.service_plans[var.cf_s3_strapi_image_plan]
}

resource "cloudfoundry_app" "strapi-api-host" {
  name = "strapi-api-host-${var.cf_env}"
  space = data.cloudfoundry_space.space.id
  path = "./deployment/strapi-build-image.zip"
  memory = 128
  source_code_hash = data.archive_file.strapi-image-zip.output_base64sha256
  strategy = "blue-green"
  timeout = 600
  service_binding {
    service_instance = cloudfoundry_service_instance.strapi-api-db.id
  }
  service_binding {
    service_instance = cloudfoundry_service_instance.strapi-image-bucket.id
  }
}

resource "cloudfoundry_route" "strapi-api-host" {
  domain = data.cloudfoundry_domain.app.id
  space = data.cloudfoundry_space.space.id
  hostname = "strapi-api-host-${var.cf_env}"
  target {
    app = cloudfoundry_app.strapi-api-host.id
  }
}
