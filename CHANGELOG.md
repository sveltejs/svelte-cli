# svelte-cli changelog

## 3.0.0

* Update for Svelte v2
* Remove unnecessary `--input` option
* Use [Sade](https://github.com/lukeed/sade) internally

## 2.2.0

* Add `--immutable` flag

## 2.1.0

* Add `--store` flag

## 2.0.2

* Move `svelte` into `dependencies`, as it was accidentally stuck in `peerDependencies`

## 2.0.1

* Revert `peerDependencies` decision, as it causes problems when globally installed

## 2.0.0

* Move `svelte` to `peerDependencies`

## 1.5.0

* Add `--customElement` support ([#25](https://github.com/sveltejs/svelte-cli/pull/25))

## 1.4.1

* Fix keeping directories structure

## 1.4.0

* Add `--generate` option ([#24](https://github.com/sveltejs/svelte-cli/issues/19))

## 1.3.7

* Strip byte order mark ([#22](https://github.com/sveltejs/svelte-cli/issues/22))

## 1.3.6

* Implement `--globals`

## 1.3.5

* Add `--dev` mode ([#16](https://github.com/sveltejs/svelte-cli/issues/16))

## 1.3.4

* Neater solution to the version reporting problem

## 1.3.3

* Ok, let's try that again...

## 1.3.2

* Don't bundle Svelte compiler version number ([#svelte/327](https://github.com/sveltejs/svelte/issues/327))

## 1.3.1

* Write sourcemaps to correct location, with correct `sources` and `sourcesContent` ([svelte/#293](https://github.com/sveltejs/svelte/issues/293))

## 1.3.0

* Sanitize names

## 1.2.1

* Show code frame for errors

## 1.2.0

* Update Svelte version
* Print compiler version when compiling
* Add `--no-css` option

## 1.0.3

* Only `mkdir` for directories that don't yet exist ([#7](https://github.com/sveltejs/svelte-cli/issues/7))
* Fix extension when compiling a directory ([#9](https://github.com/sveltejs/svelte-cli/issues/9))
* Add `pkg.engines` as stopgap measure until we have full Node 4 support ([#4](https://github.com/sveltejs/svelte-cli/issues/4))

## 1.0.2

* Default to basing `name` property on filename

## 1.0.1

* Include correct files in package

## 1.0.0

* First release
