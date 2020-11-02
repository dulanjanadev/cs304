const express = require('express');
const instController = require('../controllers/institutes')

const router = express.Router();

router.post('/', instController.create);

router.get('/active', instController.findAllActive);

router.get('/inactive', instController.findAllInactive);

router.get('/:id', instController.findbyID);

router.put('/:id', instController.update);

router.put('/delete/:id', instController.delete);

module.exports = router;