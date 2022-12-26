import { config } from 'dotenv';
config();

import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import webIndexRouter from './routes/web/index.js';
import cmsIndexRouter from './routes/cms/index.js'

const app = express();

//Set up mongoose connection
import mongoose from 'mongoose';
// { connect, Promise, connection }
const mongoDB = process.env.DATABASE_CONNECTION.replace('<username>', process.env.DATABASE_USERNAME).replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected successfully');
});

// view engine setup
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(join(__dirname, 'public')));


// 前端畫面 API
app.use('/api/web', webIndexRouter);
// 後端管理 API
app.use('/api/cms', cmsIndexRouter);

// app.use('/users', usersRouter);
// app.use('/statement', statementRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
