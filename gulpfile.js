var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var plumber = require("gulp-plumber");
var prefix = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");

gulp.task("sass", function () {
  gulp.src("app/assets/stylesheets/screen.scss").pipe(plumber()).pipe(sass({'sourcemap=none': true})).pipe(prefix()).pipe(minifyCSS()).pipe(gulp.dest("public/stylesheets/"));
});

gulp.task("watch", function () {
  gulp.watch("app/assets/stylesheets/**", ["sass"]);
});
