const express = require('express');
const router = express.Router();

const Controller = require('../controllers/UserController');

const userImageUpload = require('../utils/userImageUpload');

router.post('/sign-up', userImageUpload.single('avatar'), Controller.signUp);

router.post('/sign-in', Controller.signIn);

module.exports = router;
