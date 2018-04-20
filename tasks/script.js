import gulp from 'gulp';
import paths from './paths';

const finalDest = paths.scripts.dest;

gulp.task('bundleUp', () =>
  gulp.src(paths.scripts.src)
    .pipe(gulp.dest(finalDest)));

const compileScript = gulp.task('compileScript', gulp.series('bundleUp'));

export default compileScript;
