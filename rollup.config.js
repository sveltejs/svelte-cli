import json from 'rollup-plugin-json';
import string from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

import path from 'path';

export default {
	entry: 'src/index.js',
	dest: 'bin.js',
	format: 'cjs',
	banner: '#!/usr/bin/env node',
	external: [
		'fs',
		'path',
		'svelte',
		path.resolve( './node_modules/svelte/package.json' ) // TODO Rollup should exclude anything under 'svelte', no?
	],
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
