
export default function (bodyRendered) {
  const components = [
    'Break',
    'Button',
    'Card',
    'Date',
    'Grid',
    'Icon',
    'Image',
    'Link',
    'List',
    'Row',
    'Col',
    'Select',
    'ContentList',
    'Login',
    'LoginError',
    'LoginMoreInfo',
    'LoginSetPath',
    'UsecaseLoginRedirect',
    'Logout',
  ];
  const shortcodesMatcher = new RegExp('<(' + components.join('|') + ')', 'i');
  return bodyRendered && shortcodesMatcher.test(bodyRendered);
};
