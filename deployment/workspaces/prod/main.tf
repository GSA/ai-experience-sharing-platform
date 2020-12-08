terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
  backend "s3" {
    bucket = "cg-7ef37c4a-129b-4f05-91ef-491330f405a6"
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
  strapi_hostname               = "strapi-api-host-prod"
  cf_org                        = "tts-ai-digitalpresence"
  cf_space                      = "prod"
  cf_rds_strapi_db_service_plan = "small-psql"
  cf_s3_strapi_image_plan       = "basic"
}
