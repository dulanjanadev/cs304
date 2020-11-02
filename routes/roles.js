const express = require('express');
const rolesController = require('../controllers/roles');

const router = express.Router();

// create a new role
router.post('/', rolesController.create);

// retrieving ACTIVE Roles
router.get('/active', rolesController.findAllActive);

// retrieving INAVTIVE(Deleted) Roles
router.get('/inactive', rolesController.findAllInactive);

// find a Role by id
router.get('/:id', rolesController.findbyID);

// Find all Roles with an attribute otherthan the is_enabled...
// router.get('/', rolesController.findbyName);

// update a role with an id
router.put('/:id', rolesController.update);

// delete a Role
router.put('/delete/:id', rolesController.delete);

// deleteAll
// confusing a bit


module.exports = router;