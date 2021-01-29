variable "cf_org" {
  description = "cloud.gov organization for the deployment environment"
}

variable "cf_space" {
  description = "cloud.gov space to deploy into; there is one deployment per space"
}

variable "cf_rds_strapi_db_service_plan" {
  description = "Service plan for Postgres RDS service instance"
}

variable "cf_s3_strapi_image_plan" {
  description = "Service plan for S3 storage for Strapi media files"
}

variable "strapi_hostname" {
  description = "Cloud.gov app/host name"
}

variable "strapi_memory" {
  description = "How much memory each strapi instance gets"
}

variable "strapi_instances" {
  description = "How many strapi instances are deployed"
}
