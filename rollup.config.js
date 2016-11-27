import json from 'rollup-plugin-json';
import string from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/index.js',
	dest: 'bin.js',
	format: 'cjs',
	banner: '#!/usr/bin/env node',
	external: [ 'fs', 'path', 'svelte' ],
	plugins: [
		json(),
		string({ include: '**/*.md' }),
		commonjs({
			include: 'node_modules/**',
			namedExports: {
				chalk: [ 'red', 'cyan', 'grey' ]
			}
		}),
		nodeResolve({
			main: true
		})
	]
};
