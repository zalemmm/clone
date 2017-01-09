var gulp        = require( 'gulp' );
var sass        = require( 'gulp-sass' );
var sourcemaps  = require( 'gulp-sourcemaps' );
var postcss     = require( 'gulp-postcss' );
var imagemin    = require( 'gulp-imagemin' );
var browserSync = require( 'browser-sync' ).create();

// Paths

var susy = './node_modules/susy/sass';

// Start browserSync & watch css & html changes

gulp.task( 'watch', ['sass'], function() {
    browserSync.init({
        server: './'
    });
    gulp.watch( './sass/**/*.scss', ['sass']);
    gulp.watch( '*.html' ).on( 'change', browserSync.reload );
});

gulp.task( 'sass', function() {
    return gulp.src( './sass/**/*.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            includePaths: [susy],
            sourceComments: true,
            outputStyle: 'expanded'
        }).on( 'error', sass.logError ) )
        .pipe( sourcemaps.write( './maps' ) )
        .pipe( gulp.dest( './css' ) )
        .pipe( browserSync.stream() );
});

// Minify

gulp.task( 'css', function() {
    var processors = [
        require( 'css-mqpacker' )
    ];
    return gulp.src( './css/*.css' )
        .pipe( postcss( processors ) )
        .pipe( gulp.dest( './css' ) );
});

// Compress images

gulp.task( 'imagemin', function() {
    return gulp.src( './img/**/*.+(png|jpg|jpeg|gif)' )
        .pipe( imagemin() )
        .pipe( gulp.dest( './img/optimized' ) );
});

gulp.task( 'default', ['watch']);
