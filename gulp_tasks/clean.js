var gulp = require('gulp');
var del = require("del");
var dotenv = require('dotenv').config({
  'path': '../'
});
var dotenvExpand = require('dotenv-expand')(dotenv);

gulp.task('clean', function() {
  return del([process.env.PATH_DIST]);
});
