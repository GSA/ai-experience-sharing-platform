module.exports = ({ env }) => {
  const serviceDetailsConfig = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {
    "s3": [
      {
        "binding_name": null,
        "credentials": {
          "access_key_id": "",
          "additional_buckets": [],
          "bucket": "",
          "fips_endpoint": "",
          "region": "",
          "secret_access_key": "",
          "uri": ""
        },
        "instance_name": "",
        "label": "s3",
        "name": "",
        "plan": "",
        "provider": null,
        "syslog_drain_url": null,
        "tags": [],
        "volume_mounts": []
      }
    ]
  };

  return {
    upload: {
      "provider": "aws-s3",
      "providerOptions": {
        "accessKeyId": serviceDetailsConfig['s3'][0].credentials.access_key_id,
        "secretAccessKey": serviceDetailsConfig['s3'][0].credentials.secret_access_key,
        "region": serviceDetailsConfig['s3'][0].credentials.region,
        "params": {
          "Bucket": serviceDetailsConfig['s3'][0].credentials.bucket
        }
      }
    }
  };
};
