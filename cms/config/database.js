module.exports = ({ env }) => {
  const serviceDetailsConfig = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {
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
       }
     ]
  };

  return {
    defaultConnection: 'pg', //(process.env.VCAP_SERVICES ? 'pg' : 'default'),
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        options: {
          useNullAsDefault: true,
        },
      },
      pg: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: env('DATABASE_HOST', serviceDetailsConfig['aws-rds'][0].credentials['host']),
          port: env.int('DATABASE_PORT', serviceDetailsConfig['aws-rds'][0].credentials['port']),
          database: env('DATABASE_NAME', serviceDetailsConfig['aws-rds'][0].credentials['db_name']),
          username: env('DATABASE_USERNAME', serviceDetailsConfig['aws-rds'][0].credentials['username']),
          password: env('DATABASE_PASSWORD', serviceDetailsConfig['aws-rds'][0].credentials['password']),
        },
      }
    },
  };
};
