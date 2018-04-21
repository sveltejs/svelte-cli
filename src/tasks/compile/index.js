import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import handleError from '../../handleError.js';
import * as svelte from 'svelte';

function mkdirp(dir) {
	const parent = path.dirname(dir);
	if (dir === parent) return;

	mkdirp(parent);
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

export default function compile(command) {
	const input = command.input || command._[1];
	const output = command.output;

	const stats = fs.statSync(input);
	const isDir = stats.isDirectory();

	const globals = {};
	if (command.globals) {
		command.globals.split(',').forEach(pair => {
			const [key, value] = pair.split(':');
			globals[key] = value;
		});
	}

	const options = {
		name: command.name,
		format: command.format,
		sourceMap: command.sourcemap,
		globals,
		css: command.css !== false,
		dev: command.dev,
		immutable: command.immutable,
		generate: command.generate || 'dom',
		customElement: command.customElement,
		store: command.store
	};

	if (isDir) {
		if (!output) {
			handleError({
				code: 'MISSING_DIR_OUTPUT_OPTION'
			});
		}

		mkdirp(output);
		compileDirectory(input, output, options);
	} else {
		compileFile(input, output, options);
	}
}

function compileDirectory(input, output, options) {
	fs.readdirSync(input).forEach(file => {
		const src = path.resolve(input, file);
		const dest = path.resolve(output, file);

		if (path.extname(file) === '.html') {
			compileFile(
				src,
				dest.substring(0, dest.lastIndexOf('.html')) + '.js',
				options
			);
		} else {
			const stats = fs.statSync(src);
			if (stats.isDirectory()) {
				compileDirectory(src, dest, options);
			}
		}
	});
}

let SOURCEMAPPING_URL = 'sourceMa';
SOURCEMAPPING_URL += 'ppingURL';

function compileFile(input, output, options) {
	console.error(`compiling ${path.relative(process.cwd(), input)}...`); // eslint-disable-line no-console

	options = Object.assign({}, options);
	if (!options.name) options.name = getName(input);

	options.filename = input;
	options.outputFilename = output;

	const { sourceMap } = options;
	const inline = sourceMap === 'inline';

	let source = fs.readFileSync(input, 'utf-8');
	if (source[0] === 0xfeff) source = source.slice(1);

	let compiled;

	try {
		compiled = svelte.compile(source, options);
	} catch (err) {
		console.error(chalk.red(err.message)); // eslint-disable-line no-console
		if (err.frame) {
			console.error(err.frame); // eslint-disable-line no-console
		} else {
			console.error(err.stack); // eslint-disable-line no-console
		}

		process.exit(1);
	}

	const { js } = compiled;

	if (sourceMap) {
		js.code += `\n//# ${SOURCEMAPPING_URL}=${inline || !output
			? js.map.toUrl()
			: `${path.basename(output)}.map`}\n`;
	}

	if (output) {
		const outputDir = path.dirname(output);
		mkdirp(outputDir);
		fs.writeFileSync(output, js.code);
		console.error(`wrote ${path.relative(process.cwd(), output)}`); // eslint-disable-line no-console
		if (sourceMap && !inline) {
			fs.writeFileSync(`${output}.map`, js.map);
			console.error(`wrote ${path.relative(process.cwd(), `${output}.map`)}`); // eslint-disable-line no-console
		}
	} else {
		process.stdout.write(js.code);
	}
}

function getName(input) {
	return path
		.basename(input)
		.replace(path.extname(input), '')
		.replace(/[^a-zA-Z_$0-9]+/g, '_')
		.replace(/^_/, '')
		.replace(/_$/, '')
		.replace(/^(\d)/, '_$1');
}
