data "archive_file" "strapi-image-zip" {
  type        = "zip"
  source_dir  = "./cms"
  output_path = "./deployment/strapi-build-image.zip"
  excludes    = concat(["**/.git"], split("\n", file(".cfignore")))
}

resource "cloudfoundry_user_provided_service" "login-gov" {
  name  = "login-gov"
  space = data.cloudfoundry_space.space.id
  credentials = {
    certificate = lookup(var.cf_strapi_logingov_cert, var.cf_env)
    public_key  = var.cf_strapi_logingov_key
    issuer      = lookup(var.cf_strapi_logingov_issuer, var.cf_env)
  }
}

resource "cloudfoundry_service_instance" "strapi-api-db" {
  name         = "strapi-api-db-${var.cf_env}"
  space        = data.cloudfoundry_space.space.id
  service_plan = data.cloudfoundry_service.rds.service_plans[var.cf_rds_strapi_db_service_plan]
}

resource "cloudfoundry_service_instance" "strapi-image-bucket" {
  name         = "strapi-image-bucket-${var.cf_env}"
  space        = data.cloudfoundry_space.space.id
  service_plan = data.cloudfoundry_service.s3.service_plans[var.cf_s3_strapi_image_plan]
}

resource "cloudfoundry_route" "strapi-api-host" {
  domain   = data.cloudfoundry_domain.app.id
  space    = data.cloudfoundry_space.space.id
  hostname = "strapi-api-host-${var.cf_env}"
}

resource "cloudfoundry_app" "strapi-api-host" {
  name             = "strapi-api-host-${var.cf_env}"
  space            = data.cloudfoundry_space.space.id
  path             = "./deployment/strapi-build-image.zip"
  memory           = 128
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
    service_instance = cloudfoundry_user_provided_service.login-gov.id
  }
  routes {
    route = cloudfoundry_route.strapi-api-host.id
  }
  environment = {
    CMSURL          = "https://strapi-api-host-${var.cf_env}.${data.cloudfoundry_domain.app.name}"
    LOGINGOV_CERT   = lookup(var.cf_strapi_logingov_cert, var.cf_env)
    LOGINGOV_KEY    = var.cf_strapi_logingov_key
    LOGINGOV_ISSUER = lookup(var.cf_strapi_logingov_issuer, var.cf_env)
  }
}
