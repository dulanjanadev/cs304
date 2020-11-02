const db = require('../models');
const Report = db.Report;
const Op = db.Sequelize.Op;

// Create and save a Distribution
exports.create = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message:"You must provide an ID"
        });
    } else {

        // Create a Report
        const report = {
            id: req.body.id,
            distribution_id: req.body.distribution_id,
            institute_id: req.body.institute_id,
            prepared_by: req.body.prepared_by,
            prepared_date: req.body.prepared_date,
            is_enabled: req.body.is_enabled ? req.body.is_enabled : false,
        }

        // Save a Report in the database
        Report.create(report)
        .then(data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Report"
            });
        })
    }
}

// Retrieve all ACTIVE Reports from the database
exports.findAllActive = (req, res) => {
    Report.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Reports"
        });
    });
}

// Retrieve all INACTIVE Reports(Deleted) Institutes from the database
exports.findAllInactive = (req, res) => {
    Report.findAll({
        where: {
          is_enabled: false
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Reports"
        });
    });
}

// Find a single Report with the given ID (findByPk)
exports.findbyID = (req, res) => {
    const id = req.params.id;

    Report.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Report with id=" + id
        });
    });
}

// Update a Report by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Report.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Report updated successfully!'
        });
      } else {
        res.send({
          message: `Cannot update Report with id=${id}. Maybe the Report was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error uploading the Report with id=' + id
      });
    });
}

// Delete a Report with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Report.update({ is_enabled: false }, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Report deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Report with id=${id}. Maybe Report was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error deleting the Report with id=' + id
      });
    });
}