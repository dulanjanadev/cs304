const express = require('express');
const distributionsController = require('../controllers/distributions')

const router = express.Router();

router.post('/', distributionsController.create);

router.get('/active', distributionsController.findAllActive);

router.get('/inactive', distributionsController.findAllInactive);

router.get('/:id', distributionsController.findbyID);

router.put('/:id', distributionsController.update);

router.put('/delete/:id', distributionsController.delete);


module.exports = router;