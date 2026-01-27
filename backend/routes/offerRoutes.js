const express = require('express');
const router = express.Router();
const { getActiveOffers, createOffer } = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getActiveOffers)
    .post(protect, createOffer);

module.exports = router;
