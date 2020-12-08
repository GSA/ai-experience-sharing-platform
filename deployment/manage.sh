#!/bin/bash
#
# This script will bootstrap the creation of a cloud.gov deployment
# environment, to be managed via Terraform.
#

#set -eo pipefail

CMS_SERVICE=cms-service
LOGIN_GOV_SERVICE=login-gov
TERRAFORM_SERVICE=terraform-user
TERRAFORM_SERVICE_KEY=${TERRAFORM_SERVICE}-key
TERRAFORM_STORAGE_SERVICE=terraform-storage
TERRAFORM_STORAGE_SERVICE_KEY=${TERRAFORM_STORAGE_SERVICE}-key
S3BUCKETTYPE=basic

usage()
{
    cat << EOF
Manage a cloud.gov deployment environment.

Usage: manage.sh <OPERATION> -o <cloud.gov organization name> -s <cloud.gov space name>

OPERATION:
    setup   - create a new cloud.gov space, login.gov certificate, and strapi secrets
    show    - show Terraform S3 and cloud.gov credentials
    export  - when used with `source`, exports credentials to the environment
    deploy  - deploy the locally-built application via Terraform

Options:
  -o, --organization organization_name   Cloud.gov organization name
  -s, --space space_name                 Cloud.gov space name
  -h                                     Print usage
EOF
}

validate_parameters()
{
  if [ -z ${operation+x} ]; then
    printf "${RED}Please supply an operation.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${organization_name+x} ]; then
    printf "${RED}Please provide an organization name.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${space_name+x} ]; then
    printf "${RED}Please provide a space name.\n${NC}"
    usage
    exit 1
  fi
}

space_exists() {
  cf space "$1" >/dev/null 2>&1
}

service_exists() {
  cf service "$1" >/dev/null 2>&1
}

service_key_exists() {
  cf service-key "$1" "$2" >/dev/null 2>&1
}

export_terraform_storage_key() {
  echo "Querying for ${TERRAFORM_STORAGE_SERVICE}..."
  TERRAFORM_STORAGE_SERVICE_KEY=$(cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE_KEY} | tail -n +2)
  echo "Exporting ${TERRAFORM_STORAGE_SERVICE} S3 AWS credentials..."
  export AWS_ACCESS_KEY_ID=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .access_key_id)
  export AWS_SECRET_ACCESS_KEY=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .secret_access_key)
  export AWS_DEFAULT_REGION=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .region)
  export BUCKET_NAME=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .bucket)
}

export_service_key() {
  echo "Querying for ${TERRAFORM_SERVICE_KEY}..."
  SERVICE_KEY=$(cf service-key terraform-user ${TERRAFORM_SERVICE_KEY} | tail -n +2)
  echo "Exporting ${TERRAFORM_SERVICE_KEY} CF_USER, CF_PASSWORD..."
  export CF_USER=$(echo $SERVICE_KEY | jq -r .username)
  export CF_PASSWORD=$(echo $SERVICE_KEY | jq -r .password)
}

export_environment() {
  export_terraform_storage_key
  export_service_key
}

