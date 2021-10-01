const express = require('express');
const router = express.Router();

const serviceCtrl = require('../controllers/service');

router.get('/weather/:town', serviceCtrl.weather);
router.post('/translate', serviceCtrl.translate);

module.exports = router;
