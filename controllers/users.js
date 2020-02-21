/* eslint-disable no-shadow */
require('dotenv').config();
const express = require('express');
const cookie = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const app = express();
app.use(cookie());

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))

    .then(({
      name,
      about,
      avatar,
      email,
    }) => res.send({
      name,
      about,
      avatar,
      email,
    }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка при создании пользователя' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('token', token);
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при поиске всех пользователей' }));
};

module.exports.getSingleUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким id' }));
};
