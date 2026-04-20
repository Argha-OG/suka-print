const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Homepage = require('./models/Homepage');

dotenv.config();

const newProducts = [
    // Best Seller
    {
        title: 'TRAVEL ADAPTER TD 04',
        category: 'Electronics',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1593006526978-ef7352377a06?auto=format&fit=crop&w=400&q=80',
        description: 'Universal travel adapter with multiple plug types and USB ports.',
        isBestSeller: true
    },
    {
        title: 'ECO NOTEPAD EC 03',
        category: 'Stationery',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
        description: 'Eco-friendly cork cover notepad with recycled paper.',
        isBestSeller: true
    },
    {
        title: 'ECO NOTEPAD EC 04',
        category: 'Stationery',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80',
        description: 'Sustainable recycled paper notepad for everyday use.',
        isBestSeller: true
    },
    // Top Sale
    {
        title: 'NOTEPAD NB 19',
        category: 'Stationery',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1586075010619-33b6682b6ecb?auto=format&fit=crop&w=400&q=80',
        description: 'Professional A5 notebook with elastic closure.',
        isBestSeller: false
    },
    {
        title: 'NOTEPAD NB 20',
        category: 'Stationery',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=400&q=80',
        description: 'Classic leather-look notebook for business meetings.',
        isBestSeller: false
    },
    {
        title: 'KITCHENWARE AM 43',
        category: 'Kitchenware',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80',
        description: 'Stainless steel thermal lunchbox or kitchen tool.',
        isBestSeller: false
    },
    // Top Rated
    {
        title: 'KITCHENWARE CE 56',
        category: 'Kitchenware',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&w=400&q=80',
        description: 'Premium ceramic kitchen set for elegant dining.',
        isTopRated: true
    },
    {
        title: 'VACUUM FLASK VF 49',
        category: 'Gifts',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1610444583731-9ee82b490bb9?auto=format&fit=crop&w=400&q=80',
        description: 'Sleek matte black vacuum flask, 500ml.',
        isTopRated: true
    },
    {
        title: 'VACUUM FLASK VF 32',
        category: 'Gifts',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1594943586151-034882782e4f?auto=format&fit=crop&w=400&q=80',
        description: 'High-performance thermal bottle with carry loop.',
        isTopRated: true
    }
];

const populateFeatured = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Insert new products
        const createdProducts = await Product.insertMany(newProducts);
        console.log(`${createdProducts.length} new corporate products added.`);

        // Get IDs in order
        const productIds = createdProducts.map(p => p._id);

        // Update Homepage
        const homepage = await Homepage.findOne({ active: true });
        if (homepage) {
            homepage.featuredProducts = productIds;
            await homepage.save();
            console.log('Homepage featured products updated successfully!');
        } else {
            console.error('Active homepage configuration not found.');
        }

        process.exit();
    } catch (err) {
        console.error('Error populating featured products:', err);
        process.exit(1);
    }
};

populateFeatured();
