output "frontend_bucket" {
  value = cloudfoundry_service_key.frontend-bucket-key.credentials.bucket
}

output "frontend_website_url" {
  value = "http://${cloudfoundry_service_key.frontend-bucket-key.credentials.bucket}.s3-website-us-gov-west-1.amazonaws.com/"
}

output "backend_url" {
  value = "https://${var.strapi_hostname}.${data.cloudfoundry_domain.app.name}"
}
