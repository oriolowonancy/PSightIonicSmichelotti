var gulp = require('gulp');
var bower = require('bower');
var sh = require('shelljs');
var argvs = require('yargs').argv;

var $ = require('gulp-load-plugins')();

var config = require('./gulp.config')();

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      $.util.log('bower', $.util.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + $.util.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', $.util.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + $.util.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

////////////////////
gulp.task('inject-js', function () {
  return gulp
    .src(config.index)
    .pipe($.if(argvs.verbose, $.print()))
    .pipe($.inject(gulp.src(config.js, {read:false}), {relative:true}))
    .pipe(gulp.dest(config.www));
});

gulp.task('inject-dependencies', function () {
  return gulp
    .src(config.js)
    .pipe($.if(argvs.verbose, $.print()))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(config.app));
});

gulp.task('inject', ['inject-js', 'inject-dependencies']);
