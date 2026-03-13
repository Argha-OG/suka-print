const Homepage = require('../models/Homepage');
const Product = require('../models/Product'); // Needed array of products optionally

// Get homepage configuration (Public)
exports.getHomepage = async (req, res) => {
    try {
        let homepage = await Homepage.findOne({ active: true })
            .populate('featuredProducts')
            .populate('dealOfTheDay.product');
        
        // If no document exists yet, return empty structure instead of 404
        if (!homepage) {
            return res.status(200).json({
                heroCarousel: [],
                videoProcess: { videoUrl: "", title: "", description: "" },
                featuredProducts: [],
                promoBanners: [],
                dealOfTheDay: null,
                testimonials: [],
                services: [],
                popularCategories: [],
                appBanner: null,
                customPrints: null
            });
        }
        res.status(200).json(homepage);
    } catch (error) {
        console.error('Error fetching homepage:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update homepage configuration (Admin Only)
exports.updateHomepage = async (req, res) => {
    try {
        const { 
            heroCarousel, 
            videoProcess, 
            featuredProducts, 
            promoBanners, 
            dealOfTheDay, 
            testimonials,
            services,
            popularCategories,
            appBanner,
            customPrints
        } = req.body;
        
        let homepage = await Homepage.findOne({ active: true });
        
        if (!homepage) {
            // Create first time
            homepage = new Homepage({
                heroCarousel: heroCarousel || [],
                videoProcess: videoProcess || {},
                featuredProducts: featuredProducts || [],
                promoBanners: promoBanners || [],
                dealOfTheDay: dealOfTheDay || null,
                testimonials: testimonials || [],
                services: services || [],
                popularCategories: popularCategories || [],
                appBanner: appBanner || null,
                customPrints: customPrints || null,
                active: true
            });
            await homepage.save();
            return res.status(201).json({ message: 'Homepage config created', homepage });
        }
        
        // Update existing
        if (heroCarousel) homepage.heroCarousel = heroCarousel;
        if (videoProcess) homepage.videoProcess = videoProcess;
        if (featuredProducts) homepage.featuredProducts = featuredProducts;
        if (promoBanners) homepage.promoBanners = promoBanners;
        if (dealOfTheDay !== undefined) homepage.dealOfTheDay = dealOfTheDay;
        if (testimonials) homepage.testimonials = testimonials;
        if (services) homepage.services = services;
        if (popularCategories) homepage.popularCategories = popularCategories;
        if (appBanner !== undefined) homepage.appBanner = appBanner;
        if (customPrints !== undefined) homepage.customPrints = customPrints;
        
        await homepage.save();
        res.status(200).json({ message: 'Homepage config updated successfully', homepage });
    } catch (error) {
        console.error('Error updating homepage:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
