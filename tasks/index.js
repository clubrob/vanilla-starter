import gulp from 'gulp';

// Env
import paths from './paths';
import { reload, server } from './server';

// Tasks
import './style'; // Tasks: compileStyle
import './markup'; // Tasks: compileMarkup
import './script'; // Tasks: compileScript
import './images'; // Tasks: compileImages

const scriptWatch = paths.scripts.src; // `${paths.scripts.root}/modules/**/*.js`;

// Dev
// Watch
gulp.task('watchMarkup', () => gulp.watch(paths.markup.src, gulp.series('compileMarkup', reload)));
gulp.task('watchScript', () => gulp.watch(scriptWatch, gulp.series('compileScript', reload)));
gulp.task('watchStyle', () => gulp.watch(paths.styles.src, gulp.series('compileStyle', reload)));
gulp.task('watchImages', () => gulp.watch(paths.images.src, gulp.series('compileImages', reload)));
gulp.task('watch', gulp.parallel('watchMarkup', 'watchScript', 'watchStyle', 'watchImages'));

// Compile
gulp.task('compile', gulp.parallel('compileMarkup', 'compileScript', 'compileStyle', 'compileImages'));

// Serve
gulp.task('serve', gulp.series('compile', server));

// Production
gulp.task('compileProduction', gulp.parallel('compileMarkup', 'compileScriptProd', 'compileStyleProd', 'compileImages'));

// Export tasks
const dev = gulp.parallel('serve', 'watch');
const imagemin = gulp.series('compileImages');
const production = gulp.series('compileProduction');
const clean = gulp.parallel('cleanStyleFiles', 'cleanScriptFiles', 'cleanMarkupFiles', 'cleanImageFiles');

export { dev, imagemin, production, clean };
