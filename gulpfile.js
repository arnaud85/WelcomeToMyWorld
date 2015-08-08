// LOCAL VARIABLES
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
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

// WATCH FOR CHANGES IN HTML/SCSS FILES
gulp.task('watch', function () {

    browserSync.init({
        
        server: {
        	
        	baseDir: roots.base
        },

        browser: ["google chrome", "firefox"]

    });

    gulp.watch(devFolder.sass + "*.scss", ['sass']);
    gulp.watch(devFolder.js + "*.js", ['scripts']);
    gulp.watch(roots.base + "*.html").on("change", browserSync.reload);
});

// SCSS -> CSS
gulp.task('sass', function() {
    
    return gulp.src(devFolder.sass + "*.scss")
    	.pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .pipe(gulp.dest(distFolder.css))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'SASS task complete' }));
});

// SCRIPTS
gulp.task('scripts', function() {

    return gulp.src(devFolder.js + "*.js")
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest(distFolder.js))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(distFolder.js))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('default', ['watch']);