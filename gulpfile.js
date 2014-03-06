var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');

var paths = {
  tests: 'src/tests/**/*.coffee',
  images: 'client/img/**/*'
};

gulp.task('tests', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.tests)
    .pipe(coffee())
    .pipe(concat('tests.js'))
    .pipe(gulp.dest('js/'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['tests']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['tests', 'watch']);