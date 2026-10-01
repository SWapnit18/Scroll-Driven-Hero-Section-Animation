import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const carWrapperRef = useRef(null);
  const frontSpokesRef = useRef(null);
  const rearSpokesRef = useRef(null);
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

      // 2. Core Scroll-Driven Car Translation & TRUE RIGID WHEEL ROTATION
      if (!prefersReducedMotion) {
        const isMobile = window.innerWidth < 768;
        const travelX = isMobile ? 220 : (window.innerWidth > 1400 ? 640 : 460);
        const travelY = isMobile ? -30 : -20;
        const scaleVal = isMobile ? 1.08 : 1.16;
        const rotateVal = isMobile ? 2 : 4;
        
        // Physically calibrated angular spin proportional to forward distance
        const wheelDegrees = isMobile ? 720 : 1260;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1600',
            scrub: 1, // Smooth mechanical scrub
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

        // 🔄 Front Wheel Spokes Rotation around its exact center axle
        if (frontSpokesRef.current) {
          scrollTl.to(frontSpokesRef.current, {
            rotation: wheelDegrees,
            ease: 'power1.inOut',
            transformOrigin: '247px 233px', // Exact mathematical hub coordinate on 1236x331 canvas
          }, 0);
        }

        // 🔄 Rear Wheel Spokes Rotation around its exact center axle
        if (rearSpokesRef.current) {
          scrollTl.to(rearSpokesRef.current, {
            rotation: wheelDegrees,
            ease: 'power1.inOut',
            transformOrigin: '1045px 233px', // Exact mathematical hub coordinate on 1236x331 canvas
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

        {/* Central Vehicle Showcase with Rigid Multi-Spoke Wheel Rotation */}
        <div ref={carWrapperRef} className="car-kinetic-stage">
          <div className="car-svg-chassis-stage">
            <svg 
              viewBox="0 0 1236 331" 
              className="car-master-svg"
              aria-label="ITZFIZZ Velocity Aerodynamic Supercar"
            >
              <defs>
                {/* Reusable Precision Supercar Wheel Rig */}
                <g id="supercar-wheel-rim">
                  {/* Outer Tire & Carbon Ring */}
                  <circle cx="0" cy="0" r="95" fill="#151515" stroke="#262626" strokeWidth="4" />
                  <circle cx="0" cy="0" r="88" fill="none" stroke="#FF5A36" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="76" fill="#1c1c1c" stroke="#333333" strokeWidth="2" />
                  
                  {/* Ventilated Carbon Ceramic Brake Disc */}
                  <circle cx="0" cy="0" r="66" fill="#2a2a2a" stroke="#404040" strokeWidth="1" strokeDasharray="3 3" />

                  {/* 5 Dual-Spoke Titanium Alloy Rim */}
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle})`}>
                      {/* Titanium Spoke Left Blade */}
                      <polygon points="-8,-20 -14,-72 -6,-74 -2,-20" fill="#b0b0b5" stroke="#dcdce0" strokeWidth="0.8" />
                      {/* Titanium Spoke Right Blade */}
                      <polygon points="8,-20 14,-72 6,-74 2,-20" fill="#8c8c92" stroke="#dcdce0" strokeWidth="0.8" />
                      {/* Inner Accent Line */}
                      <line x1="0" y1="-20" x2="0" y2="-72" stroke="#FF5A36" strokeWidth="1.8" />
                      {/* Outer Rim Lip Arc */}
                      <path d="M -14,-72 A 74 74 0 0 1 14,-72" fill="none" stroke="#FF5A36" strokeWidth="3" />
                    </g>
                  ))}

                  {/* Central Titanium Hub & Emblem */}
                  <circle cx="0" cy="0" r="22" fill="#111111" stroke="#b0b0b5" strokeWidth="2" />
                  <circle cx="0" cy="0" r="14" fill="#1e1e1e" />
                  <polygon points="-5,-2 5,-2 0,5" fill="#FF5A36" />
                </g>
              </defs>

              {/* Base Supercar Body Image */}
              <image 
                href="/car.png" 
                x="0" 
                y="0" 
                width="1236" 
                height="331" 
              />

              {/* 🔄 FRONT ROTATING WHEEL (Axle: cx=247, cy=233) */}
              <g ref={frontSpokesRef} transform="translate(247, 233)">
                <use href="#supercar-wheel-rim" />
              </g>

              {/* FIXED FRONT BRAKE CALIPER (Mounted to car body, does not rotate) */}
              <g transform="translate(247, 233)">
                <path 
                  d="M 44,-42 C 60,-20 62,20 44,42 L 32,36 C 46,18 45,-16 32,-36 Z" 
                  fill="#FF5A36" 
                  stroke="#ff785a" 
                  strokeWidth="1.5"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                />
                <text x="44" y="3" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif" transform="rotate(90 44,3)" textAnchor="middle">
                  BREMBO
                </text>
              </g>

              {/* 🔄 REAR ROTATING WHEEL (Axle: cx=1045, cy=233) */}
              <g ref={rearSpokesRef} transform="translate(1045, 233)">
                <use href="#supercar-wheel-rim" />
              </g>

              {/* FIXED REAR BRAKE CALIPER (Mounted to car body, does not rotate) */}
              <g transform="translate(1045, 233)">
                <path 
                  d="M -44,-42 C -60,-20 -62,20 -44,42 L -32,36 C -46,18 -45,-16 -32,-36 Z" 
                  fill="#FF5A36" 
                  stroke="#ff785a" 
                  strokeWidth="1.5"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                />
                <text x="-44" y="3" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 -44,3)" textAnchor="middle">
                  BREMBO
                </text>
              </g>
            </svg>
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
