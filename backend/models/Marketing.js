const mongoose = require('mongoose');

const marketingSchema = new mongoose.Schema({
    type: { type: String, enum: ['slider', 'banner'], required: true },
    imagePath: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    link: { type: String }, // URL to redirect
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Marketing', marketingSchema);
