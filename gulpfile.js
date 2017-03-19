var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

var dist = './public_html';

// COMPILES .PUG FILES TO HTML
gulp.task('pug', function() {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest(dist))
});

// COMPILES .SASS TO .CSS
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(dist + '/css'));
});

// COPIES IMAGES FROM SRC TO DEST
gulp.task('images', function() {
    return gulp.src('./src/images/*.{png,svg,jpg,gif}')
        .pipe(gulp.dest(dist + '/img'));
});

// COPIES .JS FROM SRC TO DEST
gulp.task('javascript', function() {
    return gulp.src('./src/javascript/*.js')
        .pipe(gulp.dest(dist + '/js'));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);
gulp.task('pug-watch', ['pug'], browserSync.reload);
gulp.task('static-watch', ['images', 'javascript'], browserSync.reload);

// WATCH FOR CHANGES
gulp.task('watch', ['sass'], function() {
    browserSync.init({
        server: dist
    });
    gulp.watch("src/sass/*.sass", ['sass-watch']);
    gulp.watch("src/javascript/*.js", ['static-watch']);
    gulp.watch("src/pug/**/*.{pug,md}", ['pug-watch']);
});

// DEPLOY PROJECT USING FTP
gulp.task('deploy', function() {
    var conn = ftp.create({
        host: '',
        user: '',
        password: ''
    });
    return gulp.src([dist + '/**'], {
            buffer: false
        })
        .pipe(conn.dest(dist));
});

gulp.task('build', ['pug', 'sass', 'images', 'javascript']);
gulp.task('default', ['build', 'watch']);
