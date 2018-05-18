import gulp from 'gulp';
import sass from 'gulp-sass';
import clean from 'gulp-clean';
import csso from 'gulp-csso';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import paths from './paths';

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
];

const cleanStyleFiles = gulp.task('cleanStyleFiles', () =>
  gulp.src(paths.styles.dest, { allowEmpty: true, read: false })
    .pipe(clean()));

gulp.task('compileSass', () =>
  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [paths.node.src],
    })).on('error', sass.logError)
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest)));

gulp.task('compileSassProd', () =>
  gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: [paths.node.src],
    })).on('error', sass.logError)
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest)));

gulp.task('normalizeCSS', () =>
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest)));

const compileStyle = gulp.task('compileStyle', gulp.series('cleanStyleFiles', gulp.parallel('compileSass', 'normalizeCSS')));

const compileStyleProd = gulp.task('compileStyleProd', gulp.series('cleanStyleFiles', gulp.parallel('compileSassProd', 'normalizeCSS')));

export { compileStyleProd, compileStyle, cleanStyleFiles };
