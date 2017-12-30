# svelte-cli

Command line interface for [Svelte](https://svelte.technology).

## Why you shouldn't use this

`svelte-cli` is useful if you want to try out Svelte, but it's not recommended for serious production use. It will compile your components to standalone JavaScript files, but won't automatically recompile them when they change, and won't deduplicate code shared between your components.

Instead, we recommend using a bundler such as [Rollup](https://rollupjs.org) (with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte)), [Webpack](https://webpack.js.org) (with [svelte-loader](https://github.com/sveltejs/svelte-loader)), or another integration [listed here](https://github.com/sveltejs/svelte#svelte). [See here](https://svelte.technology/blog/the-easiest-way-to-get-started) for an easy get-started guide.

## Installation

```bash
npm install -g svelte-cli
```

## Usage

```bash
# get help
svelte --help

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
```

## License

[MIT](LICENSE)
