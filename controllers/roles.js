const db = require('../models');
const Role = db.Role;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "You must provide an ID"
    });
  } else {
    if (!req.body.name) {
      res.status(400).send({
        message: "You must provide a name"
      });
    } else {
      // Create a Role
      const role = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        is_enabled: req.body.is_enabled ? req.body.is_enabled : false
      };
      
      // Save role in the database
      Role.create(role)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Role."
        });
      });
    }
  }

};

// Retrieve all ACTIVE ROLES from the database
exports.findAllActive = (req, res) => {

  Role.findAll({
    where: {
      is_enabled: true
    },
  }, {
    include: ["users"]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Roles"
    });
  });
};

// Retrieve all INACTIVE(Deleted) ROLES from the database
exports.findAllInactive = (req, res) => {
  
  Role.findAll({
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
      message: err.message || "Some error occurred while retrieving Roles"
    });
  });
};

// Find all Roles with an attribute otherthan the is_enabled...
// eg. If the name given, retrieve all the names...
// exports.findbyName = (req, res) => {

//   const name = req.query.name;
//   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//   Role.findAll({
//     where: {
//       condition
//     }
//   }, {
//     include: ["users"]
//   })
//   .then(data => {
//       res.send(data);
//   })
//   .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving the Role with name=" + name
//       });
//   });
// };

// Find a single Role with the given ID (findByPk)
exports.findbyID = (req, res) => {

  const id = req.params.id;

  Role.findByPk(id, {
    include: ["users"]
  })
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
        message: "Error retrieving Roles with id=" + id
      });
  });
};

// Find a single role with a given attribute (findOne)
// Since findOne() retrieves the first entry it finds, we do not include it here because rather than
// having the first entry, it is always good to have all entries that satisfies the condition.

// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Role updated successfully!'
      });
    } else {
      res.send({
        message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error uploading the Role with id=' + id
    });
  });

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Role.update({is_enabled: false}, {
    where: {
      id: id
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Role deleted successfully!'
      });
    } else {
      res.send({
        message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error deleting the Role with id=' + id
    });
  });
};


// I don't know what this is coded below 😂

// exports.deleteAll = (req, res) => {

//   Role.findAll({
//     where: {
//       is_enabled: true
//     }
//   })
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message: err.message || "Some error occurred while retrieving Roles"
//     });
//   });
// };