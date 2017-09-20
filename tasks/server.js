import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
  if(!args.watch) return cb();

  var server = liveserver.new(['--harmony','server/start']);
  server.start();

  gulp.watch(['server/public/**/*.js','server/public/**/*.css','server/src/views/**/*.ejs'],function(file){
    server.notify.apply(server,[file]);
  })

  gulp.watch(['server/controller/**/*.js','server/app.js','server/routes/**/*.js','server/middleware/**/*.js'],function(){
    server.start.bind(server)()
  });
})
