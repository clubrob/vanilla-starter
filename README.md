# vanilla-starter

> Simple web starter kit using Gulp 4/Babel/Sass.

## Build Setup

Gulp tasks are separated into ES6 modules in the /tasks folder and processed on the fly through `babel-register`.

```bash
  # install dependencies
  npm install
```

### npm scripts

```bash
# browser-sync serves /dist folder at localhost:3000
npm run dev

# package dist for production
npm run production

# delete /dist
npm run clean

# compress /dist/images files
npm run imagemin
```
