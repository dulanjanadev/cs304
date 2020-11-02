const db = require('../models');
const DistCard = db.Distribution_cards;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
    if (!req.body.distribution_id) {
        res.status(400).send({
            message:"You must provide a distribution ID"
        });
    } else {
        if (!req.body.card_id) {
            res.status(400).send({
                message:"You must provide a card ID"
            });
        } else {

            // Create
            const distcard = {
                distribution_id: req.body.distribution_id,
                card_id: req.body.card_id,
                reading: req.body.reading,
                dose: req.body.dose,
                is_enabled: req.body.is_enabled ? req.body.is_enabled : false
            }

            // Save
            DistCard.create(distcard)
            .then(data => {
                res.send(data);
            })
            .catch( err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the cards for the distribution(DistCards)"
                });
            })

        }
    } 
}

// Retrieve all ACTIVE Records from the database
exports.findAllActive = (req, res) => {
    DistCard.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving DistCards"
        });
    });
}

// Retrieve all INACTIVE DistCards(Deleted) Institutes from the database
exports.findAllInactive = (req, res) => {
    DistCard.findAll({
        where: {
          is_enabled: false
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving DistCards"
        });
    });
}

// Find a single DistCard with the given ID (findByPk)
exports.findbyID = (req, res) => {
    const id = req.params.id;

    DistCard.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving DistCard with id=" + id
        });
    });
}

// Update a DistCard by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    DistCard.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'DistCard updated successfully!'
        });
      } else {
        res.send({
          message: `Cannot update DistCard with id=${id}. Maybe the DistCard was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error uploading the DistCard with id=' + id
      });
    });
}

// Delete a DistCard with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    DistCard.update({ is_enabled: false }, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'DistCard deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete DistCard with id=${id}. Maybe DistCards was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error deleting the DistCard with id=' + id
      });
    });
}