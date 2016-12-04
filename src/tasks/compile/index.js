import * as path from 'path';
import * as fs from 'fs';
import handleError from '../../handleError.js';
import * as svelte from 'svelte';

function mkdirp ( dir ) {
	const parent = path.dirname( dir );
	if ( dir === parent ) return;

	mkdirp( parent );
	fs.mkdirSync( dir );
}

export default function compile ( command ) {
	const input = command.input || command._[1];
	const output = command.output;

	const stats = fs.statSync( input );
	const isDir = stats.isDirectory();

	const options = {
		name: command.name,
		format: command.format,
		sourceMap: command.sourcemap
	};

	if ( isDir ) {
		if ( !output ) {
			handleError({
				code: 'MISSING_DIR_OUTPUT_OPTION'
			});
		}

		mkdirp( output );
		compileDirectory( input, output, options );
	} else {
		compileFile( input, output, options );
	}
}

function compileDirectory ( input, output, options ) {
	fs.readdirSync( input ).forEach( file => {
		const src = path.resolve( input, file );
		const dest = path.resolve( output, file );

		if ( path.extname( file ) === '.html' ) {
			compileFile( src, dest.substring( 0,  dest.lastIndexOf( '.html' ) ) + '.js', options );
		}

		else {
			const stats = fs.statSync( src );
			if ( stats.isDirectory() ) {
				compileDirectory( src, dest, options );
			}
		}
	});
}

let SOURCEMAPPING_URL = 'sourceMa';
SOURCEMAPPING_URL += 'ppingURL';

function compileFile ( input, output, options ) {
	console.error( `compiling ${path.relative( process.cwd(), input )}...` ); // eslint-disable-line no-console

	options = Object.assign( {}, options );
	if ( !options.name ) options.name = path.basename( input ).replace( path.extname( input ), '' );

	const { sourceMap } = options;
	const inline = sourceMap === "inline";

	const source = fs.readFileSync( input, 'utf-8' );
	const compiled = svelte.compile( source, options );
	const { map } = compiled;
	let { code } = compiled;
	if ( sourceMap ) {
		code += `\n//# ${SOURCEMAPPING_URL}=${( inline || !output ) ? map.toUrl() : `${output}.map`}\n`;
	}

	if ( output ) {
		fs.writeFileSync( output, code );
		console.error( `wrote ${path.relative( process.cwd(), output )}` ); // eslint-disable-line no-console
		if ( sourceMap && !inline ) {
			fs.writeFileSync( `${path.basename(output)}.map`, map );
			console.error( `wrote ${path.relative( process.cwd(), `${output}.map` )}` ); // eslint-disable-line no-console
		}
	} else {
		process.stdout.write( code );
	}
}
