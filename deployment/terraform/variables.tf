variable "cf_api_url" { default = "https://api.fr.cloud.gov" }

variable "cf_env" { default = "dev" }
variable "cf_org" { default = "sandbox-gsa" }
variable "cf_space" {}
variable "cf_rds_strapi_db_service_plan" { default = "shared-psql" }
variable "cf_s3_strapi_image_plan" { default = "basic-public-sandbox" }
variable "cf_s3_frontend_plan" { default = "basic-public-sandbox" }

variable "cf_strapi_logingov_key" { default = "" }

variable "cf_strapi_logingov_issuer" {
  type = map
  default = {
    dev = "urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:ai_experience"
  }
}

variable "cf_strapi_logingov_cert" {
  type = map
  default = {
    dev = <<EOF
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
}
