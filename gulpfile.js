var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var gulpcssnano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cp = require('child_process');
var flatten = require('gulp-flatten');
var jekyll = 'jekyll';
const shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var concatjs = require('gulp-concat');
var browserSync = require('browser-sync').create();

const purgecss = require('gulp-purgecss');

gulp.task('purgecss', () => {
  return gulp.src('css/main.css')
    .pipe(purgecss({
        content: ['_site/index.html'],
        whitelist: ['nav-bg-white']
    }))
    .pipe(gulpcssnano())
    .pipe(gulp.dest('_includes/css/'))
})

var paths = {
  styles: {
    src: '_scss/**/*.{scss,sass}',
    dest: '_site/css',
    destsecond: 'css'
  },
  scripts: {
    src: '_js/src/*.js',
    dest: '_site/js/dist/',
    destsecond: './js/dist/'
  }
};

gulp.task('jekyllBuild', shell.task(['bundle exec jekyll build']));

function style() {
  return gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: ['scss'],
      outputStyle: 'expanded',
      onError: browserSync.notify
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(paths.styles.destsecond));
}

function js() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/aos/dist/aos.js'
    // paths.scripts.src
  ])
  .pipe(concatjs('app.bundle.js'))
  .pipe(gulp.dest(paths.scripts.destsecond))
  .pipe(browserSync.reload({stream:true}))
}

function mainJs() {
  return gulp.src([
    paths.scripts.src
  ])
  .pipe(concatjs('main.bundle.js'))
  .pipe(gulp.dest(paths.scripts.destsecond))
  .pipe(browserSync.reload({stream:true}))
}

function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: "_site"
    }
  })
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch(paths.styles.src, style)
  gulp.watch(paths.scripts.src, gulp.series([js, mainJs]))
  gulp.watch(
    [
    '*.html',
    '_layouts/*.html',
    '_pages/*',
    '_posts/*',
    '_data/*',
    '_includes/*'
  ],
  gulp.series('jekyllBuild', browserSyncReload));
}

gulp.task('default', gulp.parallel('jekyllBuild', style, js, mainJs, browserSyncServe, watch))