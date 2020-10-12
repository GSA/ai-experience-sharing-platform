# Deployment infrastructure

This package includes the IOC for a cloud.gov deployment of the Strapi backend, including the self-hosted frontend UI.

## Usage

This configuration is intended to be run via CI, and consists of two components:

- [./manage.sh](manage.sh) - bootstrap script for all actions
- [./terraform](terraform) - Terraform configuration

First, you must initialize a new cloud.gov space. This includes creating a space in the target cloud.gov organization, an S3 bucket for Terraform state storage, and a service user and corresponding key for CI jobs. Use the setup operation for this purpose:

```bash
./deployment/manage.sh setup -o <organization name> -s <space name>
```

Subsequently, you may use Terraform to deploy into the created cloud.gov space, using the credentials created by the setup job. First, export the necessary credentials into the current environment:

```bash
# Export the AWS credentials to access the Terraform state S3 bucket:
source ./deployment/manage.sh export-terraform-storage-key \
    -o <organization name> \
    -s <space name>
# Export CF_USER and CF_PASSWORD for the service user, so we can create cloud.gov resources:
source ./deployment/manage.sh export-service-key \
    -o <organization name> \
    -s <space name>
```

... and then deploy with Terraform, where `LOGINGOV_KEY` is the private key for a login.gov-registered application:

```bash
terraform init deployment/terraform
terraform apply -var="cf_strapi_logingov_key=${LOGINGOV_KEY}" deployment/terraform
```
