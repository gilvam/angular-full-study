const gulp = require('gulp');
const sassGulp = require('gulp-sass');

/**
 * rebuild node sass
 */
gulp.task('compile:sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sassGulp().on('error', sassGulp.logError))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});


