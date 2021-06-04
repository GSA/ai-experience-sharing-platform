terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
  backend "s3" {
    bucket = "cg-696733e1-c6a8-4376-9bb9-3cf21b5b481e"
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
  strapi_hostname               = "strapi-api-host-staging"
  strapi_memory                 = 1024
  strapi_instances              = 6
  cf_org                        = "tts-ai-digitalpresence"
  cf_space                      = "staging"
  cf_rds_strapi_db_service_plan = "micro-psql"
  cf_s3_strapi_image_plan       = "basic"
}
