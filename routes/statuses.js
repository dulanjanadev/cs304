const express = require('express');
const statusesController = require('../controllers/statuses');

const router = express.Router();

// create a new role
router.post('/', statusesController.create);

// retrieving ACTIVE Roles
router.get('/active', statusesController.findAllActive);

// retrieving INAVTIVE(Deleted) Roles
router.get('/inactive', statusesController.findAllInactive);

// find a Role by id
router.get('/:id', statusesController.findOne);

// update a role with an id
router.put('/:id', statusesController.update);

// delete a Role
router.put('/delete/:id', statusesController.delete);

module.exports = router;