const express = require('express');
const distCardsController = require('../controllers/dist_cards');

const router = express.Router();

router.post('/', distCardsController.create);

router.get('/active', distCardsController.findAllActive);

router.get('/inactive', distCardsController.findAllInactive);

router.get('/:id', distCardsController.findbyID);

router.put('/:id', distCardsController.update);

router.put('/delete/:id', distCardsController.delete);

module.exports = router;