var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');
var declare = require('gulp-declare');

var paths = {
  application: [
    'coffee/src/collections/region_collection.coffee', 
    'coffee/src/views/region_chooser_view.coffee ',
    'coffee/src/views/lens_view.coffee ',
    'coffee/src/controllers/main_controller.coffee '
  ],
  templates: 'coffee/src/templates/*.hbs',
  tests: 'coffee/tests/**/*.coffee',
  images: 'client/img/**/*'
};

gulp.task('tests', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.tests)
    .pipe(coffee())
    .pipe(concat('tests.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('application', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.application)
    .pipe(coffee())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('templates', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.templates)
    .pipe(handlebars({wrapped:true}))
    .pipe(declare({
      namespace: 'Handlebars.templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('js/'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.application, ['application']);
  gulp.watch(paths.tests, ['tests']);
  gulp.watch(paths.templates, ['templates']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['application', 'templates', 'tests', 'watch']);