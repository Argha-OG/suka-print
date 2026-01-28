import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import ServiceIcons from '../components/home/ServiceIcons';
import PromoBanners from '../components/home/PromoBanners';
import DealOfTheDay from '../components/home/DealOfTheDay';
import PopularCategories from '../components/home/PopularCategories';
import HomeProductLists from '../components/home/HomeProductLists';
import AppBanner from '../components/home/AppBanner';
import Newsletter from '../components/home/Newsletter';
import Testimonials from '../components/home/Testimonials';
import SEO from '../components/utils/SEO';

const Home = () => {
    return (
        <div className="space-y-12 pb-12 px-4">
            <SEO
                title="Home"
                description="Your one-stop shop for premium printing services in Malaysia. Business cards, banners, stickers and more."
            />
            <HeroSlider />
            <ServiceIcons />
            <PromoBanners />
            <DealOfTheDay />
            <PopularCategories />



            <HomeProductLists />
            <Testimonials />
            <AppBanner />
            <Newsletter />
        </div>
    );
};

export default Home;
