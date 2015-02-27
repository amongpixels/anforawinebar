var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var slim = require("gulp-slim");
var plumber = require("gulp-plumber");
var prefix = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");
var s3 = require("gulp-s3");
var fs = require("fs");

var aws = JSON.parse(fs.readFileSync('./aws.json'));

gulp.task("sass", function () {
  gulp.src("sass/screen.scss").pipe(plumber()).pipe(sass({sourcemap: false})).pipe(prefix()).pipe(minifyCSS()).pipe(gulp.dest("public/"));
});

gulp.task("slim", function() {
  gulp.src("slim/*.slim").pipe(plumber()).pipe(slim({ pretty: false, translator: true })).pipe(gulp.dest("public/"));
});

gulp.task("watch", function () {
  gulp.watch("sass/**", ["sass"]);
  gulp.watch("slim/**", ["slim"]);
});

gulp.task("s3", function () {
  aws["bucket"] = "anforawinebar.co.uk";
  gulp.src("./public/**").pipe(s3(aws));
});
