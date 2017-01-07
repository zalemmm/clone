var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
        }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('css', function () {
  var processors = [
    //require('autoprefixer'),
    require('css-mqpacker'),
    //require('cssnano'),
  ];
  return gulp.src('./css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'));
});

gulp.task('imagemin', function() {
  return gulp.src('./img/**/*.+(png|jpg|jpeg|gif)')
  .pipe(imagemin())
  .pipe(gulp.dest('./img/optimized'))
});

gulp.task('default', ['sass', 'sass:watch']);
