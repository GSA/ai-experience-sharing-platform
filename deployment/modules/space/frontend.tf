resource "cloudfoundry_service_instance" "frontend-bucket" {
  name         = "frontend-bucket"
  space        = data.cloudfoundry_space.space.id
  service_plan = data.cloudfoundry_service.s3.service_plans[var.cf_s3_frontend_plan]
}

resource "cloudfoundry_service_key" "frontend-bucket-key" {
  name             = "frontend-bucket-key"
  service_instance = cloudfoundry_service_instance.frontend-bucket.id
}

resource "null_resource" "frontend-assets-bucket-website-hosting-mode" {
  triggers = {
    src_hash = sha256(file("${path.module}/frontend-bucket-website.json"))
  }
  provisioner "local-exec" {
    # Turn on S3 website hosting mode on the bucket
    command = "aws s3api put-bucket-website --bucket ${cloudfoundry_service_key.frontend-bucket-key.credentials.bucket} --website-configuration file://${path.module}/frontend-bucket-website.json"
    environment = {
      AWS_ACCESS_KEY_ID     = cloudfoundry_service_key.frontend-bucket-key.credentials.access_key_id
      AWS_SECRET_ACCESS_KEY = cloudfoundry_service_key.frontend-bucket-key.credentials.secret_access_key
      AWS_DEFAULT_REGION    = cloudfoundry_service_key.frontend-bucket-key.credentials.region
    }
  }
}

data "archive_file" "frontend-assets" {
  type        = "zip"
  source_dir  = "./ui/build"
  output_path = "./deployment/frontend-assets.zip"
}

resource "null_resource" "frontend-assets" {
  triggers = {
    src_hash = data.archive_file.frontend-assets.output_base64sha256
  }

  provisioner "local-exec" {
    command = "aws s3 sync ./ui/build/ s3://${cloudfoundry_service_key.frontend-bucket-key.credentials.bucket}/"
    environment = {
      AWS_ACCESS_KEY_ID     = cloudfoundry_service_key.frontend-bucket-key.credentials.access_key_id
      AWS_SECRET_ACCESS_KEY = cloudfoundry_service_key.frontend-bucket-key.credentials.secret_access_key
      AWS_DEFAULT_REGION    = cloudfoundry_service_key.frontend-bucket-key.credentials.region
    }
  }

  # We don't have blue/green configured for the frontend assets.
  # Since the frontend sync is faster deploy than the backend, sync the assets
  # after the backend.
  depends_on = [
    cloudfoundry_app.strapi-api-host
  ]
}
