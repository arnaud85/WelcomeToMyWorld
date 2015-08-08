// LOCAL VARIABLES
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


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

// WATCH FOR CHANGES IN HTML FILES
gulp.task('watch', function () {

    browserSync.init({
        
        server: {
        	
        	baseDir: roots.base
        }

    });

    gulp.watch(devFolder.sass + "*.scss", ['sass']);

    gulp.watch(roots.base + "*.html").on("change", browserSync.reload);
});

// SASS -> CSS
gulp.task('sass', function() {
    
    return gulp.src(devFolder.sass + "*.scss")
    	.pipe(sass())
        .pipe(gulp.dest(distFolder.css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['watch']);