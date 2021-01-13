const cloudFoundryServiceConfig = require('./cloud-foundry-data').getServiceConfig;
const cloudFoundryConfig = cloudFoundryServiceConfig();

module.exports = ({ env }) => {
  console.log(
    cloudFoundryConfig['aws-rds'][0].credentials['host'],
    cloudFoundryConfig['aws-rds'][0].credentials['port'],
    cloudFoundryConfig['aws-rds'][0].credentials['db_name'],
    cloudFoundryConfig['aws-rds'][0].credentials['username'],
    'J' === cloudFoundryConfig['aws-rds'][0].credentials['password'].substr(-1)
  )

  return {
    defaultConnection: cloudFoundryConfig.isLocal ? 'default' : 'pg',
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
          host: env('DATABASE_HOST', cloudFoundryConfig['aws-rds'][0].credentials['host']),
          port: env.int('DATABASE_PORT', cloudFoundryConfig['aws-rds'][0].credentials['port']),
          database: env('DATABASE_NAME', cloudFoundryConfig['aws-rds'][0].credentials['db_name']),
          username: env('DATABASE_USERNAME', cloudFoundryConfig['aws-rds'][0].credentials['username']),
          password: env('DATABASE_PASSWORD', cloudFoundryConfig['aws-rds'][0].credentials['password']),
        },
        options: {},
      }
    },
  };
};
