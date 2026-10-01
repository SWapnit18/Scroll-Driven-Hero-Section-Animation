import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const carWrapperRef = useRef(null);
  const carShadowRef = useRef(null);
  const statsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initial Page Load Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        carWrapperRef.current,
        { opacity: 0, x: -80, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.7'
      );

      // 2. Core Scroll-Driven Motion (GSAP ScrollTrigger + scrub)
      if (!prefersReducedMotion) {
        const isMobile = window.innerWidth < 768;
        const travelX = isMobile ? 220 : (window.innerWidth > 1400 ? 640 : 460);
        const travelY = isMobile ? -30 : -20;
        const scaleVal = isMobile ? 1.08 : 1.16;
        const rotateVal = isMobile ? 2 : 4;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1600',
            scrub: 1, // Smooth interpolation
            pin: heroRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // 🏎️ Supercar glides seamlessly across viewport
        scrollTl.to(carWrapperRef.current, {
          x: travelX,
          y: travelY,
          scale: scaleVal,
          rotation: rotateVal,
          ease: 'power1.inOut',
        }, 0);

        // Dynamic ground contact shadow tracks the vehicle
        if (carShadowRef.current) {
          scrollTl.to(carShadowRef.current, {
            x: travelX * 0.95,
            scaleX: 1.15,
            ease: 'power1.inOut',
          }, 0);
        }

        // Text Parallax & Fade
        scrollTl.to(headlineRef.current, {
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
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="hero-container">
      <div ref={heroRef} className="hero-viewport">
        {/* Editorial Text Content */}
        <div className="hero-content">
          <p className="hero-eyebrow">DIGITAL EXPERIENCES</p>
          
          <h1 ref={headlineRef} className="hero-headline">
            W E L C O M E<br />I T Z F I Z Z
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Digital experiences designed to move people forward.
          </p>

          {/* Impact Statistics */}
          <div className="hero-stats">
            <div ref={(el) => (statsRef.current[0] = el)} className="stat-item">
              <strong className="stat-number">32%</strong>
              <span className="stat-label">Faster Experiences</span>
            </div>

            <div ref={(el) => (statsRef.current[1] = el)} className="stat-item">
              <strong className="stat-number">68%</strong>
              <span className="stat-label">Higher Engagement</span>
            </div>

            <div ref={(el) => (statsRef.current[2] = el)} className="stat-item">
              <strong className="stat-number">94%</strong>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Central Supercar Showcase (Original Clean Single-Asset Render) */}
        <div ref={carWrapperRef} className="car-kinetic-stage">
          <img 
            src="/car.png" 
            alt="ITZFIZZ Velocity Aerodynamic Supercar" 
            className="car-chassis-image"
          />
          {/* Ground Contact Shadow */}
          <div ref={carShadowRef} className="car-kinetic-shadow" />
        </div>

        {/* Scroll Prompt */}
        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE MOTION</span>
          <div className="scroll-bar" />
        </div>
      </div>
    </section>
  );
}
