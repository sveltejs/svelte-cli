import minimist from 'minimist';
import help from './help.md';
import { version } from '../package.json';
import { VERSION as svelteVersion } from 'svelte';
import tasks from './tasks/index.js';

const command = minimist(process.argv.slice(2), {
	alias: {
		// Aliases
		strict: 'useStrict',

		// Short options
		f: 'format',
		g: 'globals',
		h: 'help',
		i: 'input',
		m: 'sourcemap',
		n: 'name',
		o: 'output',
		v: 'version',
		d: 'dev'
	}
});

if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
	console.error(`\n${help.replace('__VERSION__', version)}\n`); // eslint-disable-line no-console
} else if (command.version) {
	console.error(`svelte-cli version ${version}\nsvelte version ${svelteVersion}`); // eslint-disable-line no-console
} else {
	console.error(`svelte version ${svelteVersion}`); // eslint-disable-line no-console
	const task = tasks[command._[0]];

	if (task) {
		task(command);
	} else {
		console.error(`Unrecognised command ${command._[0]}. Type svelte --help to see instructions`); // eslint-disable-line no-console
	}
}
