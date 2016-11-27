import * as chalk from 'chalk';

function stderr ( msg ) {
	console.error( msg ); // eslint-disable-line no-console
}

const handlers = {
	MISSING_DIR_OUTPUT_OPTION: () => {
		stderr( chalk.red( 'You must specify an --output (-o) option when compiling a directory of files' ) );
	}
};

export default function handleError ( err, recover ) {
	const handler = handlers[ err && err.code ];

	if ( handler ) {
		handler( err );
	} else {
		stderr( chalk.red( err.message || err ) );

		if ( err.stack ) {
			stderr( chalk.grey( err.stack ) );
		}
	}

	stderr( `Type ${chalk.cyan( 'svelte --help' )} for help, or visit https://svelte.technology/guide` );

	if ( !recover ) process.exit( 1 );
}
