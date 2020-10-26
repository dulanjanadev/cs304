const db = require('../models');
const Status = db.Status;
const Op = db.Sequelize.Op;

roles = [];

// Create and Save a new Status
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Id must be added"
    });
    return;
  }

  // Create a Status
  const status = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    is_enabled: req.body.enabled ? req.body.enabled : true
  };

  // Save Status in the database
  Status.create(status)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Status."
      });
    });
};

// Retrieve all ACTIVE STATUSES from the database
exports.findAllActive = (req, res) => {
  
  Status.findAll({
    where: {
      is_enabled: true
    }
  }, {
    include: ["users"]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Status"
    });
  });
};

// Retrieve all INACTIVE(Deleted) STATUS from the database
exports.findAllInactive = (req, res) => {
  
    Status.findAll({
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
      message: err.message || "Some error occurred while retrieving Status"
    });
  });
};

// Retrieve a single Status with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Status.findByPk(id, {
    include: ["users"]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Status with id=" + id
      });
    });
};

// Update a Status by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Status.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Status updated successfully!'
      });
    } else {
      res.send({
        message: `Cannot update Status with id=${id}. Maybe Status was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error uploading the Status with id=' + id
    });
  });

};

// Delete a Status with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Status.update({is_enabled: false}, {
    where: {
      id: id
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Status deteled successfully!'
      });
    } else {
      res.send({
        message: `Cannot detele Status with id=${id}. Maybe Status was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error deteling the Status with id=' + id
    });
  });
};

// Delete all Statuses from the database.
