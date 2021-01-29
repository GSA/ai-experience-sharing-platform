data "cloudfoundry_space" "space" {
  org_name = var.cf_org
  name     = var.cf_space
}

data "cloudfoundry_service" "rds" {
  name = "aws-rds"
}

data "cloudfoundry_service" "s3" {
  name = "s3"
}

data "cloudfoundry_domain" "app" {
  name = "app.cloud.gov"
}
