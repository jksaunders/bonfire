import React from 'react';
import ReactDOM from 'react-dom';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const plugins = [
  sourceMaps(),
  externals(),
  localResolve(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  commonjs({
    namedExports: {
      react: Object.keys(React),
      'react-dom': Object.keys(ReactDOM),
      'react-is': ['isElement', 'isValidElementType', 'ForwardRef'],
    },
  }),
];

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'bonfire',
      file: pkg.browser,
      format: 'umd',
      sourcemaps: true,
    },
    plugins: [...plugins],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs', sourcemaps: true },
      { file: pkg.module, format: 'es', sourcemaps: true },
    ],
    plugins: [...plugins],
  },
];
