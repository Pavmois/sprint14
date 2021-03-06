const express = require('express');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookie());

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({ message: 'Необходимо авторизоваться!' });
  }
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Необходимо авторизоваться!' });
  }

  req.user = payload;

  next();
};
