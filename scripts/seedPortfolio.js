const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio');

dotenv.config();

const items = [
    {
        title: "Custom Uniform Printing",
        category: "Apparel",
        image: "/assets/previous-works/WhatsApp Image 2026-04-11 at 8.22.54 PM (1).jpeg",
        order: 1
    },
    {
        title: "Premium Gift Wrapping",
        category: "Custom Gifts",
        image: "/assets/previous-works/WhatsApp Image 2026-04-11 at 8.22.54 PM.jpeg",
        order: 2
    },
    {
        title: "Corporate Branding",
        category: "Business",
        image: "/assets/previous-works/WhatsApp Image 2026-04-11 at 8.22.55 PM (1).jpeg",
        order: 3
    },
    {
        title: "Event Souvenirs",
        category: "Events",
        image: "/assets/previous-works/WhatsApp Image 2026-04-11 at 8.22.55 PM.jpeg",
        order: 4
    },
    {
        title: "Custom Merchandise",
        category: "Merchandise",
        image: "/assets/previous-works/WhatsApp Image 2026-04-12 at 7.51.17 AM.jpeg",
        order: 5
    }
];

const seedPortfolio = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for portfolio seeding...');

        // Clear existing
        await Portfolio.deleteMany({});
        console.log('Cleared existing portfolio.');

        // Insert
        await Portfolio.insertMany(items);
        console.log(`${items.length} portfolio items seeded successfully!`);

        process.exit();
    } catch (err) {
        console.error('Portfolio seeding error:', err);
        process.exit(1);
    }
};

seedPortfolio();
