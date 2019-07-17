# Vult Cosméticos.

## Getting Started

### Requirements

* [node.js](https://nodejs.org/en/) >= 6.9.0

### Installing

The first step you must follow to run the project is to install all its dependencies.

The following commands should do this for you.

```
npm install
```


## Starting with Gulp.js

```
npm start
```


### Structure of the `src` folder

Below the folder structure.

```sh
├── src
│   ├── assets
│   │       ├──js
│   │       │  └──common
│   │       │         └──modules
│   │       │                ├── General
│   │       │                │        ├──Footer
│   │       │                │        ├──Header
│   │       │                │        ├──LazyLoad
│   │       │                │        ├──Minicart
│   │       │                │        ├──Modal
│   │       │                │        ├──Order
│   │       │                │        ├──Shelf
│   │       │                │        └──utils
│   │       │                ├── Home
│   │       │                └── Product
│   │       └──scss
│   │            └──common
│   │                    ├──config
│   │                    │    ├──Global
│   │                    │    │        ├──ajaxLoad
│   │                    │    │        ├──elements
│   │                    │    │        ├──generic
│   │                    │    │        ├──lazyload
│   │                    │    │        ├──shelf
│   │                    │    │        └──vendor
│   │                    │    │                ├──form-reset
│   │                    │    │                ├──slick-carousel
│   │                    │    │                └──yourviews
│   │                    │    └─settings
│   │                    │            ├──helpers
│   │                    │            ├──tools
│   │                    │            └──utils
│   │                    └──layout
│   │                            ├──general
│   │                            │        ├──footer
│   │                            │        ├──header
│   │                            │        └──modal
│   │                            │
│   │                            ├──home
│   │                            └──product   
│   └── views
│           └──common
│                ├──layouts
│                ├──partials
│                │        ├──footer
│                │        ├──header
│                │        ├──home
│                │        ├──product
│                │        └──svgs
│                ├──custom-elements
│                ├──html-templates
│                │            └──sub-templates
│                └──shelves-templates
             
```

## Developed with


* [EditorConfig](https://editorconfig.org/)

* [Gulp.js](https://gulpjs.com/)

* [Browserify.org](http://browserify.org/)

* [Sass](https://sass-lang.com/)

* [Pug.Js](https://pugjs.org/api/getting-started.html)

* [ESlint](https://eslint.org/)

* [StyleLint](https://stylelint.io/user-guide/cli)


## Note

    This repository was done all in Vanillajs and all standardized according to the standards of the 

    eslint, it took a lot of work to organize and make all this complex and ideal structure would be

    that you continue to follow the same structure.