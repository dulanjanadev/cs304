const express = require('express');
const employeeController = require('../controllers/employees')

const router = express.Router();

router.post('/', employeeController.create);

router.get('/active', employeeController.findAllActive);

router.get('/inactive', employeeController.findAllInactive);

router.get('/:ref_no', employeeController.findbyID);

router.put('/:ref_no', employeeController.update);

router.put('/delete/:ref_no', employeeController.delete);

module.exports = router;