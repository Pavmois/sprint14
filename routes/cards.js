const cards = require('express').Router();
const {
  createCard, getAllCards, deleteCard,
} = require('../controllers/cards');

cards.post('/cards', createCard);
cards.get('/cards', getAllCards);
cards.delete('/cards/:id', deleteCard);

module.exports = cards;
