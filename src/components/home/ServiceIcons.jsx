"use client";
import React from 'react';
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react';

const ServiceIcons = ({ videoUrl }) => {
    const [player, setPlayer] = React.useState(null);
    const containerRef = React.useRef(null);

    // Load YouTube API and setup player
    React.useEffect(() => {
        const videoId = videoUrl?.split('embed/')[1]?.split('?')[0];
        if (!videoId) return;

        let playerInstance = null;

        const createPlayer = () => {
            // Ensure the container exists and YT is ready
            const container = document.getElementById('youtube-player');
            if (!container || !window.YT || !window.YT.Player) return;

            playerInstance = new window.YT.Player('youtube-player', {
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    mute: 0,
                    controls: 1,
                    loop: 1,
                    playlist: videoId,
                    playsinline: 1,
                    rel: 0,
                    vq: 'hd1080',
                    enablejsapi: 1,
                    origin: window.location.origin,
                    modestbranding: 1
                },
                events: {
                    onReady: (event) => {
                        setPlayer(event.target);
                        if (event.target.setPlaybackQuality) {
                            event.target.setPlaybackQuality('hd1080');
                        }
                        event.target.playVideo();
                    },
                    onError: (e) => console.error("YouTube Player Error:", e)
                }
            });
        };

        // 1. Script Loading
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }

        return () => {
            if (playerInstance && playerInstance.destroy) playerInstance.destroy();
        };
    }, [videoUrl]); // Removed player from dependencies to prevent infinite loop


    const services = [
        {
            icon: <Truck size={32} />,
            title: "Worldwide Shipping",
            subtitle: "On orders over RM150",
            color: "from-blue-400 to-blue-600"
        },
        {
            icon: <RotateCcw size={32} />,
            title: "Returns",
            subtitle: "Within 30 days for an exchange",
            color: "from-purple-400 to-purple-600"
        },
        {
            icon: <Headphones size={32} />,
            title: "Online Support",
            subtitle: "24/7 online support center",
            color: "from-pink-400 to-pink-600"
        },
        {
            icon: <CreditCard size={32} />,
            title: "Secure Payment",
            subtitle: "Pay with multiple credit cards",
            color: "from-orange-400 to-orange-600"
        }
    ];

    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Service Icons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services.map((item, index) => (
                        <div key={index} className="group relative p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                            {/* Gradient Background Decoration */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity duration-500`}></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary-blue transition-colors">{item.title}</h3>
                                <p className="text-gray-500 text-sm font-medium">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Video Section */}
                <div 
                    className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 h-64 md:h-[400px] flex items-center bg-black relative group"
                    style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${videoUrl?.split('embed/')[1]?.split('?')[0]}/maxresdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div id="youtube-player" className="w-full h-full absolute inset-0 transition-opacity duration-1000"></div>



                </div>
            </div>
        </section>
    );
};

export default ServiceIcons;
