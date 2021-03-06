const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка при создании карточки -- ${err}` }));
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при поиске карточек' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Карточка отсутствует' });
      if (!card.owner.equals(req.user._id)) return res.status(403).send({ message: 'Вы не можете удалять чужие карточки' });

      return Card.remove(card).then((cardToDelete) => res.send(cardToDelete));
    })
    .catch(() => res.status(500).send({ message: 'Карточка отсутствует' }));
};
