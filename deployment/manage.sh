#!/bin/sh
#
# This script will bootstrap the creation of a cloud.gov deployment
# environment, to be managed via Terraform.
#

LOGIN_GOV_SERVICE=login-gov
TERRAFORM_SERVICE=terraform-user
TERRAFORM_STORAGE_SERVICE=terraform-storage

usage()
{
    cat << EOF
Manage a cloud.gov deployment environment.

Usage: manage.sh <OPERATION> -o <cloud.gov organization name> -s <cloud.gov space name>

OPERATION:
    print-service-key
    print-bucket-details
    print-terraform-storage-key
    export-terraform-storage-key
    export-service-key
    deploy

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
    printf "${RED}Please an organization name.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${space_name+x} ]; then
    printf "${RED}Please a space name.\n${NC}"
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

export_terraform_storage_key() {
  TERRAFORM_STORAGE_SERVICE_KEY=$(cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE}-key | tail -n +2)
  export AWS_ACCESS_KEY_ID=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .access_key_id)
  export AWS_SECRET_ACCESS_KEY=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .secret_access_key)
  export AWS_DEFAULT_REGION=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .region)
  export BUCKET_NAME=$(echo $TERRAFORM_STORAGE_SERVICE_KEY | jq -r .bucket)
}

export_service_key() {
  SERVICE_KEY=$(cf service-key terraform-user ${TERRAFORM_SERVICE}-key | tail -n +2)
  export CF_USER=$(echo $SERVICE_KEY | jq -r .username)
  export CF_PASSWORD=$(echo $SERVICE_KEY | jq -r .password)
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
    cf create-service-key ${TERRAFORM_SERVICE} ${TERRAFORM_SERVICE}-key
    echo "to get the CF_USERNAME and CF_PASSWORD, execute './bin/cloudgov.sh print-service-key'"
  fi

  if service_exists "${TERRAFORM_STORAGE_SERVICE}" ; then
    echo space "${TERRAFORM_STORAGE_SERVICE}" already created
  else
    cf create-service s3 basic-sandbox ${TERRAFORM_STORAGE_SERVICE}
    cf create-service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE}-key
    export_terraform_storage_key
    aws s3api put-bucket-versioning --bucket $BUCKET_NAME --versioning-configuration Status=Enabled
  fi

  # if service_exists "${LOGIN_GOV_SERVICE}" ; then
  #   echo space "${LOGIN_GOV_SERVICE}" already created
  # else
  #   CERT=`openssl req \
  #     -newkey rsa:2048 \
  #     -new \
  #     -nodes \
  #     -x509 \
  #     -days 3650 \
  #     -subj "/C=US/O=General Services Administration/OU=TTS/CN=gsa.gov"`

  #   PRIVATE_KEY=`echo "${CERT}" | grep -FB 99999 "END PRIVATE KEY" | jq -aRs`
  #   PUBLIC_KEY=`echo "${CERT}" | grep -FA 99999 "BEGIN CERTIFICATE" | jq -aRs`
  #   cf create-user-provided-service "${LOGIN_GOV_SERVICE}" -p "{\"private\": ${PRIVATE_KEY}, \"public\": ${PUBLIC_KEY}}"
  # fi
}

print_service_key() {
  cf service-key terraform-user ${TERRAFORM_SERVICE}-key
}

print_bucket_details() {
  export_terraform_storage_key
  aws s3api get-bucket-encryption --bucket $BUCKET_NAME
  aws s3api get-bucket-policy --bucket $BUCKET_NAME
}

print_terraform_storage_key() {
  cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE}-key
}

deploy() {
  export_terraform_storage_key
  export_service_key
  terraform apply deployment/terraform/workspaces/development
}

while [ "$1" != "" ]; do
  case $1 in
    setup | print-service-key | print-bucket-details | print-terraform-storage-key | export-terraform-storage-key | export-service-key | deploy )  operation=$1
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
  print-service-key )             print_service_key
                                  ;;
  print-bucket-details )          print_bucket_details
                                  ;;
  print-terraform-storage-key )   print_terraform_storage_key
                                  ;;
  export-terraform-storage-key )  export_terraform_storage_key
                                  ;;
  export-service-key )            export_service_key
                                  ;;
  deploy                          ) deploy
                                  ;;
  * )                             usage
                                  exit 1
esac

