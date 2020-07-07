const express = require('express');
const router = express.Router();

const Controller = require('../controllers/UserController');

const userImageUpload = require('../utils/userImageUpload');

const { signUpSchema, signInSchema } = require('../middlewares/validator');

router.post(
  '/sign-up',
  userImageUpload.single('avatar'),
  signUpSchema,
  Controller.signUp
);

router.post('/sign-in', signInSchema, Controller.signIn);

module.exports = router;
