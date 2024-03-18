const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./router/userRouter');
const khoaHocRouter = require('./router/courseRouter');
const baiHocRouter = require('./router/lessionRouter');

const quizzeRouter = require('./router/quizzeRouter');

const kanjiRouter = require('./router/kanjiRouter');
const tuVungRouter = require('./router/vocabularyRouter');

const chudeRouter = require('./router/suggestRouter');

const app = express();
app.use(express.json()); // trrung gian
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
//router
app.use('/api/v1/users', userRouter);
app.use('/api/v1/khoahoc', khoaHocRouter);
app.use('/api/v1/baihoc', baiHocRouter);

app.use('/api/v1/cauhoi', quizzeRouter);

app.use('/api/v1/kanji', kanjiRouter);
app.use('/api/v1/tuvung', tuVungRouter);

app.use('/api/v1/tech', chudeRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
