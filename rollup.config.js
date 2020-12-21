import pkg from './package.json';

import typescript from 'rollup-plugin-typescript2';

const name = 'bonfire';
const banner = `/* ${name} version: ${pkg.version} */`;

const standardOpts = {
  name,
  banner,
  exports: 'named',
  minifyInternalExports: true,
};

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const config = [
  {
    input: './src/index.ts',
    strictDeprecations: true,
    output: [
      { ...standardOpts, file: pkg.main, format: 'cjs' },
      { ...standardOpts, file: pkg.module, format: 'esm' },
    ],
    external,
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
    ],
  },
];

export default config;
