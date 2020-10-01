const cloudFoundryServiceConfig = require('./cloud-foundry-data').getServiceConfig;
const cloudFoundryConfig = cloudFoundryServiceConfig();

module.exports = ({ env }) => {
  return {
    upload: {
      "provider": "aws-s3",
      "providerOptions": {
        "accessKeyId": env('S3_ACCESS_KEY_ID', cloudFoundryConfig['s3'][0].credentials.access_key_id),
        "secretAccessKey": env('S3_SECRET_ACCESS_KEY', cloudFoundryConfig['s3'][0].credentials.secret_access_key),
        "region": env('S3_REGION', cloudFoundryConfig['s3'][0].credentials.region),
        "params": {
          "Bucket": env('S3_BUCKET', cloudFoundryConfig['s3'][0].credentials.bucket)
        }
      }
    }
  };
};
