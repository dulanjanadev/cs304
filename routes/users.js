const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/', userController.create);

router.get('/active', userController.findAllActive);

router.get('/inactive', userController.findAllInactive);

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    
});

router.get('/:id', (req, res) => {

});

module.exports = router;