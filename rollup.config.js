import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import pkg from './package.json';

const fs = require('fs');

const writeIndexHtmlToBuild = bundleName => {
  let indexHtml = fs.readFileSync('demo/index.html', 'utf8');
  indexHtml = indexHtml.replace('<%BUNDLE%>', bundleName.replace('build/', ''));
  fs.writeFileSync('build/index.html', indexHtml, 'utf8');
};

const babelPluginConfig = {
  exclude: ['node_modules/**'],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
    ['@babel/plugin-proposal-export-default-from']
  ]
};

let plugins = [
  resolve(), // so Rollup can find node modules
  commonjs(), // so Rollup can convert node module to an ES module
  babel(babelPluginConfig)
];

if (process.env.ROLLUP_WATCH) {
  plugins = [
    ...plugins,
    serve({
      contentBase: ['dist/', 'build/', 'lib/'],
      port: 8080
    })
  ]
}

writeIndexHtmlToBuild('index.iife.js');

export default [
	{
    input: 'lib/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
    plugins
  },
  {
    input: 'demo/index.js',
    output: [
      { file: 'build/index.iife.js', format: 'iife' }
    ],
    plugins
  }
];
