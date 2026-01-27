import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import ServiceIcons from '../components/home/ServiceIcons';
import PromoBanners from '../components/home/PromoBanners';
import DealOfTheDay from '../components/home/DealOfTheDay';
import PopularCategories from '../components/home/PopularCategories';
import HomeProductLists from '../components/home/HomeProductLists';
import AppBanner from '../components/home/AppBanner';
import Newsletter from '../components/home/Newsletter';
import SEO from '../components/utils/SEO';

const Home = () => {
    return (
        <div className="space-y-12 pb-12">
            <SEO
                title="Home"
                description="Your one-stop shop for premium printing services in Malaysia. Business cards, banners, stickers and more."
            />
            <HeroSlider />
            <ServiceIcons />
            <PromoBanners />
            <DealOfTheDay />
            <PopularCategories />

            {/* Quote Section (Mock) */}
            <div className="bg-gray-50 p-8 rounded-2xl text-center mb-16">
                <div className="max-w-3xl mx-auto">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" alt="User" />
                    <h3 className="text-xl font-medium italic text-gray-800 mb-4">"For all your printing prerequisites. Offer to make and print their pamphlets, business cards, solicitations, and occasion programs. More than ink... Solutions."</h3>
                    <p className="font-bold text-gray-900">George M.</p>
                    <p className="text-sm text-gray-500">Business Owner</p>
                </div>
            </div>

            <HomeProductLists />
            <AppBanner />
            <Newsletter />
        </div>
    );
};

export default Home;
