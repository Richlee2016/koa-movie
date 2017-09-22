import gulp from "gulp";
import gulpif from "gulp-if";
import concat from "gulp-concat";
import webpack from "webpack";
import gulpWebpack from "webpack-stream";
import named from "vinyl-named";
import livereload from "gulp-livereload";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import { log, colors } from "gulp-util";
import args from "./util/args";

gulp.task("scripts", () => {
  return gulp
    .src(["app/js/*.js", "!app/js/jquery.min.js"])
    .pipe(
      plumber({
        errorHandle: function() {}
      })
    )
    .pipe(named())
    .pipe(
      gulpWebpack({
        module: {
          urles: [
            {
              test: /\.js$/,
              loader: "babel-loader",
              options: {
                presets: [
                    "es2015",
                    "stage-0",
                ],
                plugins: [
                    "transform-runtime",
                    "transform-async-to-generator"
                ]
            }
            }
          ]
        }
      }),
      null,
      (err, stats) => {
        log(
          `Finished '${colors.cyan("scripts")}'`,
          stats.toString({
            chunks: false
          })
        );
      }
    )
    .pipe(gulp.dest("server/public/js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      uglify({ compress: { properties: false }, output: { quote_keys: true } })
    )
    .pipe(gulp.dest("server/public/js"))
    .pipe(gulpif(args.watch, livereload()));
});
