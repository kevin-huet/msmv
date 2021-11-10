require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const bookingRouter = require('./routes/booking')
const codeBarrierRouter = require('./routes/barrierCode')
const codePromoRouter = require('./routes/promoCode')
const compression = require('compression')
const { xss } = require('express-xss-sanitizer')
const app = express()
const cors = require('cors')
const passportStrategy = require('./middlewares/passport')
const logger = require('morgan')
const router = express.Router()
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MSMV API | Express.js",
      version: "0.1.0",
      description:
          "Documentation de l'API du site MSMV, conçue avec Express.js",
      contact: {
        name: "Bimeo",
        email: "contact@bimeo.fr",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
}
const swaggerSpec = swaggerJsdoc(options)
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open',function(){
  console.log('Connected to Mongo')
}).on('error',function(err) {
  console.log('Mongo Error', err)
})

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(compression())
app.use(xss())
app.use(passport.initialize())
app.use(bodyParser.json())
app.use(cors({ origin: [process.env.CORS_AUTHORIZE], }))
app.use(logger(process.env.LOGGER))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/code', codeBarrierRouter)
app.use('/code', codePromoRouter)
app.use('/booking', bookingRouter)

module.exports = app
