import { config } from 'dotenv'

import cors from 'cors'
// import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
// import { join } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import router from './routes/index.js'
import { verifyApiKey } from './controllers/api.controller.js'

// Set up mongoose connection
import mongoose from 'mongoose'
config()

const app = express()
// { connect, Promise, connection }
const mongoDB = process.env.DATABASE_CONNECTION.replace(
  '<username>',
  process.env.DATABASE_USERNAME
).replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('MongoDB connected successfully')
})

// view engine setup
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(join(__dirname, 'public')));

// 前端畫面 API
app.use('/api', verifyApiKey, router)

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err, 'err')
  res.send(err)
})

export default app
