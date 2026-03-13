const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    brandName: {
        type: String,
        default: 'Suka Print'
    },
    logo: {
        type: String,
        default: '/assets/suka.png'
    },
    contactEmail: {
        type: String,
        default: 'hello@sukaprint.com'
    },
    contactPhone: {
        type: String,
        default: '+60 11-1414 1509'
    },
    address: {
        type: String,
        default: 'Kuala Lumpur, Malaysia'
    },
    socialLinks: {
        facebook: { type: String, default: '#' },
        instagram: { type: String, default: '#' },
        twitter: { type: String, default: '#' },
        linkedin: { type: String, default: '#' }
    },
    footerDescription: {
        type: String,
        default: 'Premium printing solutions for businesses and individuals. High-quality materials, fast delivery, and exceptional service.'
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
