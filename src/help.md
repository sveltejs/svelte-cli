svelte-cli version __VERSION__
=====================================

Usage: svelte compile [options] <entry file>

Basic options:

-v, --version            Show version number
-h, --help               Show this help message
-i, --input              Input (alternative to <entry file>)
-o, --output <output>    Output (if absent, prints to stdout)
-f, --format [es]        Type of output (amd, cjs, es, iife, umd)
-g, --globals            Comma-separate list of `module ID:Global` pairs
-n, --name               Name for IIFE/UMD export
-m, --sourcemap          Generate sourcemap (`-m inline` for inline map)
--amdId                  ID for AMD module (default is anonymous)

Examples:

# generate a JavaScript module from MyComponent.html
svelte compile MyComponent.html > MyComponent.js
svelte compile -i MyComponent.html -o MyComponent.js

# generate a UMD module from MyComponent.html, inferring
# name from the filename ('MyComponent')
svelte compile -f umd MyComponent.html > MyComponent.js

# generate a UMD module, specifying the name
svelte compile -f umd -n CustomName MyComponent.html > MyComponent.js

# compile all .html files in components/
svelte compile -i src/components -o build/components

Notes:

* When piping to stdout, only inline sourcemaps are permitted
* When compiling a folder of components, names will always be
  inferred from filenames, and AMD modules will be anonymous

For more information visit https://github.com/rollup/rollup/wiki
