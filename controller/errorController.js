const AppError = require('../utils/appError');

const handlerCasrErrorDB = (err) => {
  const message = `Invalid ${err.path} :${err.value}`;
  return new AppError(message, 400);
};
const handlerDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  console.log(value);
  const message = `Duplicate field value :x. Please use another value!`;
  return new AppError(message, 400);
};
const handlerValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(message, 400);
};
const handlerJwtError = (err) => {
  return new AppError('Invalid token. Please log in again!', 401);
};
const hanlderTokenExpiredError = (err) => {
  return new AppError('Your token has expired! Please log in again!', 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  sendErrorDev(err, res);
};
