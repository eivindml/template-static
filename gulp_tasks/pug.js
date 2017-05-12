var dotenv = require('dotenv').config({
  'path': '../'
});
var dotenvExpand = require('dotenv-expand')(dotenv);
var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');

// COMPILES .PUG FILES TO HTML
gulp.task('pug', function() {
  return gulp.src(process.env.PATH_PUG_SRC)
    .pipe(pug())
    .pipe(gulp.dest(process.env.PATH_PUG_DIST))
    .pipe(browserSync.stream());
});
