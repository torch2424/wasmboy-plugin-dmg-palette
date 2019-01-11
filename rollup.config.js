import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const plugins = [
  resolve(), // so Rollup can find node modules
  commonjs(), // so Rollup can convert node module to an ES module
  babel({ 				
    exclude: ['node_modules/**']
  })
];

export default [
	{
    input: 'lib/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
    plugins
	}
];
