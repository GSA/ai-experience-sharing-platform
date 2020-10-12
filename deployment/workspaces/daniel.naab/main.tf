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
  cf_env                        = "dev"
  cf_org                        = "sandbox-gsa"
  cf_space                      = "daniel.naab"
  cf_rds_strapi_db_service_plan = "shared-psql"
  cf_s3_strapi_image_plan       = "basic-public-sandbox"
  cf_s3_frontend_plan           = "basic-public-sandbox"
  cf_strapi_logingov_key        = ""
  strapi_login_gov_issuer       = "urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:ai_experience"
  strapi_login_gov_cert         = <<EOF
-----BEGIN CERTIFICATE-----
MIICljCCAX4CCQDvdsQ06oVuUzANBgkqhkiG9w0BAQsFADANMQswCQYDVQQGEwJ1
czAeFw0yMDA5MzAxNjI1NDhaFw0zMDA5MjgxNjI1NDhaMA0xCzAJBgNVBAYTAnVz
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArYfFIp/P6Y/rzPvHK7tq
s1xL/XK+rY+3PSWHaIXEWj8Py7asz5D+wA25ORtp4nVX1geSw0zdStVNd9vBW0J/
9GGe4Sek+isEsY/eYwtSR8Ex1XmFQZlTzMA+mBwMyBv741jGKqFiXwyMirr8nXaF
dvPqeMLzpON2w4DBbqr6G910cHsdYSC3yjr6CvXj5Jb3ccVOD/yslcT5kvNSm7C1
VupN4HB3zkSmT4besZS+HZ5woFykLI+5Dx+LEQH1RK/DQUJAJvHe50+37cdvjlcu
j9ZT15udTcty+EbXu3E6PhE4MPzq1m1b7CKnA/5nPgASq8ZpxCEWYlwrBcpELRYU
7wIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAtHnYdumcOJ6/wiVq4KQjQspK+q/X1
599DIfI+h/bqEfbgLImf/Y3dIEkAjI9W5GxVBv8NdBI1ssTkbyPhERUeYYwSDKJ1
OrAiAXjkeSOYcg3b6oB8l9s9yw4Dt2YIsnEtS5VbbjxVNGXTyUoVQun4duSUr32d
QEWgEmYeVfoxq3x00y0rntEcm3fFqaUL5Nq4mvuZdlkhJe13ynK3uq6EJU83pilI
iq1ZlImeCHPLnX1PYBksZWFC2TAN/vaLRDHptLCyG4O071RM1fqgdQv99gC1p3S0
MiSNpUfbIAUmKFVARq4+e0SOiFVlbVBLGvrHIa4qm7Xd5vJxlLzfisYA
-----END CERTIFICATE-----
EOF
}
