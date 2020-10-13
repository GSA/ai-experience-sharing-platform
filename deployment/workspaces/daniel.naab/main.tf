terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
  backend "s3" {
    bucket = "cg-3fa8c3d7-caeb-4b8f-9e58-92658816d0c9"
    key    = "terraform/state/strapi-api-host"
    region = "us-gov-west-1"
  }
}

provider "cloudfoundry" {
  api_url      = "https://api.fr.cloud.gov"
  app_logs_max = 30
}

module "ai_experience_environment" {
  source                        = "../../modules/space"
  strapi_hostname               = "strapi-api-host-danielnaab"
  cf_org                        = "sandbox-gsa"
  cf_space                      = "daniel.naab"
  cf_rds_strapi_db_service_plan = "shared-psql"
  cf_s3_strapi_image_plan       = "basic-public-sandbox"
  cf_s3_frontend_plan           = "basic-public-sandbox"
}
