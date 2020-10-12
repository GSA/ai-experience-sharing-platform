#!/bin/sh
#
# This script will bootstrap the creation of a cloud.gov deployment
# environment, to be managed via Terraform.
#

ORGANIZATION_NAME=sandbox-gsa
SPACE_NAME=daniel.naab

LOGIN_GOV_SERVICE=login-gov
TERRAFORM_SERVICE=terraform-user
TERRAFORM_STORAGE_SERVICE=terraform-storage

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

if [ "$1" = "setup" ] ; then echo
  if space_exists "${SPACE_NAME}" ; then
    echo space "${SPACE_NAME}" already created
  else
    cf create-space ${SPACE_NAME} -o ${ORGANIZATION_NAME}
  fi
fi

cf target -o ${ORGANIZATION_NAME} -s ${SPACE_NAME}

if [ "$1" = "setup" ] ; then echo
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
fi

if [ "$1" = "print-service-key" ] ; then echo
  cf service-key terraform-user ${TERRAFORM_SERVICE}-key
fi

if [ "$1" = "print-bucket-details" ] ; then echo
  export_terraform_storage_key
  aws s3api get-bucket-encryption --bucket $BUCKET_NAME
  aws s3api get-bucket-policy --bucket $BUCKET_NAME
fi

if [ "$1" = "print-terraform-storage-key" ] ; then echo
  cf service-key ${TERRAFORM_STORAGE_SERVICE} ${TERRAFORM_STORAGE_SERVICE}-key
fi

if [ "$1" = "export-terraform-storage-key" ] ; then echo
  export_terraform_storage_key
fi

if [ "$1" = "export-service-key" ] ; then echo
  export_service_key
fi

if [ "$1" = "deploy" ] ; then echo
  export_terraform_storage_key
  export_service_key
  terraform apply deployment/terraform/workspaces/development
fi
