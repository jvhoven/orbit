var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config

if (process.env.NODE_ENV === 'production') {
  config = require('./config/webpack.config.prod')
} else {
  config = require('./config/webpack.config.dev')
}

var Express = require('express')
var app = new Express()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use('/public', Express.static('src'))

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})