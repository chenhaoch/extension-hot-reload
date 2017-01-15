var path = require('path');
var fs = require('fs');
var srcPath = path.resolve(__dirname, './src');
var buildPath = path.resolve(__dirname, './build');
var webpackDevConfig = require('./config/webpack.dev.config.js');
var webpackBuildConfig = require('./config/webpack.build.config.js');

var gulp = require('gulp');
var devServer = require('webpack-dev-server');
var webpack = require('webpack');
var clean = require('gulp-clean');

var getTime = function() {
  var now = new Date();
  var h = ('0' + now.getHours()).substr(-2, 2);
  var m = ('0' + now.getMinutes()).substr(-2, 2);
  var s = ('0' + now.getSeconds()).substr(-2, 2);
  return `[${h}:${m}:${s}]`;
};

var isClean = false;
gulp.task('clean', function() {
  if (isClean) {
    return;
  }
  isClean = true;
  return gulp.src(buildPath, {read: false})
             .pipe(clean());
});

gulp.task('createEntry', function() {
  var bizDir = path.resolve(__dirname, './src/biz/');
  var allBiz = fs.readdirSync(bizDir);
  var entrys = {};
  var entryName = [];
  allBiz.forEach(function(b) {
    var bp = path.resolve(bizDir, b);
    if (fs.statSync(bp).isDirectory()) {
      try {
        fs.openSync(path.resolve(bp, 'contentscript.js'), 'r');
      } catch(e) {
        return;
      }
      entryName.push(b);
      entrys[b] = [path.resolve(bp, 'contentscript.js')];
    }
  });
  console.log(`${getTime()} 添加入口： ${entryName}`);
  entrys['background'] = webpackDevConfig.entry.background;
  webpackDevConfig.entry = entrys;
  webpackBuildConfig.entry = entrys;
});

/* ------ dev ------ */
gulp.task('move-dev', ['clean'], function() {
  gulp.src(path.resolve(srcPath, './_locales/**/*.json'))
      .pipe(gulp.dest(path.resolve(buildPath, './_locales')));

  gulp.src(path.resolve(__dirname, './config/reload.js'))
      .pipe(gulp.dest(path.resolve(buildPath)));

  fs.mkdirSync(buildPath);
  var manifest = require('./src/manifest.json');
  manifest.background.scripts.push('./reload.js');
  fs.writeFileSync(path.resolve(buildPath, './manifest.json'), JSON.stringify(manifest, null, 2));
});

gulp.task('webpack-build-dev', ['clean'], function() {
  process.env.NODE_ENV = 'development';
  var port = 3007;
  for (var e in webpackDevConfig.entry) {
    webpackDevConfig.entry[e].push(`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server');
  }

  var config = Object.create(webpackDevConfig);
  var compiler = webpack(config);
  compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data, fileDir;
    Object.keys(assets).forEach(key => {
      file = path.resolve(buildPath, key);
      fileDir = path.dirname(file);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir);
      }
      data = assets[key].source();
      fs.writeFileSync(file, data);
    });
    callback();
  });

  var server = new devServer(compiler, {
    contentBase: './build',
    hot: true,
    inline: true,
    clientLogLevel: 'none',
    stats: {
      colors: true,
      chunks: false
    }
  });
  server.listen(port, '127.0.0.1', function() { });
});

gulp.task('dev', ['clean', 'createEntry', 'move-dev', 'webpack-build-dev']);

/* ----- build ----- */
gulp.task('move-build', ['clean'], function() {
  gulp.src(path.resolve(srcPath, './_locales/**/*.json'))
      .pipe(gulp.dest(path.resolve(buildPath, './locales')));

  fs.mkdirSync(buildPath);
  var manifest = require('./src/manifest.json');
  manifest.content_scripts.shift();
  fs.writeFileSync(path.resolve(buildPath, './manifest.json'), JSON.stringify(manifest, null, 2));
});

gulp.task('webpack-build-build', ['clean'], function() {
  process.env.NODE_ENV = 'production';

  var compiler = webpack(webpackBuildConfig, function() { });
  compiler.plugin('emit', (compilation, callback) => {
    console.log(`${getTime()} webpack build success`);
    callback();
  });
});

gulp.task('build', ['clean', 'createEntry', 'move-build', 'webpack-build-build']);
