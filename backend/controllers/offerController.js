const Offer = require('../models/Offer');

// @desc    Get active offer
// @route   GET /api/offers
// @access  Public
const getActiveOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ isActive: true, expiryDate: { $gt: new Date() } }).populate('product');
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create offer
// @route   POST /api/offers
// @access  Private/Admin
const createOffer = async (req, res) => {
    try {
        const { productId, discountPercentage, expiryDate } = req.body;
        const offer = new Offer({
            product: productId,
            discountPercentage,
            expiryDate
        });
        const createdOffer = await offer.save();
        res.status(201).json(createdOffer);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { getActiveOffers, createOffer };
