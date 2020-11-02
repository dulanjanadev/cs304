const db = require('../models');
const Card = db.Card;
const Op = db.Sequelize.Op;

// Create and save a Card
exports.create = (req, res) => {

    // Validate the request
    if (!req.body.id) {
        res.status(400).send({
            message:"You must provide an ID"
        });
    } else {
        if (!req.body.is_background) {
            res.status(400).send({
                message:"You must provide is_background"
            });
        } else {
            // Create a Card 
            const card = {
                id: req.body.id,
                type_id: req.body.type_id,
                status_id: req.body.status_id,
                is_background: req.body.is_background ? req.body.is_background : false,
                purchased_date: req.body.purchased_date,
                description: req.body.description,
                emp_ref_no: req.body.emp_ref_no,
                is_enabled: req.body.is_enabled ? req.body.is_enabled : false
            }

            // Save a Card in the database
            Card.create(card)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Card"
                });
            });
            
        }
    }
}

// Retrieve all ACTIVE Cards from the database
exports.findAllActive = (req, res) => {
    Card.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Cards"
        });
    });
}

// Retrieve all INACTIVE Cards(Deleted) Institutes from the database
exports.findAllInactive = (req, res) => {
    Card.findAll({
        where: {
          is_enabled: false
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Cards"
        });
    });
}

// Find a single Card with the given ID (findByPk)
exports.findbyID = (req, res) => {
    const id = req.params.id;

    Card.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Card with id=" + id
        });
    });
}

// Update a Card by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Card.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Card updated successfully!'
        });
      } else {
        res.send({
          message: `Cannot update Card with id=${id}. Maybe the Card was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error uploading the Card with id=' + id
      });
    });
}

// Delete a Card with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Card.update({ is_enabled: false }, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Card deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error deleting the Card with id=' + id
      });
    });
}