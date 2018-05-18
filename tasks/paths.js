const paths = {
  scripts: {
    root: 'src/js',
    src: 'src/js/**/*.js',
    dest: 'dist/js',
  },
  styles: {
    root: 'src/scss',
    src: 'src/scss/**/*.scss',
    dest: 'dist/css',
  },
  markup: {
    root: 'src/markup',
    src: 'src/markup/**/*.html',
    dest: 'dist',
  },
  images: {
    root: 'src/images',
    src: 'src/images/**/*.+(png|jpg|gif|svg)',
    dest: 'dist/images',
  },
  node: {
    src: 'node_modules',
  },
};

export default paths;
