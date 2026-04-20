const Portfolio = require('../models/Portfolio');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find({ active: true }).sort({ order: 1 });
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
exports.createPortfolio = async (req, res) => {
    try {
        const { title, category, image, description, order } = req.body;
        const item = new Portfolio({ title, category, image, description, order });
        const createdItem = await item.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
};

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
exports.updatePortfolio = async (req, res) => {
    try {
        const item = await Portfolio.findById(req.params.id);
        if (item) {
            item.title = req.body.title || item.title;
            item.category = req.body.category || item.category;
            item.image = req.body.image || item.image;
            item.description = req.body.description || item.description;
            item.order = req.body.order !== undefined ? req.body.order : item.order;
            item.active = req.body.active !== undefined ? req.body.active : item.active;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Portfolio item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
exports.deletePortfolio = async (req, res) => {
    try {
        const item = await Portfolio.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Portfolio item removed' });
        } else {
            res.status(404).json({ message: 'Portfolio item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
