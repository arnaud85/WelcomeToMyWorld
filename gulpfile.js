// LOCAL VARIABLES
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlhint = require("gulp-htmlhint"),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();


// FOLDERS
const roots = {
  
    base: "./" ,
    dev  : 'dev/',
    dist : 'dist/'

};

const devFolder = {
  
    sass  : roots.dev + 'sass/',
    js : roots.dev + 'js/',
    img  : roots.dev + 'img/'

};

const distFolder = {
  
    css  : roots.dist + 'css/',
    js : roots.dist + 'js/',
    img  : roots.dist + 'img/'

};


// WATCH FOR CHANGES IN HTML/SCSS/JS FILES
gulp.task('watch', function () {

    browserSync.init({
        
        server: {
        	
        	baseDir: roots.base
        },

        browser: ["google chrome", "firefox"]

    });

    gulp.watch(devFolder.sass + "*.scss", ['style']);
    gulp.watch(devFolder.js + "*.js", ['scripts']);
    gulp.watch(roots.base + "*.html").on("change", browserSync.reload);
});

// STYLE
gulp.task('style', function() {
    
    return gulp.src(devFolder.sass + "*.scss")
    	.pipe(sass())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(gulp.dest(distFolder.css))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Style task complete' }));
});

// SCRIPTS
gulp.task('scripts', function() {

    return gulp.src([devFolder.js+'jquery-2.1.4.js', devFolder.js+'bootstrap.js', devFolder.js+'app.js'])
        .pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(distFolder.js))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Scripts task complete' }));
});


// TESTS
gulp.task('htmlhint', function() {
    
    return gulp.src(roots.base + '*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('scsslint', function() {

    return gulp.src(devFolder.sass + 'style.scss')
    .pipe(scsslint());
});

gulp.task('jshint', function(){

    return gulp.src(devFolder.js+'app.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
})

gulp.task('test', ['htmlhint', 'scsslint', 'jshint']);

// MAIN
gulp.task('default', ['watch']);