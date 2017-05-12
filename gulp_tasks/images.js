var dotenv = require('dotenv').config({
  'path': '../'
});
var dotenvExpand = require('dotenv-expand')(dotenv);
var gulp = require('gulp');

// COPIES IMAGES FROM SRC TO DEST
gulp.task('images', function() {
  return gulp.src(process.env.PATH_IMG_SRC)
    .pipe(gulp.dest(process.env.PATH_IMG_DIST));
});
