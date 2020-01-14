// module.exports = ['@storybook/addon-docs/react/preset'];

module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true }
    }
  ],
};