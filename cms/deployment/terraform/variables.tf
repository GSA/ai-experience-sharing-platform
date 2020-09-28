variable "cf_api_url" {default = "https://api.fr.cloud.gov"}

variable "s3_terraform_region" {}
variable "s3_terraform_bucket" {}

variable "cf_env" {default = "dev"}
variable "cf_org" {default = "sandbox-gsa"}
variable "cf_space" {default = "taylor.zajicek"}
variable "cf_rds_strapi_db_service_plan" {default = "shared-psql"}
variable "cf_s3_strapi_image_plan" {default = "basic-public-sandbox"}
