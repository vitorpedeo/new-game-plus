const express = require('express');
const router = express.Router();

const Controller = require('../controllers/GameController');

router.get('/', Controller.test);

module.exports = router;
