const User = require('../model/userModel');
const handlerFactory = require('./handlerFactory');
// đây chỉ là demo
exports.getAllUser = handlerFactory.getAll(User);
exports.createUser = handlerFactory.createOne(User);
