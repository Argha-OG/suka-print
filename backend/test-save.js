const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const testAdd = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');
        
        const testProduct = new Product({
            title: "Test Product",
            description: "Test Description",
            price: 10,
            category: "Banners",
            image: "https://placehold.co/400"
        });

        const saved = await testProduct.save();
        console.log('Successfully saved test product:', saved._id);
        process.exit();
    } catch (err) {
        console.error('FAILED TO SAVE PRODUCT:', err.message);
        process.exit(1);
    }
};

testAdd();
