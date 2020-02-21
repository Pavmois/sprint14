const users = require('express').Router();
const { getAllUsers, getSingleUser, createUser } = require('../controllers/users');

users.get('/users', getAllUsers);
users.get('/user/:id', getSingleUser);
users.post('/users', createUser);

module.exports = users;
