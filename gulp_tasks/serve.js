var gulp = require('gulp');
var browserSync = require('browser-sync');
var dotenv = require('dotenv').config({
  'path': '../'
});
var dotenvExpand = require('dotenv-expand')(dotenv);

gulp.task('serve', function() {
  browserSync.init({
    server: process.env.PATH_DIST
  });
});
