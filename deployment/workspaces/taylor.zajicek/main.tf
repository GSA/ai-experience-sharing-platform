terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
  backend "s3" {
    bucket = "cg-6092672a-785e-407e-894f-c0ed2cb2448e"
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
  strapi_hostname               = "strapi-api-host-main"
  cf_org                        = "sandbox-gsa"
  cf_space                      = "taylor.zajicek"
  cf_rds_strapi_db_service_plan = "shared-psql"
  cf_s3_strapi_image_plan       = "basic-public-sandbox"
}
