terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
  backend "s3" {
    bucket = "cg-5da9590f-e848-4a0e-9100-ca36eeabffc1"
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
  strapi_memory                 = 1024
  strapi_instances              = 1
  cf_org                        = "sandbox-gsa"
  cf_space                      = "taylor.zajicek"
  cf_rds_strapi_db_service_plan = "micro-psql"
  cf_s3_strapi_image_plan       = "basic-sandbox"
}
