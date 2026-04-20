import React from 'react';

const VideoSection = ({ data }) => {
    return (
        <section className="mb-16">
            <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2 space-y-6">
                    <span className="text-primary-magenta font-bold tracking-widest uppercase text-sm">How It Works</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        {data.title || "Our Printing Process"}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {data.description || "Discover the magic behind our premium printing services. From design to delivery, we ensure the highest quality every step of the way."}
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-50 transform hover:scale-[1.02] transition-transform duration-300 bg-black">
                        {data.videoUrl?.includes('youtube.com') || data.videoUrl?.includes('youtu.be') ? (
                            <iframe 
                                src={`${data.videoUrl}?autoplay=1&controls=1&mute=0&modestbranding=1&rel=0&vq=hd1080`} 
                                title={data.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="w-full h-full min-h-[300px]"
                            ></iframe>
                        ) : (
                            <video
                                src={data.videoUrl}
                                controls
                                className="w-full h-full min-h-[300px] object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
