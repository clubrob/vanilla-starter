import gulp from 'gulp';
import sass from 'gulp-sass';
import paths from './paths';

const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const compileStyle = gulp.task('compileStyle', () =>
  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [paths.node.src],
    })).on('error', sass.logError)
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest)));

const compileStyleProd = gulp.task('compileStyleProd', () =>
  gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: [paths.node.src],
    })).on('error', sass.logError)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest)));

export { compileStyleProd, compileStyle };
