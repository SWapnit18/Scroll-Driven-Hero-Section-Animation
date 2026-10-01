import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const visualRef = useRef(null);
  const carWrapperRef = useRef(null);
  const speedLinesRef = useRef(null);
  const statsCardsRef = useRef([]);
  const scrollPromptRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initial Page Load Animations (Timeline)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.1 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        carWrapperRef.current,
        { opacity: 0, scale: 0.9, x: -60 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        statsCardsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.18, 
          ease: 'back.out(1.4)' 
        },
        '-=0.8'
      )
      .fromTo(
        scrollPromptRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // 2. Core Scroll-Driven Motion via GSAP ScrollTrigger
      if (!prefersReducedMotion) {
        // Calculate responsive travel distance
        const isMobile = window.innerWidth < 768;
        const travelX = isMobile ? 180 : (window.innerWidth > 1400 ? 520 : 380);
        const travelY = isMobile ? -30 : -20;
        const scaleVal = isMobile ? 1.08 : 1.18;
        const rotateVal = isMobile ? 2.5 : 4.5;

        // ScrollTrigger Timeline connected with scrub
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1300',
            scrub: 1, // Smooth 1-second interpolation for natural weight
            pin: heroRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // Main Car/Object Visual Scroll-driven animation
        scrollTl.to(carWrapperRef.current, {
          x: travelX,
          y: travelY,
          scale: scaleVal,
          rotation: rotateVal,
          ease: 'power1.inOut',
        }, 0);

        // Background decorative speed lines motion
        if (speedLinesRef.current) {
          scrollTl.to(speedLinesRef.current, {
            scaleX: 1.5,
            x: -120,
            opacity: 0.8,
            ease: 'none',
          }, 0);
        }

        // Parallax and subtle fade of headline & stat badges during forward drive
        scrollTl.to(headlineRef.current, {
          y: -40,
          opacity: 0.45,
          scale: 0.97,
          ease: 'none',
        }, 0);

        scrollTl.to(statsCardsRef.current, {
          y: 35,
          opacity: 0.35,
          stagger: 0.05,
          ease: 'none',
        }, 0);

        scrollTl.to(scrollPromptRef.current, {
          opacity: 0,
          y: 20,
          ease: 'none',
        }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative w-full bg-[#F5F2EC] grid-bg-pattern overflow-hidden"
    >
      {/* Pinned Hero Viewport */}
      <div 
        ref={heroRef} 
        className="w-full min-h-screen flex flex-col justify-between pt-24 pb-10 px-6 md:px-12 max-w-7xl mx-auto relative z-10"
      >
        {/* Top Header Group */}
        <div className="flex flex-col items-center text-center mt-4 md:mt-8 select-none">
          {/* Subtle Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-black/5 text-xs font-semibold uppercase tracking-widest text-[#666666] mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-pulse" />
            <span>Interactive Motion Showcase</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
          </div>

          {/* Letter-Spaced Headline */}
          <h1 
            ref={headlineRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.35em] uppercase font-heading leading-tight transition-transform"
          >
            W E L C O M E&nbsp;&nbsp;I T Z F I Z Z
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-[#666666] font-normal max-w-2xl tracking-wide leading-relaxed"
          >
            Digital experiences that move people forward.
          </p>
        </div>

        {/* Central Visual Showcase Area */}
        <div 
          ref={visualRef} 
          className="relative w-full my-auto py-6 md:py-12 flex items-center justify-center overflow-visible"
        >
          {/* Dynamic glowing backdrop blur */}
          <div className="absolute w-[320px] sm:w-[500px] md:w-[700px] h-[160px] sm:h-[240px] md:h-[300px] bg-gradient-to-r from-[#FF5A36]/15 via-orange-300/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

          {/* Speed line vectors behind the car */}
          <div 
            ref={speedLinesRef} 
            aria-hidden="true"
            className="absolute inset-x-0 h-24 sm:h-32 flex flex-col justify-around opacity-25 pointer-events-none -z-10 transition-opacity"
          >
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent" />
            <div className="w-3/4 ml-auto h-[1.5px] bg-gradient-to-r from-transparent via-[#111111] to-transparent" />
            <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent" />
          </div>

          {/* Main Car/Visual Object */}
          <div 
            ref={carWrapperRef}
            className="relative w-full max-w-[340px] sm:max-w-[540px] md:max-w-[760px] lg:max-w-[880px] cursor-grab active:cursor-grabbing transform-gpu will-change-transform"
          >
            <img 
              src="/car.png" 
              alt="ITZFIZZ Velocity Aerodynamic Visual"
              className="w-full h-auto object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
              loading="eager"
            />
            {/* Ground Shadow & Glow */}
            <div className="w-4/5 mx-auto h-4 sm:h-6 bg-black/20 blur-md rounded-full -mt-2 sm:-mt-4" />
          </div>
        </div>

        {/* Bottom Metrics / Statistics Cards (Hero Viewport) */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {/* Stat Card 1 */}
            <div 
              ref={(el) => (statsCardsRef.current[0] = el)}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-[#FF5A36]/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="w-5 h-5 text-[#FF5A36]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111111] tracking-tight">
                  32%
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#666666]">
                  Faster Experiences
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div 
              ref={(el) => (statsCardsRef.current[1] = el)}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-[#FF5A36]/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Activity className="w-5 h-5 text-[#FF5A36]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111111] tracking-tight">
                  68%
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#666666]">
                  Higher Engagement
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div 
              ref={(el) => (statsCardsRef.current[2] = el)}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-[#FF5A36]/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#FF5A36]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111111] tracking-tight">
                  94%
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#666666]">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Scroll Down Indicator Prompt */}
          <div 
            ref={scrollPromptRef}
            className="flex items-center justify-center gap-2 mt-6 text-xs uppercase tracking-widest text-[#666666] font-semibold select-none animate-bounce"
          >
            <span>Scroll To Experience Motion</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#FF5A36]" />
          </div>
        </div>
      </div>
    </section>
  );
}
