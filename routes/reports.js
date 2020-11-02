const express = require('express');
const reportControllers = require('../controllers/reports');

const router = express.Router();

router.post('/', reportControllers.create);

router.get('/active', reportControllers.findAllActive);

router.get('/inactive', reportControllers.findAllInactive);

router.get('/:id', reportControllers.findbyID);

router.put('/:id', reportControllers.update);

router.put('/delete/:id', reportControllers.delete);

module.exports = router;