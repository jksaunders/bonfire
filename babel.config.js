// {
//     "env": {
//         "development": {
//             "presets": ["@babel/preset-env", "@babel/preset-react"]
//         },
//         "production": {
//             "presets": ["@babel/preset-env", "@babel/preset-react"]
//         }
//     }
// }

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  let presets = [];

  if (api.env("production")) {
    presets = ["@babel/preset-env", "@babel/preset-react"];
  } else {
    presets = ["@babel/preset-env", "@babel/preset-react"];
  }

  return {
    presets
  };
};