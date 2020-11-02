const express = require('express');
const cardTypesController = require('../controllers/card_types');

const router = express.Router();

router.post('/', cardTypesController.create);

router.get('/active', cardTypesController.findAllActive);

router.get('/inactive', cardTypesController.findAllInactive);

router.get('/:id', cardTypesController.findbyID);

router.put('/:id', cardTypesController.update);

router.put('/delete/:id', cardTypesController.delete);

module.exports = router;