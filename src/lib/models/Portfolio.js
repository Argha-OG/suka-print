import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
