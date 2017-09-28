var gulp = require("gulp");
import gulpif from 'gulp-if';
var postcss = require("gulp-postcss");
var less = require("gulp-less");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

// var browserSync = require('browser-sync').create();
// var reload      = browserSync.reload;

gulp.task("less", function() {
  var processors = [autoprefixer, cssnano];
  return gulp
    .src("app/**/*.less")
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest("server/public"))
    // .pipe(reload({stream: true}));
});
