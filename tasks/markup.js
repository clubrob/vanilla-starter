import gulp from 'gulp';
import clean from 'gulp-clean';
import htmlmin from 'gulp-htmlmin';
import paths from './paths';

const cleanMarkupFiles = gulp.task('cleanMarkupFiles', () =>
  gulp.src(`${paths.markup.dest}/**/*.html`, { allowEmpty: true, read: false })
    .pipe(clean()));

gulp.task('compileHTML', () =>
  gulp.src(paths.markup.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.markup.dest)));

gulp.task('compileHTMLProd', () =>
  gulp.src(paths.markup.src)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest(paths.markup.dest)));

const compileMarkup = gulp.task('compileMarkup', gulp.series('cleanMarkupFiles', 'compileHTML'));

const compileMarkupProd = gulp.task('compileMarkupProd', gulp.series('cleanMarkupFiles', 'compileHTMLProd'));

export { cleanMarkupFiles, compileMarkup, compileMarkupProd };
