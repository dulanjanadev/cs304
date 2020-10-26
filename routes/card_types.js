const express = require('express');
const cardTypesController = require('../controllers/card_types');

const router = express.Router();

router.post('/', cardTypesController.create);

router.get('/active', cardTypesController.findAllActive);

router.get('/inactive', cardTypesController.findAllInactive);

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    
});

router.get('/:id', (req, res) => {

});

module.exports = router;