const express = require('express');
const {
  Register,
  Login,
  allUsers,
} = require('../Controller/UserController');

const router = express.Router();
router.route('/allUsers').get(allUsers);
router.route('/register').post(Register);
router.route('/login').post(Login);

module.exports = router;