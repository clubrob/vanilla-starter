import Browser from 'browser-sync';

const browser = Browser.create();

function reload(done) {
  browser.reload();
  done();
}

function server(done) {
  browser.init({
    server: {
      baseDir: './dist',
    },
  });
  done();
}

export { reload, server };
