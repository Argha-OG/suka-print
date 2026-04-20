import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import ServiceIcons from '@/components/home/ServiceIcons';
import PromoBanners from '@/components/home/PromoBanners';
import DealOfTheDay from '@/components/home/DealOfTheDay';
import PopularCategories from '@/components/home/PopularCategories';
import HomeProductLists from '@/components/home/HomeProductLists';
import AppBanner from '@/components/home/AppBanner';
import Newsletter from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import CustomPrintsSection from '@/components/home/CustomPrintsSection';
import PreviousWorks from '@/components/home/PreviousWorks';
import VideoSection from '@/components/home/VideoSection';
import dbConnect from '@/lib/dbConnect';

// NEXT.js 15: Explicitly import models to ensure registration in Server Components
import Homepage from '@/lib/models/Homepage';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

async function getHomepageData() {
    try {
        const conn = await dbConnect();
        if (!conn) return null;
        
        // Ensure models are registered (redundant but safe)
        if (!mongoose.models.Homepage) mongoose.model('Homepage', Homepage.schema);
        if (!mongoose.models.Product) mongoose.model('Product', Product.schema);

        const homepage = await Homepage.findOne({ active: true })
            .populate('featuredProducts')
            .populate('dealOfTheDay.product')
            .lean();
            
        if (!homepage) return null;
            
        return JSON.parse(JSON.stringify(homepage));
    } catch (err) {
        console.error('Homepage Data Fetch Crash:', err.message);
        return null;
    }
}

export default async function Home() {
    let data = null;
    try {
        data = await getHomepageData();
    } catch (e) {
        console.error("Critical rendering check:", e.message);
    }
    
    // Safely extract data overrides
    const heroSlides = data?.heroCarousel?.length > 0 ? data.heroCarousel : null;
    const videoData = data?.videoProcess?.videoUrl ? data.videoProcess : null;
    const featuredProducts = (data?.featuredProducts && data.featuredProducts.length > 0) ? data.featuredProducts : null;
    const promoBanners = data?.promoBanners?.length > 0 ? data.promoBanners : null;
    const dealData = data?.dealOfTheDay?.product ? data.dealOfTheDay : null;
    const testimonials = data?.testimonials?.length > 0 ? data.testimonials : null;
    const categories = data?.popularCategories?.length > 0 ? data.popularCategories : null;
    const customPrints = data?.customPrints?.title ? data.customPrints : null;
    const appBanner = data?.appBanner?.title ? data.appBanner : null;

    return (
        <div className="space-y-12 pb-12 px-4">
            {data ? (
                <>
                    <HeroSlider customSlides={heroSlides} />
                    <ServiceIcons videoUrl={videoData?.videoUrl} />
                    <PromoBanners customBanners={promoBanners} />
                    <PopularCategories customCategories={categories} />
                    <HomeProductLists featuredData={featuredProducts} />
                    <PreviousWorks />
                    <Testimonials customTestimonials={testimonials} />
                    <CustomPrintsSection customData={customPrints} />
                    <AppBanner customData={appBanner} />
                </>
            ) : (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Storefront Setup in Progress</h1>
                    <p className="text-gray-600 max-w-md">We are currently hydrating our database with premium printing products. Please check back in a few moments.</p>
                </div>
            )}
            <Newsletter />
        </div>
    );
}
