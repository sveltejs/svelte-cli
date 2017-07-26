'use strict';

var Main = {};

Main.filename = "src/Main.html";

Main.data = function () {
	return {};
};

Main.render = function ( state, options ) {
	state = state || {};

	return `<p>Hello world!</p>`;
};

Main.renderCss = function () {
	var components = [];

	return {
		css: components.map( x => x.css ).join( '\n' ),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape ( html ) {
	return String( html ).replace( /["'&<>]/g, match => escaped[ match ] );
}

module.exports = Main;