setup() {
  if space_exists "${space_name}" ; then
    echo space "${space_name}" already created
  else
    cf create-space ${space_name} -o ${organization_name}
  fi

  if service_exists "${TERRAFORM_SERVICE}" ; then
    echo ${TERRAFORM_SERVICE} already created
  else
    cf create-service cloud-gov-service-account space-deployer ${TERRAFORM_SERVICE}
  fi

  if service_exists "${TERRAFORM_STORAGE_SERVICE}" ; then
    echo space "${TERRAFORM_STORAGE_SERVICE}" already created
  else
    cf create-service s3 ${S3BUCKETTYPE} ${TERRAFORM_STORAGE_SERVICE}
  fi

  setup_keys

  export_environment
  aws s3api put-bucket-versioning --bucket ${BUCKET_NAME} --versioning-configuration Status=Enabled

  if service_exists "${LOGIN_GOV_SERVICE}" ; then
    echo space "${LOGIN_GOV_SERVICE}" already created
  else
    openssl req \
      -newkey rsa:2048 \
      -new \
      -nodes \
      -x509 \
      -days 3650 \
      -subj "/C=US/O=General Services Administration/OU=TTS/CN=gsa.gov" \
      -keyout deployment/login-gov-${organization_name}-${space_name}-key.pem \
      -out deployment/login-gov-${organization_name}-${space_name}-cert.pem

    PRIVATE_KEY=`cat deployment/login-gov-${organization_name}-${space_name}-key.pem | jq -aRs`
    CERTIFICATE=`cat deployment/login-gov-${organization_name}-${space_name}-cert.pem | jq -aRs`
    ISSUER="urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:ai_experience"
    cf create-user-provided-service "${LOGIN_GOV_SERVICE}" -p "{\"issuer\": \"${ISSUER}\", \"privateKey\": ${PRIVATE_KEY}, \"certificate\": ${CERTIFICATE}}"
  fi

  if service_exists "${CMS_SERVICE}" ; then
    echo space "${CMS_SERVICE}" already created
  else

    ADMIN_JWT_SECRET=`openssl rand 128 | LC_ALL=C tr -dc 'A-Za-z0-9!#$%&()*+,-./:;<=>?@[\]^_{|}~' | head -c 32`
    JWT_SECRET=`openssl rand 128 | LC_ALL=C tr -dc 'A-Za-z0-9!#$%&()*+,-./:;<=>?@[\]^_{|}~' | head -c 32`
    SESSION_SECRET_1=`openssl rand 128 | LC_ALL=C tr -dc 'A-Za-z0-9!#$%&()*+,-./:;<=>?@[\]^_{|}~' | head -c 32`
    SESSION_SECRET_2=`openssl rand 128 | LC_ALL=C tr -dc 'A-Za-z0-9!#$%&()*+,-./:;<=>?@[\]^_{|}~' | head -c 32`
    cf create-user-provided-service "${CMS_SERVICE}" -p "{\"adminJwtSecret\": \"${ADMIN_JWT_SECRET}\", \"jwtSecret\": \"${JWT_SECRET}\", \"sessionSecret1\": \"${SESSION_SECRET_1}\", \"sessionSecret2\": \"${SESSION_SECRET_2}\"}"
  fi
}

setup_keys() {
  if service_key_exists "${TERRAFORM_SERVICE}" "${TERRAFORM_SERVICE_KEY}" ; then
    echo ${TERRAFORM_SERVICE_KEY} already created
  else
    echo "Creating ${TERRAFORM_SERVICE_KEY}..."
    cf create-service-key ${TERRAFORM_SERVICE} ${TERRAFORM_SERVICE_KEY}
  fi

  if service_key_exists "${TERRAFORM_STORAGE_SERVICE}" "${TERRAFORM_STORAGE_SERVICE_KEY}" ; then
    echo ${TERRAFORM_STORAGE_SERVICE_KEY} already created
  else
    echo "Creating ${TERRAFORM_STORAGE_SERVICE_KEY}..."
    cf create-service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE_KEY}
  fi

  echo "To see service keys, execute './deployment/manage.sh'"
}

print_service_key() {
  cf service-key terraform-user ${TERRAFORM_SERVICE_KEY}
}

print_bucket_details() {
  export_terraform_storage_key
  aws s3api get-bucket-encryption --bucket $BUCKET_NAME
  aws s3api get-bucket-versioning --bucket $BUCKET_NAME
}

print_terraform_storage_key() {
  cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE_KEY}
}

show() {
  print_service_key
  print_terraform_storage_key
  print_bucket_details
}

deploy() {
  export_environment
  terraform apply deployment/workspaces/${space_name}
}

while [ "$1" != "" ]; do
  case $1 in
    setup | show | export | deploy )  operation=$1
                                ;;
    -o | --organization )       shift
                                organization_name=$1
                                ;;
    -s | --space )              shift
                                space_name=$1
                                ;;
    -h | --help )               usage
                                exit
                                ;;
    * )                         usage
                                exit 1
  esac
  shift
done

validate_parameters

# Target all operations to the provided organization/space pair.
cf target -o ${organization_name} -s ${space_name}

case $operation in
  setup )                         setup
                                  ;;
  show )                          show
                                  ;;
  export )                        export_environment
                                  ;;
  deploy )                        deploy
                                  ;;
  * )                             usage
                                  exit 1
esac

