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
  const carWrapperRef = useRef(null);
  const carShadowRef = useRef(null);
  const speedLinesRef = useRef(null);
  const glowOrb1Ref = useRef(null);
  const glowOrb2Ref = useRef(null);
  const statsCardsRef = useRef([]);
  const scrollPromptRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initial Page Load Animations (Timeline)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35, letterSpacing: '0.45em' },
        { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1.1, delay: 0.1 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        carWrapperRef.current,
        { opacity: 0, scale: 0.88, x: -70 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        statsCardsRef.current,
        { opacity: 0, y: 30, scale: 0.94 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.16, 
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
        const isMobile = window.innerWidth < 768;
        const travelX = isMobile ? 190 : (window.innerWidth > 1400 ? 540 : 400);
        const travelY = isMobile ? -35 : -25;
        const scaleVal = isMobile ? 1.08 : 1.16;
        const rotateVal = isMobile ? 2 : 4;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1300',
            scrub: 1, // Smooth interpolation
            pin: heroRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // Main Car Visual Glide
        scrollTl.to(carWrapperRef.current, {
          x: travelX,
          y: travelY,
          scale: scaleVal,
          rotation: rotateVal,
          ease: 'power1.inOut',
        }, 0);

        // Responsive Shadow follow
        if (carShadowRef.current) {
          scrollTl.to(carShadowRef.current, {
            x: travelX * 0.95,
            scaleX: 1.15,
            opacity: 0.35,
            ease: 'power1.inOut',
          }, 0);
        }

        // Kinetic background speed vector lines
        if (speedLinesRef.current) {
          scrollTl.to(speedLinesRef.current, {
            scaleX: 1.6,
            x: -140,
            opacity: 0.7,
            ease: 'none',
          }, 0);
        }

        // Ambient glowing orbs movement
        if (glowOrb1Ref.current && glowOrb2Ref.current) {
          scrollTl.to(glowOrb1Ref.current, {
            x: 200,
            scale: 1.3,
            opacity: 0.5,
            ease: 'none',
          }, 0);
          scrollTl.to(glowOrb2Ref.current, {
            x: -150,
            scale: 0.8,
            opacity: 0.3,
            ease: 'none',
          }, 0);
        }

        // Subtle fade/parallax for header & metrics
        scrollTl.to(headlineRef.current, {
          y: -45,
          opacity: 0.4,
          scale: 0.96,
          ease: 'none',
        }, 0);

        scrollTl.to(statsCardsRef.current, {
          y: 40,
          opacity: 0.3,
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
      className="relative w-full bg-[#F5F2EC] overflow-hidden"
    >
      {/* Brilliant Ambient Kinetic Background Layers */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: 'radial-gradient(#111111 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient Glowing Orbs */}
        <div 
          ref={glowOrb1Ref}
          className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5A36]/15 via-orange-400/10 to-transparent blur-[120px] rounded-full"
        />
        <div 
          ref={glowOrb2Ref}
          className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-gradient-to-tl from-amber-400/12 via-[#FF5A36]/8 to-transparent blur-[140px] rounded-full"
        />

        {/* Studio Spotlight Horizon Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[320px] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-3xl rounded-[100%]" />
      </div>

      {/* Pinned Hero Viewport */}
      <div 
        ref={heroRef} 
        className="w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto relative z-10"
      >
        {/* Top Header Group */}
        <div className="flex flex-col items-center text-center mt-2 md:mt-6 select-none">
          {/* Subtle Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 text-xs font-bold uppercase tracking-widest text-[#666666] mb-4 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-ping" />
            <span className="text-[#111111]">Interactive Motion Showcase</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
          </div>

          {/* Letter-Spaced Headline */}
          <h1 
            ref={headlineRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] uppercase font-heading leading-tight tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.35em]"
          >
            W E L C O M E&nbsp;&nbsp;I T Z F I Z Z
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-[#666666] font-normal max-w-2xl tracking-wide leading-relaxed"
          >
            Digital experiences that move people forward.
          </p>
        </div>

        {/* Central Visual Showcase Area */}
        <div className="relative w-full my-auto py-4 md:py-8 flex flex-col items-center justify-center overflow-visible">
          {/* Kinetic Speed Lines behind car */}
          <div 
            ref={speedLinesRef} 
            aria-hidden="true"
            className="absolute inset-x-0 h-28 sm:h-36 flex flex-col justify-around opacity-25 pointer-events-none -z-10"
          >
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent" />
            <div className="w-4/5 ml-auto h-[1.5px] bg-gradient-to-r from-transparent via-[#111111] to-transparent" />
            <div className="w-3/5 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent" />
          </div>

          {/* Main Car/Visual Object */}
          <div 
            ref={carWrapperRef}
            className="relative w-full max-w-[340px] sm:max-w-[560px] md:max-w-[780px] lg:max-w-[920px] transform-gpu will-change-transform z-10"
          >
            <img 
              src="/car.png" 
              alt="ITZFIZZ Velocity Aerodynamic Supercar"
              className="w-full h-auto object-contain select-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]"
              loading="eager"
            />
          </div>

          {/* Ambient Ground Contact Shadow */}
          <div 
            ref={carShadowRef}
            className="w-3/5 max-w-[650px] h-6 sm:h-9 bg-black/35 blur-xl rounded-[100%] -mt-3 sm:-mt-6 pointer-events-none transform-gpu will-change-transform"
          />
        </div>

        {/* Bottom Metrics / Statistics Cards (Hero Viewport) */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {/* Stat Card 1 */}
            <div 
              ref={(el) => (statsCardsRef.current[0] = el)}
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

            {/* Stat Card 2 */}
            <div 
              ref={(el) => (statsCardsRef.current[1] = el)}
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

            {/* Stat Card 3 */}
            <div 
              ref={(el) => (statsCardsRef.current[2] = el)}
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

          {/* Subtle Scroll Down Indicator Prompt */}
          <div 
            ref={scrollPromptRef}
            className="flex items-center justify-center gap-2 mt-5 text-xs uppercase tracking-widest text-[#666666] font-semibold select-none animate-bounce"
          >
            <span>Scroll To Experience Motion</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#FF5A36]" />
          </div>
        </div>
      </div>
    </section>
  );
}
