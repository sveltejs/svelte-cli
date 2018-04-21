import json from 'rollup-plugin-json';
import string from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
	input: ['src/index.js'],
	output: {
		dir: 'dist',
		format: 'cjs'
	},
	external: ['fs', 'path', 'os', 'svelte'],
	plugins: [
		json(),
		string({ include: '**/*.md' }),
		commonjs({
			include: 'node_modules/**',
			namedExports: {
				chalk: ['red', 'cyan', 'grey']
			}
		}),
		resolve()
	],
	experimentalDynamicImport: true,
	experimentalCodeSplitting: true
};
