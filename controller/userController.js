const User = require('../model/userModel');
const handlerFactory = require('./handlerFactory');

exports.getAllUser = handlerFactory.getAll(User);
exports.createUser = handlerFactory.createOne(User);
