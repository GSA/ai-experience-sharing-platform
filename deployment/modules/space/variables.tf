variable "cf_env" {
  description = "Shorthand dentifier for this environment"
}

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

variable "cf_s3_frontend_plan" {
  description = "Service plan for S3 storage for frontend web assets"
}

variable "cf_strapi_logingov_key" {
  description = "Private key for login.gov certificate"
}

variable "cf_strapi_logingov_issuer" {
  description = "OpenID Connect issuer namespace for login.gov"
}

variable "cf_strapi_logingov_cert" {
  description = "Public key of login.gov certificate"
}
