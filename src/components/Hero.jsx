import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Activity, ShieldCheck, Zap, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const carWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const scrollPromptRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initial load entry animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 45, letterSpacing: '0.42em' },
        { opacity: 1, y: 0, letterSpacing: '0.32em', duration: 1.2, delay: 0.1 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 30, scale: 0.94 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.16, 
          ease: 'back.out(1.4)' 
        },
        '-=0.6'
      )
      .fromTo(
        carWrapperRef.current,
        { opacity: 0, scale: 0.9, x: -60 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );

      // 2. Core Scroll-Driven Motion via GSAP ScrollTrigger
      if (!prefersReducedMotion) {
        const video = videoRef.current;
        const isMobile = window.innerWidth < 768;
        const travelX = isMobile ? 180 : (window.innerWidth > 1400 ? 520 : 380);
        const travelY = isMobile ? -30 : -20;
        const scaleVal = isMobile ? 1.08 : 1.15;
        const rotateVal = isMobile ? 2 : 4;

        // Video scroll-scrub setup
        const setupScrollMotion = () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=1500',
              scrub: 1, // Smooth interpolation
              pin: heroRef.current,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // If video duration is available, scrub currentTime with scroll
          if (video && video.duration && isFinite(video.duration)) {
            scrollTl.to(video, {
              currentTime: video.duration,
              ease: 'none',
            }, 0);
          }

          // Move visual transform across viewport
          scrollTl.to(carWrapperRef.current, {
            x: travelX,
            y: travelY,
            scale: scaleVal,
            rotation: rotateVal,
            ease: 'power1.inOut',
          }, 0);

          // Parallax for text & badges
          scrollTl.to(titleRef.current, {
            y: -50,
            opacity: 0.35,
            scale: 0.96,
            ease: 'none',
          }, 0);

          scrollTl.to(statsRef.current, {
            y: 35,
            opacity: 0.3,
            stagger: 0.05,
            ease: 'none',
          }, 0);

          scrollTl.to(scrollPromptRef.current, {
            opacity: 0,
            y: 20,
            ease: 'none',
          }, 0);
        };

        if (video) {
          if (video.readyState >= 2 && isFinite(video.duration)) {
            setupScrollMotion();
          } else {
            video.addEventListener('loadedmetadata', setupScrollMotion, { once: true });
            // Fallback timeout in case video is pending
            setTimeout(setupScrollMotion, 400);
          }
        } else {
          setupScrollMotion();
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative w-full bg-[#F5F2EC] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#111111 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5A36]/15 via-orange-400/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-gradient-to-tl from-amber-400/12 via-[#FF5A36]/8 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Pinned Viewport */}
      <div 
        ref={heroRef} 
        className="w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto relative z-10"
      >
        {/* Top Header Group */}
        <div className="flex flex-col items-center text-center mt-2 md:mt-4 select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 text-xs font-bold uppercase tracking-widest text-[#666666] mb-4 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-ping" />
            <span className="text-[#111111]">SCROLL-DRIVEN MOTION EXPERIENCE</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
          </div>

          <h1 
            ref={titleRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] uppercase font-heading leading-tight tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.32em]"
          >
            W E L C O M E&nbsp;&nbsp;I T Z F I Z Z
          </h1>

          <p 
            ref={subtitleRef}
            className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-[#666666] font-normal max-w-2xl tracking-wide leading-relaxed"
          >
            Digital experiences designed to move people forward.
          </p>
        </div>

        {/* Central Vehicle Showcase Container (Supports Video & Ultra-Res Graphic) */}
        <div className="relative w-full my-auto py-4 md:py-8 flex flex-col items-center justify-center overflow-visible">
          {/* Main Visual/Video */}
          <div 
            ref={carWrapperRef}
            className="relative w-full max-w-[340px] sm:max-w-[560px] md:max-w-[780px] lg:max-w-[900px] transform-gpu will-change-transform z-10"
          >
            <video
              ref={videoRef}
              className="w-full h-auto object-contain select-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.22)] rounded-2xl hidden"
              src="/assets/car-hero.mp4"
              muted
              playsInline
              preload="auto"
            />
            {/* High-Performance Visual Fallback & Display */}
            <img 
              src="/car.png" 
              alt="ITZFIZZ Velocity Aerodynamic Supercar"
              className="w-full h-auto object-contain select-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.22)]"
              loading="eager"
            />
          </div>

          {/* Dynamic Ground Contact Shadow */}
          <div className="w-3/5 max-w-[650px] h-6 sm:h-9 bg-black/35 blur-xl rounded-[100%] -mt-3 sm:-mt-6 pointer-events-none" />
        </div>

        {/* Statistics Cards */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div 
              ref={(el) => (statsRef.current[0] = el)}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:border-[#FF5A36]/40 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#FF5A36] transition-colors duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111111] tracking-tight group-hover:text-[#FF5A36] transition-colors">
                  32%
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#666666]">
                  Faster Experiences
                </div>
              </div>
            </div>

            <div 
              ref={(el) => (statsRef.current[1] = el)}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:border-[#FF5A36]/40 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#FF5A36] transition-colors duration-300">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111111] tracking-tight group-hover:text-[#FF5A36] transition-colors">
                  68%
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#666666]">
                  Higher Engagement
                </div>
              </div>
            </div>

            <div 
              ref={(el) => (statsRef.current[2] = el)}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:border-[#FF5A36]/40 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#FF5A36] transition-colors duration-300">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111111] tracking-tight group-hover:text-[#FF5A36] transition-colors">
                  94%
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#666666]">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div 
            ref={scrollPromptRef}
            className="flex items-center justify-center gap-2 mt-5 text-xs uppercase tracking-widest text-[#666666] font-semibold select-none animate-bounce"
          >
            <span>SCROLL TO EXPLORE MOTION</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#FF5A36]" />
          </div>
        </div>
      </div>
    </section>
  );
}
