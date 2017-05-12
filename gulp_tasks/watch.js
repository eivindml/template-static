var gulp = require('gulp');
var watch = require('gulp-watch');
var dotenv = require('dotenv').config({
  'path': '../'
});
var dotenvExpand = require('dotenv-expand')(dotenv);

gulp.task('watch', function() {
  gulp.watch(process.env.PATH_WATCH_PUG, ['pug']);
  gulp.watch(process.env.PATH_WATCH_SASS, ['sass']);
  gulp.watch(process.env.PATH_WATCH_JS, ['scripts']);
});
