const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        title: 'TRAVEL ADAPTER TD 04',
        category: 'Travel Adapter',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1563203362-e6490333230a?auto=format&fit=crop&w=800&q=80',
        description: 'Specifications: Black, White, Red, Yellow, Pink, Sea Blue. Min Order: 50 PCS'
    },
    {
        title: 'ECO NOTEPAD EC 03',
        category: 'Notepad',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        description: 'Eco Notepad w/ Pen (Black, Red, Royal Blue). Min Order: 50 PCS'
    },
    {
        title: 'ECO NOTEPAD EC 04',
        category: 'Notepad',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
        description: 'Eco Notepad w/ Pen (Red, Orange, Green). Min Order: 50 PCS'
    },
    {
        title: 'NOTEPAD NB 19',
        category: 'Notepad',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80',
        description: 'Eco Notepad w/ Pen (Red, Royal Blue, Green). Min Order: 50 PCS'
    },
    {
        title: 'NOTEPAD NB 20',
        category: 'Notepad',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
        description: 'Eco Notepad w/ Pen (Red, Royal Blue, Green). Min Order: 50 PCS'
    },
    {
        title: 'KITCHENWARE AM 43',
        category: 'Kitchenware',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, Rose Gold, Grey). Min Order: 1 PCS'
    },
    {
        title: 'KITCHENWARE CE 56',
        category: 'Kitchenware',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1622322306714-368725916f46?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Rose Gold). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 49',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, Rose Gold, Grey). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 32',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1602143307185-844cc74f6cd8?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, Rose Gold). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 50',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, White, Red). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 34',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, Beige). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 36, 37',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1449247709967-df4c7405f1e1?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Natural). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 48',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1544003385-a4b527574aca?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, White, Turquoise). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 40',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, White, Grey). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 45',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, Beige, Grey). Min Order: 1 PCS'
    },
    {
        title: 'VACUUM FLASK VF 46',
        category: 'Vacuum Flask',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&w=800&q=80',
        description: 'Stainless Steel 304 (Black, Beige, Grey). Min Order: 1 PCS'
    },
    {
        title: 'PLASTIC PEN PP AM',
        category: 'Plastic Pen',
        price: 2.50,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. White, Black, Red, Royal Blue. Min Order: 10 PCS'
    },
    {
        title: 'PLASTIC PEN PP 72',
        category: 'Plastic Pen',
        price: 2.50,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. Red, Orange, Royal Blue. Min Order: 10 PCS'
    },
    {
        title: 'PLASTIC PEN PP 97',
        category: 'Plastic Pen',
        price: 2.50,
        image: 'https://images.unsplash.com/photo-1585336139118-132f7f21503e?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. Black, Red, Royal Blue. Min Order: 10 PCS'
    },
    {
        title: 'PLASTIC PEN PP AW',
        category: 'Plastic Pen',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1585336139118-132f7f21503e?auto=format&fit=crop&w=800&q=80',
        description: 'Wooden Ball Pen. Natural, Brown. Min Order: 10 PCS'
    },
    {
        title: 'PLASTIC PEN PP 75',
        category: 'Plastic Pen',
        price: 3.00,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
        description: 'Gel Ink Pen. White, Black, Yellow. Min Order: 10 PCS'
    },
    {
        title: 'PLASTIC PEN PP 61',
        category: 'Plastic Pen',
        price: 2.50,
        image: 'https://images.unsplash.com/photo-1585336139118-132f7f21503e?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. Red, Orange, Black. Min Order: 10 PCS'
    },
    {
        title: 'METAL PEN MP 09',
        category: 'Metal Pen',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1562234479-7945d8b7b777?auto=format&fit=crop&w=800&q=80',
        description: 'Ball/Roller Pen. Black. Min Order: 10 PCS'
    },
    {
        title: 'METAL PEN MP 29',
        category: 'Metal Pen',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1562234479-7945d8b7b777?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. White, Black, Grey. Min Order: 10 PCS'
    },
    {
        title: 'METAL PEN MP 30',
        category: 'Metal Pen',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1562234479-7945d8b7b777?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. White, Black, Silver. Min Order: 10 PCS'
    },
    {
        title: 'METAL PEN MP 32',
        category: 'Metal Pen',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1562234479-7945d8b7b777?auto=format&fit=crop&w=800&q=80',
        description: 'Ball/Roller Pen. Black. Min Order: 10 PCS'
    },
    {
        title: 'METAL PEN MP 37',
        category: 'Metal Pen',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1562234479-7945d8b7b777?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. Black. Min Order: 10 PCS'
    },
    {
        title: 'METAL PEN MP 24',
        category: 'Metal Pen',
        price: 9.50,
        image: 'https://images.unsplash.com/photo-1562234479-7945d8b7b777?auto=format&fit=crop&w=800&q=80',
        description: 'Ball Pen. Black, White, Blue, Pink, Purple. Min Order: 10 PCS'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        // Insert new products
        await Product.insertMany(products);
        console.log(`${products.length} products seeded successfully!`);

        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
