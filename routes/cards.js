const cards = require('express').Router();
const {
  createCard, getAllCards, deleteCard,
} = require('../controllers/cards');

cards.post('/', createCard);
cards.get('/', getAllCards);
cards.delete('/cards/:id', deleteCard);

module.exports = cards;
