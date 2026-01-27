const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true }, // e.g., 'business-cards', 'banners'
    imagePath: { type: String, required: true },
    isBestSeller: { type: Boolean, default: false },
    isTopRated: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
