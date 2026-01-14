'use client';

import React, { useState, useEffect } from 'react';

const destinations = [
    { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Iceland', country: 'Europe', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000' },
];

const DestinationReveal = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHoveringSection, setIsHoveringSection] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            className="py-32 bg-primary text-white overflow-hidden relative cursor-none"
            onMouseEnter={() => setIsHoveringSection(true)}
            onMouseLeave={() => {
                setIsHoveringSection(false);
                setActiveIndex(null);
            }}
        >
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col gap-4">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm">Trending Now</span>
                    <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter">
                        Where to <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent">Next?</span>
                    </h2>
                </div>

                <div className="flex flex-col">
                    {destinations.map((dest, index) => (
                        <div
                            key={dest.name}
                            className="group py-8 border-b border-white/10 flex items-center justify-between cursor-pointer transition-all hover:bg-white/5 px-4"
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <div className="flex items-baseline gap-6">
                                <span className="text-2xl font-mono text-white/30 group-hover:text-secondary transition-colors">
                                    0{index + 1}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-bold group-hover:translate-x-4 transition-transform duration-500">
                                    {dest.name}
                                </h3>
                            </div>
                            <span className="text-xl text-white/50 group-hover:text-white transition-colors">
                                {dest.country}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover Image Reveal */}
            <div
                className="fixed pointer-events-none z-50 transition-all duration-500 ease-out"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '550px',
                    opacity: isHoveringSection && activeIndex !== null ? 1 : 0,
                    scale: isHoveringSection && activeIndex !== null ? 1 : 0.5,
                    filter: isHoveringSection && activeIndex !== null ? 'blur(0px)' : 'blur(20px)',
                }}
            >
                {destinations.map((dest, index) => (
                    <div
                        key={dest.name}
                        className={`absolute inset-0 transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        />
                        {/* Overlay gradient on image */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Explore</p>
                            <h4 className="text-4xl font-bold">{dest.name}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-secondary/5 to-transparent pointer-events-none" />
        </section>
    );
};

export default DestinationReveal;
