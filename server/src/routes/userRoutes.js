const express = require('express');
const router = express.Router();

const Controller = require('../controllers/UserController');

const userImageUpload = require('../utils/userImageUpload');

const jwtMiddleware = require('../middlewares/jwt');
const { signUpSchema, signInSchema } = require('../middlewares/validator');
const UserController = require('../controllers/UserController');

router.post(
  '/sign-up',
  userImageUpload.single('avatar'),
  signUpSchema,
  Controller.signUp
);

router.post('/sign-in', signInSchema, Controller.signIn);

router.get('/get-user-info', jwtMiddleware, UserController.getUserInfo);

module.exports = router;
