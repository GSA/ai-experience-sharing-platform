## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run prebuild`

Launches a prebuild script that indexes content and prepares environment variables.

**prepareEnv()** - forwards environment variables from federalist to create-react-app

**prepareContent()** - parses markdown and appends objects with table of contents and excerpt. Creates an index.json file in each content directory that contains all content objects.

**indexMenus()** - Creates an index.json file in the menu directory that contains all menu objects.

### `npm run build`

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
