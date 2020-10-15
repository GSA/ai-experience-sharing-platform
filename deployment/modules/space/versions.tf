terraform {
  required_version = ">= 0.12.0, < 0.14.0"

  required_providers {
    null = "~> 2.0"
    cloudfoundry = {
      source  = "cloudfoundry-community/cloudfoundry"
      version = "0.12.6"
    }
  }
}
