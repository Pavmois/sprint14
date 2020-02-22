const users = require('express').Router();
const { getAllUsers, getSingleUser } = require('../controllers/users');

users.get('/users', getAllUsers);
users.get('/:id', getSingleUser);

module.exports = users;
