# sintel-dev.github.io <-> sintel.dev

This is the home page for the sintel project at MIT.

- Site URL: <http://sintel-dev.github.io>
- Stack: Jekyll + Gulp 4 + Bootstrap 4 + Browser-sync

## Install build dependencies

1. [Install Jekyll](https://jekyllrb.com/docs/installation/)
1. [NodeJS](https://nodejs.org/en/download/)
1. [NPM](https://www.npmjs.com/get-npm)
1. [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start/)

## Install site and site dependencies

1. Clone or download this repository.
1. Run `npm install` (*this step is optional if you update content only: images/text/data files*)
1. Run `bundle install` (*required for Jekyll*)

## Running

* **For Development** Run `gulp` to bundle assets (js/styles) and generate website into *_site* folder
* **For Editing** should be using `bundle exec jekyll serve` to run server or *Option with force livereload browser `bundle exec jekyll serve --livereload`*

*Dev Note:* Check gulpfile.js for automated tasks, like `gulp purgecss` to update critical css
