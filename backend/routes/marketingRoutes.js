const express = require('express');
const router = express.Router();
const { getMarketingConfig, createMarketingConfig } = require('../controllers/marketingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getMarketingConfig)
    .post(protect, createMarketingConfig);

module.exports = router;
