const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "You must provide an ID"
    });
    //return;
  } else {
    if (!req.body.title) {
      res.status(400).send({
        message: "You must provide a title"
      });
    } else {
      if (!req.body.first_name) {
        res.status(400).send({
          message: "You must provide a first_name"
        });
      } else {
        if (!req.body.last_name) {
          res.status(400).send({
            message: "You must provide a last_name"
          });
        } else {
          if (!req.body.nic) {
            res.status(400).send({
              message: "You must provide NIC number"
            });
          } else {
            if (!req.body.contact_no) {
              res.status(400).send({
                message: "You must provide a contact number"
              });
            } else {
              if (!req.body.email) {
                res.status(400).send({
                  message: "You must provide a contact email"
                });
              } else {
                if (!req.body.password) {
                  res.status(400).send({
                    message: "You must provide a password"
                  });
                } else {
                  
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
                    is_enabled: req.body.enabled ? req.body.enabled : false
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
                }
              }
            }
          }
        }
      }
    }
  }
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

// Find a single User with the given ID (findByPk)
exports.findbyID = (req, res) => {

  const id = req.params.id;

  User.findByPk(id)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'User updated successfully!'
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe the User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error uploading the User with id=' + id
    });
  });

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.update({is_enabled: false}, {
    where: {
      id: id
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'User deleted successfully!'
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error deleting the User with id=' + id
    });
  });
};