import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const carWrapperRef = useRef(null);
  const frontWheelRef = useRef(null);
  const rearWheelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initial Page Load Animation
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

      // 2. Core Scroll-Driven Car Translation & SMOOTH MOTION-ROTATION
      if (!prefersReducedMotion) {
        const isMobile = window.innerWidth < 768;
        const travelX = isMobile ? 220 : (window.innerWidth > 1400 ? 640 : 460);
        const travelY = isMobile ? -30 : -20;
        const scaleVal = isMobile ? 1.08 : 1.16;
        const rotateVal = isMobile ? 2 : 4;
        
        // Exact wheel rotation calibrated to travel distance
        const wheelDegrees = isMobile ? 720 : 1260;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1600',
            scrub: 1,
            pin: heroRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // 🏎️ Supercar glides forward
        scrollTl.to(carWrapperRef.current, {
          x: travelX,
          y: travelY,
          scale: scaleVal,
          rotation: rotateVal,
          ease: 'power1.inOut',
        }, 0);

        // 🔄 Front Wheel Rotation around exact 50% 50% hub center
        if (frontWheelRef.current) {
          scrollTl.to(frontWheelRef.current, {
            rotation: wheelDegrees,
            ease: 'power1.inOut',
            transformOrigin: '50% 50%',
          }, 0);
        }

        // 🔄 Rear Wheel Rotation around exact 50% 50% hub center
        if (rearWheelRef.current) {
          scrollTl.to(rearWheelRef.current, {
            rotation: wheelDegrees,
            ease: 'power1.inOut',
            transformOrigin: '50% 50%',
          }, 0);
        }

        // Text Parallax
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

        {/* Central Vehicle Showcase with Flawless Original Supercar Asset */}
        <div ref={carWrapperRef} className="car-kinetic-stage">
          <div className="car-rig-container">
            {/* 1. Pristine Full-Resolution Supercar Image (Original Perfect Asset) */}
            <img 
              src="/car.png" 
              alt="ITZFIZZ Velocity Aerodynamic Supercar"
              className="car-chassis-image"
            />

            {/* 2. 🔄 Synchronized Front Wheel Spokes Overlay (Hub: 19.579%, 70.393%) */}
            <div className="wheel-mount wheel-mount-front">
              <img 
                ref={frontWheelRef}
                src="/clean_spoke_front.png" 
                alt="Front Supercar Wheel Spokes"
                className="wheel-disc-image"
              />
            </div>

            {/* 3. 🔄 Synchronized Rear Wheel Spokes Overlay (Hub: 84.547%, 70.393%) */}
            <div className="wheel-mount wheel-mount-rear">
              <img 
                ref={rearWheelRef}
                src="/clean_spoke_rear.png" 
                alt="Rear Supercar Wheel Spokes"
                className="wheel-disc-image"
              />
            </div>
          </div>

          {/* Ground Contact Shadow */}
          <div className="car-kinetic-shadow" />
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
