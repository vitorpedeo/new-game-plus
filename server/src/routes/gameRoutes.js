const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middlewares/jwt');

const gameImageUpload = require('../utils/gameImageUpload');

const Controller = require('../controllers/GameController');

const { gameSchema } = require('../middlewares/validator');

router.post(
  '/create',
  jwtMiddleware,
  gameImageUpload.single('image'),
  gameSchema,
  Controller.create
);

router.get('/list-all', jwtMiddleware, Controller.index);

router.get('/list-mine', jwtMiddleware, Controller.indexMine);

router.get('/show/:id', jwtMiddleware, Controller.show);

router.get('/show-mine/:id', jwtMiddleware, Controller.showMine);

router.put(
  '/update/:id',
  jwtMiddleware,
  gameImageUpload.single('image'),
  gameSchema,
  Controller.update
);

router.delete('/delete/:id', jwtMiddleware, Controller.delete);

module.exports = router;
