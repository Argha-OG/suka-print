const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const updates = [
    { title: 'TRAVEL ADAPTER TD 04', image: '/assets/images/products/electronics/travel_adapter.png' },
    { title: 'ECO NOTEPAD EC 03', image: '/assets/images/products/eco_notepad.png' },
    { title: 'ECO NOTEPAD EC 04', image: '/assets/images/products/eco_notepad.png' },
    { title: 'NOTEPAD NB 19', image: '/assets/images/products/gifts/notebook.png' },
    { title: 'NOTEPAD NB 20', image: '/assets/images/products/gifts/notebook.png' }
];

const fixSpecific = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Fixing specific broken product images...');

        for (const item of updates) {
            const result = await Product.findOneAndUpdate(
                { title: item.title },
                { image: item.image },
                { new: true }
            );
            if (result) {
                console.log(`✅ Fixed: ${item.title}`);
            } else {
                console.log(`❓ Not found in DB: ${item.title}`);
            }
        }

        console.log('🎉 Done fixing specific items!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixSpecific();
