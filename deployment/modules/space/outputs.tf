output "frontend_bucket" {
  value = cloudfoundry_service_key.frontend-bucket-key.credentials.bucket
}

output "frontend_website_url" {
  value = "http://${cloudfoundry_service_key.frontend-bucket-key.credentials.bucket}.s3-website-us-gov-west-1.amazonaws.com/"
}
