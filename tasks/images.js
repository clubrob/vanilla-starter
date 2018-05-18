import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import clean from 'gulp-clean';
import paths from './paths';

const cleanImageFiles = gulp.task('cleanImageFiles', () =>
  gulp.src(paths.images.dest, { allowEmpty: true, read: false })
    .pipe(clean()));

gulp.task('imagemin', (done) => {
  gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
  done();
});

const compileImages = gulp.task('compileImages', gulp.series('cleanImageFiles', 'imagemin'));

export { cleanImageFiles, compileImages };
