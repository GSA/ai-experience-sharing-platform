terraform {
  backend "s3" {
    bucket = "cg-6092672a-785e-407e-894f-c0ed2cb2448e"
    key = "terraform/state/strapi-api-host"
    region = "us-gov-west-1"
  }
}