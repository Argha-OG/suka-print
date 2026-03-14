import HeroSlider from '@/components/home/HeroSlider';
import { getBaseURL } from '@/lib/api';
import ServiceIcons from '@/components/home/ServiceIcons';
import PromoBanners from '@/components/home/PromoBanners';
import DealOfTheDay from '@/components/home/DealOfTheDay';
import PopularCategories from '@/components/home/PopularCategories';
import HomeProductLists from '@/components/home/HomeProductLists';
import AppBanner from '@/components/home/AppBanner';
import Newsletter from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import CustomPrintsSection from '@/components/home/CustomPrintsSection';
import VideoSection from '@/components/home/VideoSection';

export const dynamic = 'force-dynamic';

async function getHomepageData() {
    try {
        const apiUrl = getBaseURL();
        const res = await fetch(`${apiUrl}/homepage`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error('Failed to fetch homepage data:', err);
        return null;
    }
}

export default async function Home() {
    const data = await getHomepageData();
    
    // Safely extract data overrides
    const heroSlides = data?.heroCarousel?.length > 0 ? data.heroCarousel : null;
    const videoData = data?.videoProcess?.videoUrl ? data.videoProcess : null;
    const featuredProducts = data?.featuredProducts?.length > 0 ? data.featuredProducts : null;
    const promoBanners = data?.promoBanners?.length > 0 ? data.promoBanners : null;
    const dealData = data?.dealOfTheDay?.product ? data.dealOfTheDay : null;
    const testimonials = data?.testimonials?.length > 0 ? data.testimonials : null;
    const categories = data?.popularCategories?.length > 0 ? data.popularCategories : null;
    const customPrints = data?.customPrints?.title ? data.customPrints : null;
    const appBanner = data?.appBanner?.title ? data.appBanner : null;

    return (
        <div className="space-y-12 pb-12 px-4">
            <HeroSlider customSlides={heroSlides} />
            <ServiceIcons videoUrl={videoData?.videoUrl} />
            {videoData && <VideoSection data={videoData} />}
            <PromoBanners customBanners={promoBanners} />
            <DealOfTheDay customDeal={dealData} />
            <PopularCategories customCategories={categories} />
            <HomeProductLists featuredData={featuredProducts} />
            <Testimonials customTestimonials={testimonials} />

            <CustomPrintsSection customData={customPrints} />
            <AppBanner customData={appBanner} />
            <Newsletter />
        </div>
    );
}
