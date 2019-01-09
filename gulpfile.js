// require('dotenv').config(); // plugin for accessing .env file values
// const path = require('path');
const gulp = require('gulp');
const del = require('del');
// HTML processing modules
const htmlmin = require('gulp-htmlmin');
// CSS processing modules
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const precss = require('precss');
const colorFunction = require('postcss-color-function');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
// JS processing modules
const terser = require('gulp-uglify-es').default;
const webpackStream = require('webpack-stream');
// Image processing modules
const imagemin = require('gulp-imagemin');
// Font processing modules
// Dev browser modules
const browser = require('browser-sync').create();
// const historyApi = require('connect-history-api-fallback'); // plugin for SPA functionality

const productionDirectory = 'www';
const sourceDirectory = 'src';

gulp.task('clean:production', () => {
  return del([`${productionDirectory}/**/*`]);
});

gulp.task('bundleJSDev', () =>
  gulp
    .src(`${sourceDirectory}/js/app.js`, { sourcemaps: true })
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'app.bundle.js',
        },
        devtool: 'inline-source-map',
        node: {
          fs: 'empty',
        },
        plugins: [
          // new webpackStream.webpack.EnvironmentPlugin([]), // add .env variables
        ],
      })
    )
    .pipe(gulp.dest(`${productionDirectory}/js`))
    .pipe(browser.stream())
);

gulp.task('bundleJS', () =>
  gulp
    .src(`${sourceDirectory}/js/app.js`)
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'app.bundle.js',
        },
        node: {
          fs: 'empty',
        },
        plugins: [
          // new webpackStream.webpack.EnvironmentPlugin([]), // add .env variables
        ],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest(`${productionDirectory}/js`))
    .pipe(browser.stream())
);

gulp.task('bundleCSS', () =>
  gulp
    .src(`${sourceDirectory}/css/style.css`)
    .pipe(postcss([postcssImport(), precss(), colorFunction(), autoprefixer()]))
    .pipe(csso())
    .pipe(gulp.dest(`${productionDirectory}/css`))
    .pipe(browser.stream())
);

gulp.task('cleanHTML', () =>
  gulp
    .src(`${sourceDirectory}/views/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`${productionDirectory}`))
    .pipe(browser.stream())
);

gulp.task('cleanImages', () =>
  gulp
    .src(`${sourceDirectory}/images/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${productionDirectory}/assets/images`))
    .pipe(browser.stream())
);

gulp.task('cleanFonts', () =>
  gulp
    .src(`${sourceDirectory}/fonts/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${productionDirectory}/assets/fonts`))
    .pipe(browser.stream())
);

gulp.task(
  'serve',
  gulp.parallel(
    ['bundleCSS', 'bundleJSDev', 'cleanHTML', 'cleanImages', 'cleanFonts'],
    function browserSyncInit() {
      browser.init({
        port: 5500,
        server: {
          baseDir: `./${productionDirectory}`,
          // middleware: [historyApi()], // plugin for SPA functionality
        },
      });

      gulp.watch(`${sourceDirectory}/css/**/*.css`, gulp.series('bundleCSS'));
      gulp.watch(`${sourceDirectory}/css/**/*.pcss`, gulp.series('bundleCSS'));
      gulp.watch(`${sourceDirectory}/js/**/*.js`, gulp.series('bundleJSDev'));
      gulp.watch(`${sourceDirectory}/views/*.html`, gulp.series('cleanHTML'));
      gulp.watch(`${sourceDirectory}/images/*`, gulp.series('cleanImages'));
      gulp.watch(`${sourceDirectory}/fonts/*`, gulp.series('cleanFonts'));
    }
  )
);

gulp.task('default', gulp.series('clean:production', 'serve'));
gulp.task('build', gulp.parallel('bundleCSS', 'bundleJS', 'cleanHTML', 'cleanImages', 'cleanFonts'));
gulp.task('prod', gulp.series('clean:production', 'build'));
