# README

## Table of contents

1. [Prerequisites](#prerequisites)
1. [Installation](#installation)
1. [Scripts](#scripts)
1. [Contribute - Git](#contribute-git)
1. [Configuration](#configuration)
1. [Documentation](#documentation)
1. [Styling](#styling)

## Prerequisites

These modules must be globally installed:

* [`eslint`](https://www.npmjs.com/package/eslint): Code analysis for JavaScript & AngularJS.
* [`htmlhint`](https://www.npmjs.com/package/htmlhint): Code analysis for HTML.
* [`sass-lint`](https://github.com/sasstools/sass-lint): Code analysis for Sass.

## Installation

```sh
$ npm install               # Development
$ npm install --production  # Production (only `dependencies`)
```

## Scripts

- `yarn start` to launch `npm run server` and `json-server` (if checked) in parallel
- `yarn run serve` to launch a webpack-dev-server server on your source files
- `yarn run serve:prod` to launch a webpack-dev-server server on your source files in a **production** environment
- `yarn run build` to build an optimized version of your application in /dist
- `yarn run build:prod` to build an optimized version of your application in /dist in a **production** environment
- `yarn run test` to launch your unit tests with Karma
- `yarn run lint` to launch linting process

## Contribute - Git

See [commits convention](COMMITS-CONVENTION.md).

## Configuration

See [configuration documentation](src/config/README.md).

## Documentation

Angular documentation is generated with [DGeni](https://github.com/angular/dgeni)

Docs generation is performed by [webpack-angular-dgeni-plugin](https://github.com/groupe-sii/webpack-angular-dgeni-plugin/)

Please refer to [Angular documentation](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) for documentation comments.

### Configuration

It's possible to include or exclude other glob link (default: `src/app/**/*`) in file `webpack.config.js` in `build` target.

For more details about configuration, please refer to the [plugin documentation](https://github.com/groupe-sii/webpack-angular-dgeni-plugin).

### Launch

Documentation is launched by adding `--docs` argument to webpack. Which is already done by default for `build` and `build:prod` NPM scripts.

### Static documentation

Static documentation is written in markdown format under `docs` folder.

## Styling

See styling [guidelines](src/styles/README.md).
