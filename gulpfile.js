var gulp = require('gulp');

var sass = require('gulp-sass');
var browsersync = require('browser-sync').create();


// Move PHP Files
gulp.task('admin', function() {
  return gulp.src('source/library/*.php')
    .pipe(gulp.dest('app/library'));
});

gulp.task('pages', function() {
  return gulp.src('source/pages/*.php')
    .pipe(gulp.dest('app'))
    .pipe(browsersync.stream());
});

gulp.task('page-formats', function() {
  return gulp.src('source/library/page-formats/*.php')
    .pipe(gulp.dest('app'));
});

gulp.task('post-formats', function() {
  return gulp.src('source/library/post-formats/*.php')
    .pipe(gulp.dest('app/post-formats'));
});

// Compile and move styles
gulp.task('css-fix', function() {
  return gulp.src('source/library/style.css')
    .pipe(gulp.dest('app'));
});

gulp.task('scss', function() {
  return gulp.src('source/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/library/css'))
    .pipe(browsersync.stream());
});

// Move images
gulp.task('required-assets', function() {
  return gulp.src('source/assets/required/*')
    .pipe(gulp.dest('app'))
    .pipe(browsersync.stream());

});

gulp.task('bonus-assets', function() {
  return gulp.src('source/assets/bonus/*')
    .pipe(gulp.dest('app/library/images'))
    .pipe(browsersync.stream());
});

//Supply translations
gulp.task('translations', function() {
  return gulp.src('source/translation')
    .pipe(gulp.dest('app/library/'));
});

//Start watching
gulp.task('watch', function() {
  gulp.watch('source/pages/*.php', ['pages']);
  gulp.watch('source/scss/**/*.scss', ['scss']);
  gulp.watch('source/assets/bonus/*', ['bonus-assets']);
  gulp.watch('source/assets/required/*', ['required-assets']);
})

gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: "localhost/DB_NAME"
    });
});

gulp.task('default', ['browser-sync', 'admin', 'pages', 'page-formats', 'post-formats', 'css-fix', 'scss', 'required-assets', 'bonus-assets', 'translations', 'watch']);
