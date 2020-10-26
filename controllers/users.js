const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Id must be added"
    });
    return;
  }

  // Create a User
  const user = {
    
    id: req.body.id,
    title: req.body.title,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    name_with_initials: req.body.name_with_initials,
    role_id: req.body.role_id,
    nic: req.body.nic,
    contact_no: req.body.contact_no,
    email: req.body.email,
    password: req.body.password,
    status_id: req.body.status_id,
    is_enabled: req.body.enabled ? req.body.enabled : true
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });

};

// Retrieve all ACTIVE USERS from the database.
exports.findAllActive = (req, res) => {
    
    User.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users"
        });
    });
};

// Retrieve all INACTIVE(Deleted) USERS from the database
exports.findAllInactive = (req, res) => {
  
    User.findAll({
      where: {
        is_enabled: false
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users"
      });
    });
  };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };