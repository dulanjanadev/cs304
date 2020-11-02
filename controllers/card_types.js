const db = require('../models');
const Card_type = db.Card_type;
const Op = db.Sequelize.Op;

// Create and Save a new card type
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "You must provide an ID"
    });
  } else {
    if (!req.body.type) {
      res.status(400).send({
        message: "You must provide the type"
      });
    } else {
      // Create a card type
      const card_type = {
        id: req.body.id,
        type: req.body.type,
        description: req.body.description,
        is_enabled: req.body.is_enabled ? req.body.is_enabled : false
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
    }
  }
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

// Find a single Card type with the given ID (findByPk)
exports.findbyID = (req, res) => {

  const id = req.params.id;

  Card_type.findByPk(id, {
    include: ["cards"]
  })
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
        message: "Error retrieving Card types with id=" + id
      });
  });
};

// Update a Card type by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Card_type.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Card_type updated successfully!'
      });
    } else {
      res.send({
        message: `Cannot update Card_type with id=${id}. Maybe Card_type was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error uploading the Card_type with id=' + id
    });
  });
};

// Delete a Card type with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Card_type.update({is_enabled: false}, {
    where: {
      id: id
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Card_type deleted successfully!'
      });
    } else {
      res.send({
        message: `Cannot delete Card_type with id=${id}. Maybe Card_type was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error deleting the Card_type with id=' + id
    });
  });
};