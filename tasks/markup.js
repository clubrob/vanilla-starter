import gulp from 'gulp';
import paths from './paths';

const compileMarkup = gulp.task('compileMarkup', () =>
  gulp.src(paths.markup.src)
    .pipe(gulp.dest(paths.markup.dest)));

export default compileMarkup;
