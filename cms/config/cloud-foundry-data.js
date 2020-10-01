const isLocalOverride = !!process.env.CF_FAKE;

const cloudFoundryApplicationConfig = {
  isLocal: isLocalOverride ? false : true,
  application_uris: [""],
};

const cloudFoundryServiceConfig = {
  isLocal: isLocalOverride ? false : true,
  "aws-rds": [
    {
      "binding_name": null,
      "credentials": {
        "db_name": "",
        "host": "",
        "name": "",
        "password": "",
        "port": "5432",
        "uri": "",
        "username": ""
      },
      "instance_name": "",
      "label": "aws-rds",
      "name": "strapi-api-db-dev",
      "plan": "",
      "provider": null,
      "syslog_drain_url": null,
      "tags": [
        "database",
        "RDS"
      ],
      "volume_mounts": []
    },
  ],
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
    },
  ],
};


module.exports = {
  getServiceConfig: ( env ) => {
    if (env) {
      return {};
    } else {
      if (process.env.VCAP_SERVICES) {
        const serviceConfig = JSON.parse(process.env.VCAP_SERVICES);
        serviceConfig.isLocal = false;
        return serviceConfig;
      } else {
        return cloudFoundryServiceConfig;
      }
    }
  },
  getApplicationConfig: ( env ) => {
    if (env) {
      return {};
    } else {
      if (process.env.VCAP_APPLICATION) {
        const applicationConfig = JSON.parse(process.env.VCAP_APPLICATION);
        applicationConfig.isLocal = false;
        return applicationConfig;
      } else {
        return cloudFoundryApplicationConfig;
      }
    }
  },
}
