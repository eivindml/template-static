var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

// COMPILES .PUG FILES TO HTML
gulp.task('pug', function() {
    return gulp.src('./src/template/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public_html/'))
});

// COMPILES .SASS TO .CSS
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public_html/css'));
});

// COPIES IMAGES FROM SRC TO DEST
gulp.task('images', function() {
    return gulp.src('./src/images/*.{png,svg}')
        .pipe(gulp.dest('./public_html/img'));
});

// COPIES .JS FROM SRC TO DEST
gulp.task('javascript', function() {
    return gulp.src('./src/javascript/*.js')
        .pipe(gulp.dest('./public_html/js'));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);
gulp.task('pug-watch', ['pug'], browserSync.reload);
gulp.task('static-watch', ['images', 'javascript'], browserSync.reload);

// WATCH FOR CHANGES
gulp.task('watch', ['sass'], function() {
    browserSync.init({
        server: "./public_html"
    });
    gulp.watch("src/sass/*.sass", ['sass-watch']);
    gulp.watch("src/javascript/*.js", ['static-watch']);
    gulp.watch("src/template/**/*.{pug,md}", ['pug-watch']);
});

// DEPLOY PROJECT USING FTP
gulp.task('deploy', function() {
    var conn = ftp.create({
        host: '',
        user: '',
        password: ''
    });
    return gulp.src(['public_html/**'], {
            buffer: false
        })
        .pipe(conn.dest('/public_html'));
});

gulp.task('build', ['pug', 'sass', 'images', 'javascript']);
gulp.task('default', ['build', 'watch']);
