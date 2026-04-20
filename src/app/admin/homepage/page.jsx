"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Save, Star, Timer, Tag, Image as ImageIcon, Layout, Smartphone, PenTool, Upload } from 'lucide-react';
import api, { getRawBaseURL } from '@/lib/api';

const HomepageConfig = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [products, setProducts] = useState([]);
    
    const [config, setConfig] = useState({
        heroCarousel: [],
        videoProcess: { videoUrl: '', title: '', description: '' },
        featuredProducts: [],
        promoBanners: [],
        dealOfTheDay: { product: '', title: '', discountText: '', expiryTime: '' },
        testimonials: [],
        popularCategories: [],
        appBanner: { title: '', subtitle: '', image: '', playStoreLink: '', appStoreLink: '' },
        customPrints: { title: '', subtitle: '', description: '', image: '', buttonText: '', buttonLink: '' }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [homepageRes, productsRes] = await Promise.all([
                api.get('/homepage'),
                api.get('/products?limit=100')
            ]);

            if (homepageRes.data) {
                const data = homepageRes.data;
                setConfig({
                    heroCarousel: data.heroCarousel || [],
                    videoProcess: data.videoProcess || { videoUrl: '', title: '', description: '' },
                    featuredProducts: (data.featuredProducts || []).map(p => typeof p === 'object' ? p._id : p),
                    promoBanners: data.promoBanners || [],
                    dealOfTheDay: {
                        product: data.dealOfTheDay?.product?._id || data.dealOfTheDay?.product || '',
                        title: data.dealOfTheDay?.title || '',
                        discountText: data.dealOfTheDay?.discountText || '',
                        expiryTime: data.dealOfTheDay?.expiryTime ? new Date(data.dealOfTheDay.expiryTime).toISOString().slice(0, 16) : ''
                    },
                    testimonials: data.testimonials || [],
                    popularCategories: data.popularCategories || [],
                    appBanner: data.appBanner || { title: '', subtitle: '', image: '', playStoreLink: '', appStoreLink: '' },
                    customPrints: data.customPrints || { title: '', subtitle: '', description: '', image: '', buttonText: '', buttonLink: '' }
                });
            }
            if (productsRes.data && productsRes.data.products) {
                setProducts(productsRes.data.products);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/homepage', config);
            alert('Homepage synchronized successfully!');
        } catch (error) {
            console.error('Error saving homepage:', error);
            alert('Failed to save configuration.');
        } finally {
            setSaving(false);
        }
    };

    // Hero Handlers
    const addHeroSlide = () => setConfig(prev => ({ ...prev, heroCarousel: [...prev.heroCarousel, { image: '', title: '', subtitle: '', buttonText: '', buttonLink: '' }] }));
    const updateHeroSlide = (index, field, value) => {
        const updated = [...config.heroCarousel];
        updated[index][field] = value;
        setConfig(prev => ({ ...prev, heroCarousel: updated }));
    };
    
    // Category Handlers
    const addCategory = () => setConfig(prev => ({ ...prev, popularCategories: [...prev.popularCategories, { name: '', image: '', link: '' }] }));
    const updateCategory = (index, field, value) => {
        const updated = [...config.popularCategories];
        updated[index][field] = value;
        setConfig(prev => ({ ...prev, popularCategories: updated }));
    };

    // Promo Handlers
    const addPromoBanner = () => setConfig(prev => ({ ...prev, promoBanners: [...prev.promoBanners, { image: '', title: '', subtitle: '', link: '' }] }));
    const updatePromoBanner = (index, field, value) => {
        const updated = [...config.promoBanners];
        updated[index][field] = value;
        setConfig(prev => ({ ...prev, promoBanners: updated }));
    };

    // Testimonial Handlers
    const addTestimonial = () => setConfig(prev => ({ ...prev, testimonials: [...prev.testimonials, { name: '', feedback: '', rating: 5, avatar: '' }] }));
    const updateTestimonial = (index, field, value) => {
        const updated = [...config.testimonials];
        updated[index][field] = value;
        setConfig(prev => ({ ...prev, testimonials: updated }));
    };

    const updateDeal = (field, value) => setConfig(prev => ({ ...prev, dealOfTheDay: { ...prev.dealOfTheDay, [field]: value } }));
    const updateAppBanner = (field, value) => setConfig(prev => ({ ...prev, appBanner: { ...prev.appBanner, [field]: value } }));
    const updateCustomPrints = (field, value) => setConfig(prev => ({ ...prev, customPrints: { ...prev.customPrints, [field]: value } }));
    const updateVideoProcess = (field, value) => setConfig(prev => ({ ...prev, videoProcess: { ...prev.videoProcess, [field]: value } }));

    const handleAssetUpload = async (file, onUpload) => {
        const loadingToast = alert('Uploading asset... please wait.'); // Simple feedback
        try {
            const uploadData = new FormData();
            uploadData.append('image', file); // Backend expects 'image' field for all uploads
            const { data } = await api.post('/upload', uploadData);
            onUpload(`${getRawBaseURL()}${data}`);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please check file size or network.');
        }
    };

    const toggleFeaturedProduct = (productId) => {
        setConfig(prev => {
            const current = prev.featuredProducts;
            return { ...prev, featuredProducts: current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId] };
        });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-bold">Loading Configuration...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
            <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-0 z-20">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Homepage CMS</h1>
                    <p className="text-gray-500 mt-1">Global content management and section synchronization.</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="h-14 px-8 rounded-2xl flex items-center gap-3 bg-primary-blue hover:bg-blue-600 shadow-xl shadow-blue-100 transition-all font-bold">
                    <Save size={20} /> {saving ? 'Saving...' : 'Publish Changes'}
                </Button>
            </div>

            {/* Hero Carousel */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><ImageIcon size={20}/></div>
                        <h2 className="text-xl font-bold text-gray-800">Main Hero Carousel</h2>
                    </div>
                    <Button onClick={addHeroSlide} variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider">
                        <Plus size={16} className="mr-2" /> Add Slide
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {config.heroCarousel.map((slide, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl relative border border-transparent hover:border-blue-100 transition-all group">
                            <button onClick={() => setConfig(prev => ({ ...prev, heroCarousel: prev.heroCarousel.filter((_, idx) => idx !== i) }))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Slide Image (URL or Upload)</label>
                                    <div className="flex gap-2">
                                        <Input 
                                            value={slide.image} 
                                            onChange={(e) => updateHeroSlide(i, 'image', e.target.value)} 
                                            onFocus={e => e.target.select()} 
                                            autoComplete="off" 
                                            placeholder="https://example.com/slide.jpg" 
                                            className="bg-white flex-1" 
                                        />
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                                onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updateHeroSlide(i, 'image', url))}
                                                accept="image/*"
                                            />
                                            <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-200">
                                                <Upload size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    {slide.image && (
                                        <div className="h-20 w-32 rounded-lg border border-gray-100 overflow-hidden bg-white mt-2">
                                            <img src={slide.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src='https://placehold.co/100x80?text=Invalid'} />
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Title" value={slide.title} onChange={(e) => updateHeroSlide(i, 'title', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Big Bold Title" className="bg-white" />
                                    <Input label="Subtitle" value={slide.subtitle} onChange={(e) => updateHeroSlide(i, 'subtitle', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Smaller text..." className="bg-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Video Process Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Plus size={20}/></div>
                    <h2 className="text-xl font-bold text-gray-800">Video Process Showcase</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Video Source (URL or Upload)</label>
                        <div className="flex gap-2">
                            <Input 
                                value={config.videoProcess.videoUrl} 
                                onChange={(e) => updateVideoProcess('videoUrl', e.target.value)} 
                                onFocus={e => e.target.select()} 
                                autoComplete="off" 
                                placeholder="https://example.com/video.mp4"
                                className="bg-gray-50 border-none flex-1" 
                            />
                            <div className="relative">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updateVideoProcess('videoUrl', url))}
                                    accept="video/*"
                                />
                                <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-200">
                                    <Upload size={16} />
                                </Button>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 italic font-medium px-1">Note: Use direct video links or Cloudinary/Vercel Blob URLs for best performance.</p>
                    </div>
                    <Input label="Video Title" value={config.videoProcess.title} onChange={(e) => updateVideoProcess('title', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Our Printing Process" className="bg-gray-50 border-none" />
                    <Input label="Section Subtitle" value={config.videoProcess.description} onChange={(e) => updateVideoProcess('description', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Watch how we craft your products" className="bg-gray-50 border-none" />
                </div>
            </section>

            {/* Popular Categories */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-xl"><Layout size={20}/></div>
                        <h2 className="text-xl font-bold text-gray-800">Popular Categories</h2>
                    </div>
                    <Button onClick={addCategory} variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider">
                        <Plus size={16} className="mr-2" /> Add Category
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {config.popularCategories.map((cat, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl relative border border-transparent hover:border-green-100 transition-all">
                            <button onClick={() => setConfig(prev => ({ ...prev, popularCategories: prev.popularCategories.filter((_, idx) => idx !== i) }))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                            <div className="space-y-3">
                                <Input label="Name" value={cat.name} onChange={(e) => updateCategory(i, 'name', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="e.g. Stickers" className="bg-white" />
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Image (URL or Upload)</label>
                                    <div className="flex gap-2">
                                        <Input 
                                            value={cat.image} 
                                            onChange={(e) => updateCategory(i, 'image', e.target.value)} 
                                            onFocus={e => e.target.select()} 
                                            autoComplete="off" 
                                            placeholder="URL..." 
                                            className="bg-white flex-1 text-xs" 
                                        />
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                                onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updateCategory(i, 'image', url))}
                                                accept="image/*"
                                            />
                                            <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-100">
                                                <ImageIcon size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Custom Prints Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><PenTool size={20}/></div>
                    <h2 className="text-xl font-bold text-gray-800">Custom Prints Feature</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Section Title" value={config.customPrints.title} onChange={(e) => updateCustomPrints('title', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                    <Input label="Badge Text" value={config.customPrints.subtitle} onChange={(e) => updateCustomPrints('subtitle', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                    <div className="md:col-span-2">
                        <textarea 
                            className="w-full bg-gray-50 rounded-xl p-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            rows="3"
                            value={config.customPrints.description}
                            onChange={(e) => updateCustomPrints('description', e.target.value)}
                            placeholder="Long description..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Image Asset (URL or Upload)</label>
                        <div className="flex gap-2">
                            <Input 
                                value={config.customPrints.image} 
                                onChange={(e) => updateCustomPrints('image', e.target.value)} 
                                onFocus={e => e.target.select()} 
                                autoComplete="off" 
                                placeholder="URL..." 
                                className="bg-gray-50 border-none flex-1" 
                            />
                            <div className="relative">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updateCustomPrints('image', url))}
                                    accept="image/*"
                                />
                                <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-100 bg-white">
                                    <ImageIcon size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Btn Text" value={config.customPrints.buttonText} onChange={(e) => updateCustomPrints('buttonText', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                        <Input label="Btn Link" value={config.customPrints.buttonLink} onChange={(e) => updateCustomPrints('buttonLink', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                    </div>
                </div>
            </section>

             {/* App Banner */}
             <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Smartphone size={20}/></div>
                    <h2 className="text-xl font-bold text-gray-800">Mobile App Promo</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="App Title" value={config.appBanner.title} onChange={(e) => updateAppBanner('title', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                    <Input label="App Description" value={config.appBanner.subtitle} onChange={(e) => updateAppBanner('subtitle', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Mockup Image (URL or Upload)</label>
                        <div className="flex gap-2">
                            <Input 
                                value={config.appBanner.image} 
                                onChange={(e) => updateAppBanner('image', e.target.value)} 
                                onFocus={e => e.target.select()} 
                                autoComplete="off" 
                                placeholder="URL..." 
                                className="bg-gray-50 border-none flex-1" 
                            />
                            <div className="relative">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updateAppBanner('image', url))}
                                    accept="image/*"
                                />
                                <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-100 bg-white">
                                    <Smartphone size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="App Store Link" value={config.appBanner.appStoreLink} onChange={(e) => updateAppBanner('appStoreLink', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                        <Input label="Play Store Link" value={config.appBanner.playStoreLink} onChange={(e) => updateAppBanner('playStoreLink', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" className="bg-gray-50 border-none" />
                    </div>
                </div>
            </section>

            {/* Promo Banners */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Tag size={20}/></div>
                        <h2 className="text-xl font-bold text-gray-800">Promo Grid Banners</h2>
                    </div>
                    <Button onClick={addPromoBanner} variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider">
                        <Plus size={16} className="mr-2" /> Add Grid Item
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {config.promoBanners.map((banner, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl relative border border-transparent hover:border-purple-100 transition-all">
                            <button onClick={() => setConfig(prev => ({ ...prev, promoBanners: prev.promoBanners.filter((_, idx) => idx !== i) }))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Image (URL or Upload)</label>
                                    <div className="flex gap-2">
                                        <Input 
                                            value={banner.image} 
                                            onChange={(e) => updatePromoBanner(i, 'image', e.target.value)} 
                                            onFocus={e => e.target.select()} 
                                            autoComplete="off" 
                                            placeholder="URL..." 
                                            className="bg-white flex-1 text-xs" 
                                        />
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                                onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updatePromoBanner(i, 'image', url))}
                                                accept="image/*"
                                            />
                                            <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-100 bg-white">
                                                <ImageIcon size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Input label="Title" value={banner.title} onChange={(e) => updatePromoBanner(i, 'title', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Sticker Pack" className="bg-white" />
                                <Input label="Subtitle" value={banner.subtitle} onChange={(e) => updatePromoBanner(i, 'subtitle', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="New Design" className="bg-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Deal of the Day */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                    <div className="p-2 bg-red-50 text-red-600 rounded-xl"><Timer size={20}/></div>
                    <h2 className="text-xl font-bold text-gray-800">Deal Tracker</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2">
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Select Product</label>
                        <select 
                            className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 font-bold text-gray-800 outline-none focus:ring-2 focus:ring-red-500"
                            value={config.dealOfTheDay.product}
                            onChange={(e) => updateDeal('product', e.target.value)}
                        >
                            <option value="">Choose a product...</option>
                            {products.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                        </select>
                    </div>
                    <Input label="Section Title" value={config.dealOfTheDay.title} onChange={(e) => updateDeal('title', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Limited Time Offer" className="bg-gray-50 border-none" />
                    <Input label="Expiry Time" type="datetime-local" value={config.dealOfTheDay.expiryTime} onChange={(e) => updateDeal('expiryTime', e.target.value)} className="bg-gray-50 border-none" />
                    <Input label="Badge Text" value={config.dealOfTheDay.discountText} onChange={(e) => updateDeal('discountText', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="60% OFF" className="bg-gray-50 border-none md:col-span-2 lg:col-span-1" />
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Star size={20}/></div>
                        <h2 className="text-xl font-bold text-gray-800">Customer Feedbacks</h2>
                    </div>
                    <Button onClick={addTestimonial} variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider">
                        <Plus size={16} className="mr-2" /> Add Feedback
                    </Button>
                </div>
                <div className="space-y-4">
                    {config.testimonials.map((t, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl relative border border-transparent hover:border-amber-100 transition-all flex gap-6 items-start">
                            <button onClick={() => setConfig(prev => ({ ...prev, testimonials: prev.testimonials.filter((_, idx) => idx !== i) }))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                            <img src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`} className="w-16 h-16 rounded-full bg-white border-2 border-amber-100" />
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Customer Name" value={t.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} onFocus={e => e.target.select()} autoComplete="off" placeholder="Full Name" className="bg-white" />
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Avatar (URL or Upload)</label>
                                    <div className="flex gap-2">
                                        <Input 
                                            value={t.avatar} 
                                            onChange={(e) => updateTestimonial(i, 'avatar', e.target.value)} 
                                            onFocus={e => e.target.select()} 
                                            autoComplete="off" 
                                            placeholder="URL..." 
                                            className="bg-white flex-1 text-xs" 
                                        />
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                                onChange={(e) => handleAssetUpload(e.target.files[0], (url) => updateTestimonial(i, 'avatar', url))}
                                                accept="image/*"
                                            />
                                            <Button variant="outline" className="h-10 w-10 p-0 rounded-lg border-gray-200 bg-white">
                                                <Plus size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Feedback</label>
                                    <textarea 
                                        className="w-full bg-white rounded-xl p-4 text-sm border-none shadow-sm focus:ring-2 focus:ring-amber-500 outline-none"
                                        rows="3"
                                        value={t.feedback}
                                        onChange={(e) => updateTestimonial(i, 'feedback', e.target.value)}
                                        placeholder="Write what the customer said..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products Selection */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Star size={20}/></div>
                    <h2 className="text-xl font-bold text-gray-800">Curated Featured List</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                    {products.map(product => {
                        const isSelected = config.featuredProducts.includes(product._id);
                        return (
                            <div 
                                key={product._id} 
                                onClick={() => toggleFeaturedProduct(product._id)}
                                className={`p-4 rounded-2xl cursor-pointer border-2 transition-all ${isSelected ? 'border-primary-blue bg-blue-50/50 shadow-md' : 'border-gray-50 hover:border-gray-100 bg-white'}`}
                            >
                                <div className="space-y-3">
                                    <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center">
                                        <img src={product.imagePath || product.image} className="max-h-full max-w-full object-contain p-2" />
                                    </div>
                                    <p className={`text-sm font-black truncate ${isSelected ? 'text-primary-blue' : 'text-gray-900'}`}>{product.title}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{product.category}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default HomepageConfig;
