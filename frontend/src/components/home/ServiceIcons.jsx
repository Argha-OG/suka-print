"use client";
import React from 'react';
import { Truck, RotateCcw, Headphones, CreditCard, Volume2, VolumeX } from 'lucide-react';

const ServiceIcons = ({ videoUrl }) => {
    const [isMuted, setIsMuted] = React.useState(true);
    const [player, setPlayer] = React.useState(null);
    const containerRef = React.useRef(null);

    // Load YouTube API and setup player
    React.useEffect(() => {
        const videoId = videoUrl?.split('embed/')[1]?.split('?')[0];
        if (!videoId) return;

        // Load API script if not exists
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        const onPlayerReady = (event) => {
            setPlayer(event.target);
            event.target.mute();
            if (event.target.setPlaybackQuality) {
                event.target.setPlaybackQuality('hd1080');
            }
            event.target.playVideo();
        };

        const createPlayer = () => {
            new window.YT.Player('youtube-player', {
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    loop: 1,
                    playlist: videoId,
                    playsinline: 1,
                    rel: 0,
                    vq: 'hd1080', // Attempt to force 1080p
                    modestbranding: 1
                },
                events: {
                    onReady: onPlayerReady
                }
            });
        };

        if (window.YT && window.YT.Player) {
            createPlayer();
        } else {
            window.onYouTubeIframeAPIReady = createPlayer;
        }

        const handleInteraction = () => {
            setIsMuted(false);
            if (window.YT && player) {
                player.unMute();
                if (player.setPlaybackQuality) {
                    player.setPlaybackQuality('hd1080');
                }
                player.playVideo();
            }
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [videoUrl, player]);

    // Sync isMuted state with YouTube Player
    React.useEffect(() => {
        if (player && player.unMute) {
            if (isMuted) {
                player.mute();
            } else {
                player.unMute();
                if (player.setPlaybackQuality) {
                    player.setPlaybackQuality('hd1080');
                }
            }
        }
    }, [isMuted, player]);

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
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 h-64 md:h-[400px] flex items-center bg-black relative group">
                    <div id="youtube-player" className="w-[115%] h-[115%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>



                    {/* Sound Toggle Overlay */}
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-4 right-4 z-20 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 border border-white/20 flex items-center gap-2"
                    >
                        {isMuted ? (
                            <>
                                <VolumeX size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Click for Music</span>
                            </>
                        ) : (
                            <Volume2 size={20} />
                        )}
                    </button>
                    
                    {/* Visual Overlay if muted */}
                    {isMuted && (
                        <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-all"></div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServiceIcons;
