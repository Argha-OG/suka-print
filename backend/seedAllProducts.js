const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // Business Cards
    {
        title: "Standard Business Cards",
        description: "Professional and clean standard business cards on 14pt stock.",
        price: 15.00,
        category: "Business Cards",
        image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Premium Foil Business Cards",
        description: "Make an impression with luxury gold or silver foil accents.",
        price: 45.00,
        category: "Business Cards",
        image: "https://images.unsplash.com/photo-1544254256-4c48950fb6ce?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Matte Finish Business Cards",
        description: "Smooth, elegant matte finish for a modern look.",
        price: 25.00,
        category: "Business Cards",
        image: "https://images.unsplash.com/photo-1598124146163-36819847286d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Glossy Business Cards",
        description: "High-shine UV coating that makes colors pop.",
        price: 20.00,
        category: "Business Cards",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Rounded Corner Business Cards",
        description: "Stand out with smooth, rounded corners.",
        price: 30.00,
        category: "Business Cards",
        image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=70"
    },
    // Banners
    {
        title: "Vinyl Outdoor Banner (6x4 ft)",
        description: "Weather-resistant vinyl banner ideal for outdoor advertising.",
        price: 85.00,
        category: "Banners",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Retractable Pull-Up Banner",
        description: "Portable banner stand perfect for trade shows and events.",
        price: 120.00,
        category: "Banners",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Mesh Banner",
        description: "Wind-resistant mesh banner for fences and construction sites.",
        price: 95.00,
        category: "Banners",
        image: "https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800&q=80"
    },
    // Signage
    {
        title: "A-Frame Sidewalk Sign",
        description: "Double-sided A-frame board to capture foot traffic.",
        price: 150.00,
        category: "Signage",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Corrugated Plastic Yard Sign",
        description: "Lightweight, durable yard signs with H-stakes.",
        price: 15.00,
        category: "Signage",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
    },
    // Packaging
    {
        title: "Custom Mailer Boxes",
        description: "High-quality corrugated mailer boxes featuring your branding.",
        price: 2.50,
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Product Cartons",
        description: "Lightweight folding cartons for retail products.",
        price: 1.20,
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Kraft Paper Bags",
        description: "Eco-friendly brown kraft bags with twisted handles.",
        price: 0.80,
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Poly Mailer Bags",
        description: "Tear-resistant, waterproof poly mailers with custom prints.",
        price: 0.45,
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1588058364549-71f353245457?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Custom Tissue Paper",
        description: "Branded tissue paper to elevate the unboxing experience.",
        price: 0.25,
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80"
    },
    // Stickers & Labels
    {
        title: "Die-Cut Vinyl Stickers",
        description: "Custom shaped thick vinyl stickers that are scratch resistant.",
        price: 0.50,
        category: "Stickers",
        image: "https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Roll Labels",
        description: "Convenient roll labels perfect for packaging and products.",
        price: 0.10,
        category: "Labels",
        image: "https://images.unsplash.com/photo-1598124146163-36819847286d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Holographic Stickers",
        description: "Eye-catching stickers with a rainbow holographic effect.",
        price: 1.20,
        category: "Stickers",
        image: "https://images.unsplash.com/photo-1634655377062-81105549c9f5?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Clear Product Labels",
        description: "Transparent labels that blend seamlessly onto bottles and jars.",
        price: 0.15,
        category: "Labels",
        image: "https://images.unsplash.com/photo-1517423440428-a5a00ad1e3e8?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Bumper Stickers",
        description: "Weatherproof stickers designed for cars and outdoor use.",
        price: 2.50,
        category: "Stickers",
        image: "https://images.unsplash.com/photo-1603349206295-dde2b476cb73?auto=format&fit=crop&w=800&q=80"
    },
    // Gifts
    {
        title: "Engraved Metal Pen",
        description: "Premium metal ballpoint pen personalized with your logo.",
        price: 12.00,
        category: "Gifts",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Custom Ceramic Mug",
        description: "11oz white ceramic mug with full-color wrap printing.",
        price: 8.50,
        category: "Gifts",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Branded Vacuum Flask",
        description: "Stainless steel thermal flask to keep drinks hot or cold.",
        price: 22.00,
        category: "Gifts",
        image: "https://images.unsplash.com/photo-1594943586151-034882782e4f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Custom Notebook",
        description: "Hardcover notebook with embossed company logo.",
        price: 15.00,
        category: "Gifts",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Canvas Tote Bag",
        description: "Reusable custom printed canvas tote bag.",
        price: 6.50,
        category: "Gifts",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    // Booklets
    {
        title: "Saddle-Stitched Booklet",
        description: "Affordable and professional binding for catalogs and magazines.",
        price: 4.50,
        category: "Booklets",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Perfect Bound Book",
        description: "Glued spine binding ideal for larger books and manuals.",
        price: 8.50,
        category: "Booklets",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=70"
    },
    {
        title: "Spiral Bound Presentation",
        description: "Lays flat, perfect for reports and training materials.",
        price: 6.00,
        category: "Booklets",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    // Documents
    {
        title: "Tri-Fold Brochures",
        description: "Classic marketing brochures on glossy premium paper.",
        price: 0.85,
        category: "Documents",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Flyers & Leaflets",
        description: "High volume promotional flyers for fast distribution.",
        price: 0.15,
        category: "Documents",
        image: "https://images.unsplash.com/photo-1626785774625-ddc7c82a74ad?auto=format&fit=crop&w=800&q=80"
    }
];

const seedAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connecting to database...');

        await Product.deleteMany({});
        console.log('Cleaning existing products...');

        await Product.insertMany(products);
        console.log(`Successfully restored ${products.length} products!`);

        process.exit();
    } catch (err) {
        console.error('Error seeding products:', err);
        process.exit(1);
    }
};

seedAll();
