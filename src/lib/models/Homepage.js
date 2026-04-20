import mongoose from 'mongoose';

const heroCarouselSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    order: { type: Number, default: 0 }
});

const homepageSchema = new mongoose.Schema({
    heroCarousel: [heroCarouselSchema],
    videoProcess: {
        videoUrl: { type: String },
        title: { type: String },
        description: { type: String }
    },
    featuredProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }],
    promoBanners: [{
        image: { type: String, required: true },
        title: { type: String },
        subtitle: { type: String },
        link: { type: String }
    }],
    dealOfTheDay: {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: { type: String },
        discountText: { type: String },
        expiryTime: { type: Date }
    },
    testimonials: [{
        name: { type: String, required: true },
        feedback: { type: String, required: true },
        rating: { type: Number, default: 5 },
        avatar: { type: String }
    }],
    services: [{
        iconName: { type: String }, // lucide icon name
        title: { type: String },
        subtitle: { type: String },
        color: { type: String }
    }],
    popularCategories: [{
        name: { type: String },
        image: { type: String },
        link: { type: String }
    }],
    appBanner: {
        title: { type: String },
        subtitle: { type: String },
        image: { type: String },
        playStoreLink: { type: String },
        appStoreLink: { type: String }
    },
    customPrints: {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        image: { type: String },
        buttonText: { type: String },
        buttonLink: { type: String }
    },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.models.Homepage || mongoose.model('Homepage', homepageSchema);
