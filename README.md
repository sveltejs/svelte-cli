# svelte-cli

Command line interface for [Svelte](https://svelte.technology).

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
