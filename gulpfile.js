var gulp = require('gulp');

// Plugins
var imagemin = require('gulp-imagemin');
var browserSync =require('browser-sync').create();
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css')

// Compile Less
gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Reload browser
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css'], {
        server: {
            baseDir: 'dist'
        }
    });
});

// Minify Images
gulp.task('minify-images', function() {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/resized-images'))
});

// Minify CSS
gulp.task('minify-css', function() {
    gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('default', ['less', 'browser-sync', 'minify-images', 'minify-css'], function() {
    gulp.watch("less/*.less", ['less']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});