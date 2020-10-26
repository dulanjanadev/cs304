const db = require('../models');
const Card_type = db.Card_type;
const Op = db.Sequelize.Op;

// Create and Save a new card type
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Id can not be empty!"
    });
    return;
  }

  // Create a card type
  const card_type = {
    id: req.body.id,
    type: req.body.type,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Card type in the database
  Card_type.create(card_type)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the card type."
      });
    });
};

// Retrieve all ACTIVE card types from the database.
exports.findAllActive = (req, res) => {
    Card_type.findAll({ 
        where: {
            is_enabled: true
        } 
    }, {
      include: ["cards"]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving card types."
      });
    });
};

// Retrieve all INACTIVE(Deleted) card types from the database.
exports.findAllInactive = (req, res) => {
    Card_type.findAll({ 
        where: {
            is_enabled: false
        } 
    }, {
      include: ["users"]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving card types."
      });
    });
};