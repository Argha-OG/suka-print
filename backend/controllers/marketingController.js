const Marketing = require('../models/Marketing');

// @desc    Get all marketing content
// @route   GET /api/marketing
// @access  Public
const getMarketingConfig = async (req, res) => {
    try {
        const marketing = await Marketing.find({ active: true });
        res.json(marketing);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add marketing content
// @route   POST /api/marketing
// @access  Private/Admin
const createMarketingConfig = async (req, res) => {
    try {
        const { type, imagePath, title, subtitle, link } = req.body;
        const marketing = new Marketing({
            type, imagePath, title, subtitle, link
        });
        const createdMarketing = await marketing.save();
        res.status(201).json(createdMarketing);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { getMarketingConfig, createMarketingConfig };
