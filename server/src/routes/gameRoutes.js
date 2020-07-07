const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middlewares/jwt');
const gameImageUpload = require('../utils/gameImageUpload');
const Controller = require('../controllers/GameController');

router.post(
  '/create',
  jwtMiddleware,
  gameImageUpload.single('image'),
  Controller.create
);

router.get('/list-all', jwtMiddleware, Controller.index);

router.get('/list-mine', jwtMiddleware, Controller.indexMine);

router.get('/show/:id', jwtMiddleware, Controller.show);

module.exports = router;
