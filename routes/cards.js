const express = require('express');
const cardsController = require('../controllers/cards')

const router = express.Router();

router.post('/', cardsController.create);

router.get('/active', cardsController.findAllActive);

router.get('/inactive', cardsController.findAllInactive);

router.get('/:id', cardsController.findbyID);

router.put('/:id', cardsController.update);

router.put('/delete/:id', cardsController.delete);

module.exports = router;