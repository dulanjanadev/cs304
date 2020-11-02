const db = require("../models");
const Institute = db.Institute;
const Op = db.Sequelize.Op;

// Create and save an Institute
exports.create = (req, res) => {

    // Validate the request
    if (!req.body.id) {
        res.status(400).send({
            message:"You must provide an ID"
        });
    } else {
        if (!req.body.name) {
            res.status(400).send({
                message:"You must provide a Name"
            });
        } else {
            if (!req.body.distribution_frequency) {
                res.status(400).send({
                    message:"You must provide the distribution frequency"
                });
            } else {

                // Create an Institute
                const institute = {
                    id: req.body.id,
                    name: req.body.name,
                    ad_line_1: req.body.ad_line_1,
                    ad_line_2: req.body.ad_line_2,
                    ad_line_3: req.body.ad_line_3,
                    ad_line_4: req.body.ad_line_4,
                    inv_ad_line_1: req.body.inv_ad_line_1,
                    inv_ad_line_2: req.body.inv_ad_line_2,
                    inv_ad_line_3: req.body.inv_ad_line_3,
                    inv_ad_line_4: req.body.inv_ad_line_4,
                    distribution_frequency: req.body.distribution_frequency,
                    is_enabled: req.body.enabled ? req.body.enabled : false
                }

                // Save Institute in the database
                Institute.create(institute)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Institute"
                    });
                });
            }
        }
    }
}

// Retrieve all ACTIVE INSTITUTES from the database_test
exports.findAllActive = (req, res) => {
    Institute.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Institutes"
        });
    });
}

// Retrieve all INACTIVE INSTITUTES(Deleted) Institutes from the database
exports.findAllInactive = (req, res) => {
    Institute.findAll({
        where: {
          is_enabled: false
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Institutes"
        });
    });
}

// Find a single Institute with the given ID (findByPk)
exports.findbyID = (req, res) => {
    const id = req.params.id;

    Institute.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Institute with id=" + id
        });
    });
}

// Update an Institute by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Institute.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Institute updated successfully!'
        });
      } else {
        res.send({
          message: `Cannot update Institute with id=${id}. Maybe the Institute was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error uploading the Institute with id=' + id
      });
    });
}

// Delete an Institute with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Institute.update({ is_enabled: false }, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Institute deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Institute with id=${id}. Maybe Institute was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error deleting the Institute with id=' + id
      });
    });
}