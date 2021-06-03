terraform {
  required_providers {
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
  backend "s3" {
    bucket = "cg-145e9c3d-6b2e-4380-a043-de8a265ba1aa"
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
  strapi_hostname               = "strapi-api-host-dev"
  strapi_memory                 = 1024
  strapi_instances              = 1
  cf_org                        = "tts-ai-digitalpresence"
  cf_space                      = "dev"
  cf_rds_strapi_db_service_plan = "micro-psql"
  cf_s3_strapi_image_plan       = "basic"
}
