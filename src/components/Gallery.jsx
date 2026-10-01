import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Layers, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeAngle, setActiveAngle] = useState('side');

  const angles = [
    {
      id: 'side',
      label: 'Side Profile',
      tag: 'AERODYNAMICS',
      desc: 'Sleek titanium mono-cell profile with streamlined drag coefficient of 0.21 Cd.',
      image: '/car.png',
      stat: '0.21 Cd Drag'
    },
    {
      id: 'rear_34',
      label: 'Rear 3/4',
      tag: 'KINETIC CRAFT',
      desc: 'Aggressive carbon fiber rear diffuser with dual neon thermal exhaust lighting channels.',
      image: '/car_rear_34.png',
      stat: 'Dual Venturi Tunnel'
    },
    {
      id: 'top_down',
      label: 'Top-Down',
      tag: 'AERO CHASSIS',
      desc: 'Overhead view showcasing continuous central cockpit canopy and active aero winglets.',
      image: '/car_top_down.png',
      stat: 'Active Aero Flaps'
    },
    {
      id: 'wheel',
      label: 'Wheel Detail',
      tag: 'PRECISION ALLOY',
      desc: 'Lightweight forged titanium alloy multi-spoke wheel with carbon ceramic orange calipers.',
      image: '/car_wheel.png',
      stat: 'Brembo Carbon Matrix'
    },
    {
      id: 'duo',
      label: 'Front / Rear Profile',
      tag: 'DUAL SYMMETRY',
      desc: 'Bespoke front aero intake matrix paired with horizontal rear signature lighting.',
      image: '/car_duo.png',
      stat: 'LED Matrix Beam'
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeItem = angles.find((a) => a.id === activeAngle) || angles[0];

  return (
    <section 
      ref={sectionRef} 
      id="gallery" 
      className="py-24 md:py-32 bg-[#F5F2EC] relative border-t border-black/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#FF5A36]/10 via-amber-400/5 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/5 text-xs font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>360° Perspective Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-wider font-heading">
            EXPLORE PERSPECTIVES
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#666666] leading-relaxed">
            Switch through precision engineered design angles crafted for the Itzfizz automotive visual experience.
          </p>

          {/* Interactive Perspective Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {angles.map((angle) => {
              const isSelected = activeAngle === angle.id;
              return (
                <button
                  key={angle.id}
                  onClick={() => setActiveAngle(angle.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#111111] text-white shadow-md scale-105 border border-black'
                      : 'bg-white/70 text-[#666666] hover:text-[#111111] hover:bg-white border border-black/5'
                  }`}
                >
                  {angle.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Showcase Canvas */}
        <div className="relative bg-white/75 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-14 border border-black/5 shadow-xl transition-all duration-500 min-h-[440px] sm:min-h-[520px] flex flex-col justify-between">
          {/* Top details bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5A36] px-3 py-1 bg-[#FF5A36]/10 rounded-full">
                {activeItem.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-heading mt-2">
                {activeItem.label}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                Specification
              </div>
              <div className="text-lg sm:text-xl font-black font-heading text-[#111111]">
                {activeItem.stat}
              </div>
            </div>
          </div>

          {/* Main Visual Image Display */}
          <div className="my-auto py-8 flex items-center justify-center relative">
            {/* Subtle glow behind visual */}
            <div className="absolute w-[360px] sm:w-[540px] h-[200px] bg-[#FF5A36]/10 blur-3xl rounded-full pointer-events-none" />

            <img
              key={activeItem.image}
              src={activeItem.image}
              alt={activeItem.label}
              className="max-h-[260px] sm:max-h-[380px] w-auto object-contain select-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] animate-fadeIn transition-all duration-500"
            />
          </div>

          {/* Bottom description */}
          <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[#666666] max-w-xl leading-relaxed">
              {activeItem.desc}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Itzfizz Kinetic Studio Asset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
