# Deployment infrastructure

This package includes the IOC for a cloud.gov deployment of the Strapi backend, including the self-hosted frontend UI.

## Usage

This configuration is intended to be run via CI, and consists of two components:

- [./manage.sh](manage.sh) - bootstrap script for all actions
- [./terraform](terraform) - Terraform configuration

### Bootstrap cloud.gov

First, you must initialize a new cloud.gov space. This includes creating a space in the target cloud.gov organization, an S3 bucket for Terraform state storage, and a service user and corresponding key for CI jobs. Use the setup operation for this purpose:

```bash
./deployment/manage.sh setup -o <organization name> -s <space name>
```

### Create Terraform workspace

Create a new Terraform workspace in the [./deployment/workspace](./deployment/workspace) directory, using one of the existing workspaces as a template.

Necessary environment configuration may be found with this helper:

```bash
./deployment/manage.sh show -o <organization name> -s <space name>
```


### Deploy

Subsequently, you may use Terraform to deploy into the created cloud.gov space, using the credentials created by the setup job. First, export the necessary credentials into the current environment:

```bash
# So we can create cloud.gov resources, export CF_USER and CF_PASSWORD for the service user, as well as AWS credentials to the Terraform S3 bucket:
source ./deployment/manage.sh export \
    -o <organization name> \
    -s <space name>
```

... and then deploy with Terraform:

```bash
terraform init deployment/workspaces/<space name>
terraform apply deployment/workspaces/<space name>
```

Subsequently, there is a helper that will handle the export and apply in one step:

```bash
./deployment/manage.sh deploy -o <organization name> -s <space name>
```

### Login.gov Configuration

After bootstraping cloud.gov `manage.sh` will create public and private rsa keys in `./deployment` in the format of `deployment/login-gov-${organization_name}-${space_name}-cert.pem`. The public key needs to be added to https://dashboard.int.identitysandbox.gov/service_providers/YOUR_NUMBER_HERE . You will also need to configure redirect URIs for your new environment.
