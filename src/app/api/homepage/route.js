import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Homepage from '@/lib/models/Homepage';
import { verifyAdmin } from '@/lib/auth';

// @desc    Fetch homepage configuration
// @route   GET /api/homepage
export async function GET() {
    try {
        if (!process.env.MONGO_URI) {
            return NextResponse.json({
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

        await dbConnect();
        
        let homepage = await Homepage.findOne({ active: true })
            .populate('featuredProducts')
            .populate('dealOfTheDay.product');
        
        if (!homepage) {
            return NextResponse.json({
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
        
        return NextResponse.json(homepage);
    } catch (error) {
        console.error("API GET Homepage Error:", error.message);
        return NextResponse.json({
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
}

// @desc    Update homepage configuration (Admin Only)
// @route   PUT /api/homepage
export async function PUT(req) {
    try {
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const body = await req.json();
        
        let homepage = await Homepage.findOne({ active: true });
        
        if (!homepage) {
            homepage = new Homepage({ ...body, active: true });
        } else {
            const fields = [
                'heroCarousel', 'videoProcess', 'featuredProducts', 
                'promoBanners', 'dealOfTheDay', 'testimonials', 
                'services', 'popularCategories', 'appBanner', 'customPrints'
            ];
            
            fields.forEach(field => {
                if (body[field] !== undefined) {
                    homepage[field] = body[field];
                }
            });
        }
        
        const updatedHomepage = await homepage.save();
        return NextResponse.json({ message: 'Homepage updated successfully', homepage: updatedHomepage });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}
