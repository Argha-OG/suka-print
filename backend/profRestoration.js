const mongoose = require('mongoose');
const Homepage = require('./models/Homepage');
const Portfolio = require('./models/Portfolio');
const Product = require('./models/Product');

const PROD_URI = 'mongodb+srv://arghacypher_db_user:3o80MTFGFb8cZ46e@sukaprint.bnnjl1c.mongodb.net/?appName=sukaprint';

const portfolioItems = [
    { title: "Custom Uniform Printing", category: "Apparel", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800", order: 1 },
    { title: "Premium Gift Wrapping", category: "Custom Gifts", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800", order: 2 },
    { title: "Corporate Branding", category: "Business", image: "https://images.unsplash.com/photo-1557053910-d9eabe15ec4c?auto=format&fit=crop&q=80&w=800", order: 3 },
    { title: "Event Souvenirs", category: "Events", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800", order: 4 },
    { title: "Custom Merchandise", category: "Merchandise", image: "https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&q=80&w=800", order: 5 }
];

const categories = [
    { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800', link: '/products?category=Business Cards' },
    { name: 'Banners', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800', link: '/products?category=Banners' },
    { name: 'Packaging', image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&q=80&w=800', link: '/products?category=Packaging' },
    { name: 'Stickers', image: 'https://images.unsplash.com/photo-1634655377062-81105549c9f5?auto=format&fit=crop&q=80&w=800', link: '/products?category=Stickers' },
    { name: 'Gifts', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=800', link: '/products?category=Gifts' },
    { name: 'Booklets', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', link: '/products?category=Booklets' }
];

const imageMapping = {
    'Cards': 'https://images.unsplash.com/photo-1598124146163-36819847286d?auto=format&fit=crop&w=800',
    'Banners': 'https://images.unsplash.com/photo-1626785774625-ddc7c82a74ad?auto=format&fit=crop&w=800',
    'Signage': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800',
    'Packaging': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800',
    'Stickers': 'https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800',
    'Labels': 'https://images.unsplash.com/photo-1517423440428-a5a00ad1e3e8?auto=format&fit=crop&w=800',
    'Gifts': 'https://images.unsplash.com/photo-1594943586151-034882782e4f?auto=format&fit=crop&w=800',
    'Booklets': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800',
    'Documents': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800',
    'Electronics': 'https://images.unsplash.com/photo-1593006526978-ef7352377a06?auto=format&fit=crop&w=800',
    'Stationery': 'https://images.unsplash.com/photo-1586075010619-33b6682b6ecb?auto=format&fit=crop&w=800'
};

const professionalRestoration = async () => {
    try {
        await mongoose.connect(PROD_URI);
        console.log('Starting Professional Restoration...');

        console.log('1. Restoring Portfolio...');
        await Portfolio.deleteMany({});
        await Portfolio.insertMany(portfolioItems);

        console.log('2. Restoring Category Images...');
        await Homepage.findOneAndUpdate({ active: true }, { popularCategories: categories });

        console.log('3. Restoring Varied Product Images...');
        for (const [category, url] of Object.entries(imageMapping)) {
            await Product.updateMany({ category: { $regex: category, $options: 'i' } }, { image: url });
        }

        console.log('🎉 Professional Restoration Complete!');
        process.exit();
    } catch (err) {
        console.error('Restoration failed:', err);
        process.exit(1);
    }
};

professionalRestoration();
