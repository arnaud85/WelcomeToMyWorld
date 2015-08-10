// LOCAL VARIABLES
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    htmlhint = require("gulp-htmlhint"),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del'),
    cache = require('gulp-cache'),
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


var onError = function (err) {  
  
    gutil.beep();
    console.log(err);
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
    gulp.watch(devFolder.img+"*", ['images']);
    gulp.watch(roots.base + "*.html").on("change", browserSync.reload);

});

// STYLE
gulp.task('style', function() {
    
    return gulp.src([devFolder.sass + 'bootstrap.css', devFolder.sass + "*.scss"])
        .pipe(plumber({
            
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(concat('style.css'))
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
        .pipe(plumber())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(distFolder.js))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Scripts task complete' }));
});


// IMAGES
gulp.task('images', function() {

    return gulp.src(devFolder.img+'*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(distFolder.img))
    .pipe(notify({ message: 'Images task complete' }));
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

// CLEAN
gulp.task('clean', function(){

    del(roots.dist, function (err, paths) {
    
        console.log('Clean project --> deleting DIST folder\n', paths.join('\n'));
    });
})

// MAIN
gulp.task('default', ['watch']);