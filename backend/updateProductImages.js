const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const updates = [
    { 
        titles: ['TRAVEL ADAPTER TD 04'], 
        image: '/assets/images/products/travel_adapter.png' 
    },
    { 
        titles: ['ECO NOTEPAD EC 03', 'ECO NOTEPAD EC 04', 'NOTEPAD NB 19', 'NOTEPAD NB 20'], 
        image: '/assets/images/products/eco_notepad.png' 
    },
    { 
        titles: ['KITCHENWARE AM 43', 'KITCHENWARE CE 56', 'VACUUM FLASK VF 49', 'VACUUM FLASK VF 32'], 
        image: '/assets/images/products/vacuum_flask.png' 
    }
];

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database...');

        for (const update of updates) {
            const res = await Product.updateMany(
                { title: { $in: update.titles } }, 
                { image: update.image }
            );
            console.log(`Updated ${res.modifiedCount} products with image: ${update.image}`);
        }

        console.log('Successfully updated all product images!');
        process.exit();
    } catch (err) {
        console.error('Error updating images:', err);
        process.exit(1);
    }
};

updateImages();
