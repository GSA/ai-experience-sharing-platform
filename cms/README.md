# Strapi backend

This is the headless CMS backend.

### The following npm scripts are defined

 * `npm run develop`
    * Runs the cms with file watching turned on. Changes and new content types are detected and Strapi is restarted.
 * `npm run start`
    * Runs the cms very similar to production.
 * `npm run build`
    * Runs the webpack build for the strapi admin UI. Needed for changes like strapi version changes, plugin changes.
 * `npm run strapi`
    * Runs the strapi cli help to see additional tools available.

### Useful links

 + https://strapi.io/documentation/v3.x/getting-started/quick-start.html
 + https://github.com/simov/grant
 + https://casl.js.org/v4/en/guide/intro
 + https://nodejs.org/dist/latest-v12.x/docs/How/
 + https://github.com/cloud-gov/cf-service-connect
 + https://github.com/flexion/strapi-provider-upload-aws-s3-auth

### How to develop with strapi

By default strapi will use a local sqlite3 database. You can configure which database connection is used with environment variables. The example below uses https://github.com/cloud-gov/cf-service-connect to create a local connection to the postgres database and tells us the values needed below.

```bash
cf connect-to-service -no-client strapi-api-host strapi-api-db
```

Outputs somthing similar to below.

```bash
Finding the service instance details...
Setting up SSH tunnel...
SSH tunnel created.
Skipping call to client CLI. Connection information:

Host: localhost
Port: 60000
Username: example_username
Password: example_password
Name: example_db_name

Leave this terminal open while you want to use the SSH tunnel. Press Control-C to stop.
```

Output from above is put into the correct enviroment variables.

```bash
S3_ACCESS_KEY_ID=example_s3 S3_SECRET_ACCESS_KEY=example_s3 S3_REGION=example_s3 S3_BUCKET=example_s3 NODE_ENV=development CF_FAKE=1 DATABASE_NAME=example_db_name DATABASE_USERNAME=example_username DATABASE_PASSWORD=example_password DATABASE_PORT=60000 npm run develop
```

### How to debug with straipi

```bash
S3_ACCESS_KEY_ID=example_s3 S3_SECRET_ACCESS_KEY=example_s3 S3_REGION=example_s3 S3_BUCKET=example_s3 NODE_ENV=development CF_FAKE=1 DATABASE_NAME=example_db_name DATABASE_USERNAME=example_username DATABASE_PASSWORD=example_password DATABASE_PORT=60000 node --inspect ./node_modules/.bin/strapi start
```

Using nodejs's inspector, https://nodejs.org/en/docs/guides/debugging-getting-started/. You can run the command above and point Google Chrome at `chrome://inspect` and then select the link titled 'Open dedicated DevTools for Node'.

### Github Actions



## Strapi design considerations

 + 404's are handled by the SPA and not strapi to enable modern SPA url's.
 + Streaming media is handled via signed S3 urls because there are currently rough edges around https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html#createReadStream-property
