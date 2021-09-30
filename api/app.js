require('dotenv').config()
let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let sassMiddleware = require('node-sass-middleware')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let passport = require('passport')
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let authRouter = require('./routes/auth')
let app = express()
let passportStrategy = require('./middlewares/passport')

mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
  console.log('Connected to Mongo');
}).on('error',function(err){
  console.log('Mongo Error', err);
})

app.use(passport.initialize());
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
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
