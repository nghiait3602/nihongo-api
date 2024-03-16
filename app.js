const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./router/userRouter');
const khoaHocRouter = require('./router/courseRouter');
const baiHocRouter = require('./router/lessionRouter');

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

app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
