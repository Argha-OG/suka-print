const express = require('express');
const router = express.Router();
const { getHomepage, updateHomepage } = require('../controllers/homepageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getHomepage);
router.put('/', protect, updateHomepage);

module.exports = router;
