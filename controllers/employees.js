const db = require("../models");
const Employee = db.Employee;
const Op = db.Sequelize.Op;

// Create and save an Employee
exports.create = (req, res) => {
    if (!req.body.ref_no) {
        res.status(400).send({
            message:"You must provide the ref_no"
        });
    } else {
        if (!req.body.title) {
            res.status(400).send({
                message:"You must provide a title"
            });
        } else {
            if (!req.body.first_name) {
                res.status(400).send({
                    message:"You must provide the first name"
                });
            } else {
                if (!req.body.last_name) {
                    res.status(400).send({
                        message:"You must provide the last name"
                    });
                } else {
                    if (!req.body.nic) {
                        res.status(400).send({
                            message:"You must provide NIC number"
                        });
                    } else {
                        if (!req.body.contact_no) {
                            res.status(400).send({
                                message:"You must provide a working cantact number"
                            });
                        } else {
                            if (!req.body.email) {
                                res.status(400).send({
                                    message:"You must provide a email address"
                                });
                            } else {
                                if (!req.body.gender) {
                                    res.status(400).send({
                                        message:"You must provide your gender"
                                    });
                                } else {
                                    if (!req.body.emp_start_date) {
                                        res.status(400).send({
                                            message:"You must provide the started date of working in the institute"
                                        });
                                    } else {
                                        
                                        // Create an Employee
                                        const employee = {
                                            ref_no: req.body.ref_no,
                                            title: req.body.title,
                                            first_name: req.body.first_name,
                                            last_name: req.body.last_name,
                                            name_with_initials: req.body.name_with_initials,
                                            institute_id: req.body.institute_id,
                                            role_id: req.body.role_id,
                                            nic: req.body.nic,
                                            contact_no: req.body.contact_no,
                                            email: req.body.email,
                                            gender: req.body.gender,
                                            dob: req.body.dob,
                                            emp_start_date: req.body.emp_start_date,
                                            emp_end_date: req.body.emp_end_date,
                                            status_id: req.body.status_id,
                                            is_enabled: req.body.enabled ? req.body.enabled : false
                                        }

                                        // Save Employee in the database
                                        Employee.create(employee)
                                        .then(data => {
                                            res.send(data);
                                        })
                                        .catch(err => {
                                            res.status(500).send({
                                                message: err.message || "Some error occurred while creating the Employee"
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
    }
}

// Retrieve all ACTIVE EMPLOYEES from the database_test
exports.findAllActive = (req, res) => {
    Employee.findAll({
        where: {
            is_enabled: true
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Employees"
        });
    });
}

// Retrieve all INACTIVE EMPLOYEES(Deleted) Institutes from the database
exports.findAllInactive = (req, res) => {
    Employee.findAll({
        where: {
          is_enabled: false
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Employees"
        });
    });
}

// Find a single Employee with the given ID (findByPk)
exports.findbyID = (req, res) => {
    const ref_no = req.params.ref_no;

    Employee.findByPk(ref_no)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Employee with ref_no=" + ref_no
        });
    });
}

// Update an Employee by the id in the request
exports.update = (req, res) => {
    const ref_no = req.params.ref_no;
  
    Employee.update(req.body, {
      where: { ref_no: ref_no }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Employee updated successfully!'
        });
      } else {
        res.send({
          message: `Cannot update Employee with ref_no=${ref_no}. Maybe the Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error uploading the Employee with ref_no=' + ref_no
      });
    });
};

// Delete an Employee with the specified id in the request
exports.delete = (req, res) => {
    const ref_no = req.params.ref_no;
  
    Employee.update({ is_enabled: false }, {
      where: {
        ref_no: ref_no
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Employee deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Employee with ref_no=${ref_no}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error deleting the Employee with ref_no=' + ref_no
      });
    });
};