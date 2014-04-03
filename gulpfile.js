var gulp = require('gulp');
var git = require('gulp-git');
var package = require('./package.json');

var branch = 'origin';

gulp.task('pull', function(done){
  git.pull('origin', branch, {args: '--rebase'}, done);
});

// Run git add with options
gulp.task('add', ['pull'], function(){
  return gulp.src('./')
  .pipe(git.add());
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('commit', ['add'], function(){
  return gulp.src('./')
  .pipe(git.commit(package.name));
});

gulp.task('default', ['commit'], function(done){
  git.push('origin', branch, {args: " -f"}, done);
});