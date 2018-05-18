import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import uglify from 'gulp-uglify';
import paths from './paths';

const cleanScriptFiles = gulp.task('cleanScriptFiles', () =>
  gulp.src(paths.scripts.dest, { allowEmpty: true, read: false })
    .pipe(clean()));

gulp.task('compileJS', () =>
  gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest)));

gulp.task('compileJSProd', () =>
  gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest)));

const compileScript = gulp.task('compileScript', gulp.series('cleanScriptFiles', 'compileJS'));

const compileScriptProd = gulp.task('compileScriptProd', gulp.series('cleanScriptFiles', 'compileJSProd'));

export { cleanScriptFiles, compileScriptProd, compileScript };
