const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/', userController.create);

router.get('/active', userController.findAllActive);

router.get('/inactive', userController.findAllInactive);

router.get('/:id', userController.findbyID);

router.put('/:id', userController.update);

router.put('/delete/:id', userController.delete);

module.exports = router;