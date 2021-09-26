const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/weather/:town', userCtrl.weather);
router.post('/translate', userCtrl.translate);

module.exports = router;
