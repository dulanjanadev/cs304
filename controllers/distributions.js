const db = require('../models');
const Distribution = db.Distribution;
const Op = db.Sequelize.Op;

// Create and save a Distribution
exports.create = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message:"You must provide an ID"
        });
    } else {

        // Create a Distribution
        const distribution = {
            id: req.body.id,
            institute_id: req.body.institute_id,
            send_date: req.body.send_date,
            distribution_period: req.body.distribution_period,
            exposure_start_date: req.body.exposure_start_date,
            exposure_end_date: req.body.exposure_end_date,
            prepared_by: req.body.prepared_by,
            prepared_date: req.body.prepared_date,
            received_by: req.body.received_by,
            received_date: req.body.received_date,
            read_by: req.body.read_by,
            read_date: req.body.read_date,
            processed_by: req.body.processed_by,
            processed_date: req.body.processed_date,
            background_dose: req.body.background_dose,
            method_used: req.body.method_used,
            no_of_cards_sent: req.body.no_of_cards_sent,
            no_of_cards_returned: req.body.no_of_cards_returned,
            remarks: req.body.remarks,
            is_enabled: req.body.is_enabled ? req.body.is_enabled : false,
            status_id: req.body.status_id
        }
        
        // Save a Distribution in the database
        Distribution.create(distribution)
        .then(data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Distribution"
            });
        })
    }
}

// Retrieve all ACTIVE Distributions from the database
exports.findAllActive = (req, res) => {
    Distribution.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Distributions"
        });
    });
}

// Retrieve all INACTIVE Distributions(Deleted) Institutes from the database
exports.findAllInactive = (req, res) => {
    Distribution.findAll({
        where: {
          is_enabled: false
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Distributions"
        });
    });
}

// Find a single Distribution with the given ID (findByPk)
exports.findbyID = (req, res) => {
    const id = req.params.id;

    Distribution.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Distribution with id=" + id
        });
    });
}

// Update a Distribution by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Distribution.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Distribution updated successfully!'
        });
      } else {
        res.send({
          message: `Cannot update Distribution with id=${id}. Maybe the Distribution was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error uploading the Distribution with id=' + id
      });
    });
}

// Delete a Distribution with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Distribution.update({ is_enabled: false }, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Distribution deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Distribution with id=${id}. Maybe Distribution was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error deleting the Distribution with id=' + id
      });
    });
}