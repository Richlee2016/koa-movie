import gulp from "gulp";
import gulpif from "gulp-if";
import liveserver from "gulp-live-server";
import args from "./util/args";
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
gulp.task("serve", cb => {
  if (!args.watch) return cb();

  var server = liveserver.new(["--harmony", "server/start"]);
  server.start();

  browserSync.init({
    proxy: "http://localhost:3001"
  });

  gulp.watch(["app/views/*.ejs","server/public/css/index.css","app/js/*.js"]).on("change", function(){
    reload();
    console.log(0);
  })

  gulp.watch(
    [
      "server/controller/**/*.js",
      "server/app.js",
      "server/routes/**/*.js",
      "server/middleware/**/*.js"
    ],
    function() {
      server.start.bind(server)();
    }
  );
});
