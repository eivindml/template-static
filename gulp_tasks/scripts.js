var gulp = require('gulp');
var coffee = require('gulp-coffee');
var dotenv = require('dotenv').config({
  'path': '../'
});
var dotenvExpand = require('dotenv-expand')(dotenv);

gulp.task('scripts', function() {
  gulp.src(process.env.PATH_JS_SRC)
    .pipe(coffee({
      bare: true
    }))
    .pipe(gulp.dest(process.env.PATH_JS_DIST));
});
