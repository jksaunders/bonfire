module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  let presets = [];

  if (api.env('production')) {
    presets = [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ];
  } else if (api.env('test')) {
    presets = ['@babel/preset-env', '@babel/preset-react'];
  } else {
    presets = [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ];
  }

  return {
    presets,
  };
};
