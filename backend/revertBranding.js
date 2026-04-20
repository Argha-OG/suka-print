const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// THE PROVIDED PRODUCTION URI
const PROD_URI = 'mongodb+srv://arghacypher_db_user:3o80MTFGFb8cZ46e@sukaprint.bnnjl1c.mongodb.net/?appName=sukaprint';

const originalProducts = [
    { title: "Standard Business Cards", image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=80" },
    { title: "Premium Foil Business Cards", image: "https://images.unsplash.com/photo-1544254256-4c48950fb6ce?auto=format&fit=crop&w=800&q=80" },
    { title: "Matte Finish Business Cards", image: "https://images.unsplash.com/photo-1598124146163-36819847286d?auto=format&fit=crop&w=800&q=80" },
    { title: "Glossy Business Cards", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" },
    { title: "Rounded Corner Business Cards", image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=70" },
    { title: "Vinyl Outdoor Banner (6x4 ft)", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80" },
    { title: "Retractable Pull-Up Banner", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" },
    { title: "Mesh Banner", image: "https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800&q=80" },
    { title: "A-Frame Sidewalk Sign", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" },
    { title: "Corrugated Plastic Yard Sign", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" },
    { title: "Custom Mailer Boxes", image: "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&w=800&q=80" },
    { title: "Product Cartons", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" },
    { title: "Kraft Paper Bags", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" },
    { title: "Poly Mailer Bags", image: "https://images.unsplash.com/photo-1588058364549-71f353245457?auto=format&fit=crop&w=800&q=80" },
    { title: "Custom Tissue Paper", image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80" },
    { title: "Die-Cut Vinyl Stickers", image: "https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800&q=80" },
    { title: "Roll Labels", image: "https://images.unsplash.com/photo-1598124146163-36819847286d?auto=format&fit=crop&w=800&q=80" },
    { title: "Holographic Stickers", image: "https://images.unsplash.com/photo-1634655377062-81105549c9f5?auto=format&fit=crop&w=800&q=80" },
    { title: "Clear Product Labels", image: "https://images.unsplash.com/photo-1517423440428-a5a00ad1e3e8?auto=format&fit=crop&w=800&q=80" },
    { title: "Bumper Stickers", image: "https://images.unsplash.com/photo-1603349206295-dde2b476cb73?auto=format&fit=crop&w=800&q=80" },
    { title: "Engraved Metal Pen", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80" },
    { title: "Custom Ceramic Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&w=800&q=80" },
    { title: "Branded Vacuum Flask", image: "https://images.unsplash.com/photo-1594943586151-034882782e4f?auto=format&fit=crop&w=800&q=80" },
    { title: "Custom Notebook", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" },
    { title: "Canvas Tote Bag", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" },
    { title: "Saddle-Stitched Booklet", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" },
    { title: "Perfect Bound Book", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=70" },
    { title: "Spiral Bound Presentation", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" },
    { title: "Tri-Fold Brochures", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" },
    { title: "Flyers & Leaflets", image: "https://images.unsplash.com/photo-1626785774625-ddc7c82a74ad?auto=format&fit=crop&w=800&q=80" }
];

const revertBranding = async () => {
    try {
        await mongoose.connect(PROD_URI);
        console.log('Reverting to previous images on Production...');

        let count = 0;
        for (const item of originalProducts) {
            const res = await Product.updateMany({ title: item.title }, { image: item.image });
            if (res.modifiedCount > 0) count += res.modifiedCount;
        }

        console.log(`🎉 Successfully reverted ${count} products to their original images!`);
        process.exit();
    } catch (err) {
        console.error('Revert failed:', err);
        process.exit(1);
    }
};

revertBranding();
