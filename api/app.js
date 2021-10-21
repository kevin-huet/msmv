require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const sassMiddleware = require('node-sass-middleware')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const bookingRouter = require('./routes/booking')
const codeBarrierRouter = require('./routes/barrierCode')
const codePromoRouter = require('./routes/promoCode')
const { xss } = require('express-xss-sanitizer')
const app = express()
const cors = require('cors')
const passportStrategy = require('./middlewares/passport')
const logger = require('morgan')

mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
  console.log('Connected to Mongo')
}).on('error',function(err) {
  console.log('Mongo Error', err)
})

app.use(xss())
app.use(passport.initialize())
app.use(bodyParser.json())
app.use(cors({ origin: [process.env.CORS_AUTHORIZE], }))
app.use(logger(process.env.LOGGER))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/code', codeBarrierRouter)
app.use('/code', codePromoRouter)
app.use('/booking', bookingRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
