## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
Out of the box the UI expects the cms to be running locally at http://localhost:1337. For details on running the CMS locally see the [README.md](https://github.com/GSA/ai-experience-sharing-platform/blob/develop/cms/README.md). Another option is to modify where the UI proxy is pointed to https://github.com/GSA/ai-experience-sharing-platform/blob/develop/ui/src/setupProxy.js#L3.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn run prebuild`

Launches a prebuild script that indexes content and prepares environment variables.

**prepareEnv()** - forwards environment variables from federalist to create-react-app

**prepareContent()** - parses markdown and appends objects with table of contents and excerpt. Creates an index.json file in each content directory that contains all content objects.

**indexMenus()** - Creates an index.json file in the menu directory that contains all menu objects.

### `yarn run build`

Builds the app for production to the `build` folder.

## Content Workflow

### NetlifyCMS

This site uses NetlifyCMS to build and manage content. All content updates are made to the `content` branch.

The content and admin files are located in the `/plublic` directory.

`/admin` - location for the admin page and config file.

`/settings` - location of `site.json` and `/menu` directory and menu .json files

`/images` - location of uploaded image assets.

### Github Actions

When a push is made to the `content` branch, a PR will be automatically generated to merge the changes to the `master` branch. This is done to isolate content changes from code changes.
