import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import paths from './paths';

const compileImages = gulp.task('compileImages', (done) => {
  gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
  done();
});

export default compileImages;
