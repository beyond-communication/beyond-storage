const Webpack = require('webpack')
const gulp = require('gulp')
const webpack = require('gulp-webpack')
const rename = require('gulp-rename')
const del = require('del')
const run = require('run-sequence')

gulp.task('clean', () => del(['./dist']))

const webpackConfig = minimize => ({
  output: {
    filename: minimize ? 'beyond-storage.min.js' : 'beyond-storage.js',
    library: 'BeyondStorage',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: minimize
    ? [
      new Webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        mangle: true,
        sourcemap: false
      })
    ]
    : []
})

gulp.task('script', () => {
  gulp.src('./src/beyond-storage.js')
  .pipe(webpack(webpackConfig(false), Webpack))
  .pipe(gulp.dest('./dist'))
  .pipe(webpack(webpackConfig(true), Webpack))
  .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['clean'], () => {
  run('script')
  gulp.watch('./src/beyond-storage.js', ['script'])
})
