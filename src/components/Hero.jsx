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

      // 2. Core Scroll-Driven Car Translation & TRUE MECHANICAL WHEEL ROTATION
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

        // 🔄 Front Wheel Rotation around exact axle (241, 233)
        if (frontWheelRef.current) {
          scrollTl.to(frontWheelRef.current, {
            rotation: wheelDegrees,
            ease: 'power1.inOut',
            transformOrigin: '241px 233px',
          }, 0);
        }

        // 🔄 Rear Wheel Rotation around exact axle (1045, 233)
        if (rearWheelRef.current) {
          scrollTl.to(rearWheelRef.current, {
            rotation: wheelDegrees,
            ease: 'power1.inOut',
            transformOrigin: '1045px 233px',
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

        {/* Central Vehicle Showcase with Precision Wheel Kinematics */}
        <div ref={carWrapperRef} className="car-kinetic-stage">
          <div className="car-svg-chassis-stage">
            <svg 
              viewBox="0 0 1236 331" 
              className="car-master-svg"
              aria-label="ITZFIZZ Velocity Aerodynamic Supercar"
            >
              <defs>
                {/* Precision Supercar Wheel Rim Vector Rig */}
                <g id="supercar-wheel-rim">
                  {/* Tire Tread & Sidewall Base */}
                  <circle cx="0" cy="0" r="88" fill="#141416" stroke="#222224" strokeWidth="3" />
                  
                  {/* Outer Vivid Orange Accent Pinstripe */}
                  <circle cx="0" cy="0" r="82" fill="none" stroke="#FF5A36" strokeWidth="2.4" />
                  
                  {/* Machined Silver Outer Rim Ring */}
                  <circle cx="0" cy="0" r="77" fill="#1b1b1e" stroke="#c8c8ce" strokeWidth="1.8" />
                  
                  {/* Inner Dark Rim Barrel with Orange Halo */}
                  <circle cx="0" cy="0" r="73" fill="#121214" stroke="#FF5A36" strokeWidth="1.4" opacity="0.9" />

                  {/* Carbon Ceramic Drilled Brake Rotor Surface */}
                  <circle cx="0" cy="0" r="63" fill="#252528" stroke="#3d3d42" strokeWidth="1" strokeDasharray="3 3" />

                  {/* 5 Dual-Blade Aerodynamic Titanium Spokes with Silver Chamfers */}
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle})`}>
                      {/* Dark Spoke Core Body */}
                      <polygon points="-12,-18 -16,-72 16,-72 12,-18" fill="#1c1c1f" />
                      
                      {/* Left Silver Chamfer Blade */}
                      <polygon points="-5,-18 -15,-72 -11,-74 -2,-18" fill="#dcdce2" />
                      
                      {/* Right Silver Chamfer Blade */}
                      <polygon points="5,-18 15,-72 11,-74 2,-18" fill="#a0a0a8" />
                      
                      {/* Center Orange Kinematic Light Vector */}
                      <line x1="0" y1="-20" x2="0" y2="-71" stroke="#FF5A36" strokeWidth="2.2" strokeLinecap="round" />
                      
                      {/* Outer Rim Lip Interlocking Blade Tip */}
                      <polygon points="-16,-72 -14,-76 14,-76 16,-72" fill="#FF5A36" />
                    </g>
                  ))}

                  {/* Titanium Wheel Hub & Center Lock Emblem */}
                  <circle cx="0" cy="0" r="23" fill="#141416" stroke="#c0c0c8" strokeWidth="2" />
                  <circle cx="0" cy="0" r="16" fill="#1f1f22" stroke="#FF5A36" strokeWidth="1" />
                  
                  {/* Wheel Lug Bolts */}
                  {[0, 72, 144, 216, 288].map((boltAngle, j) => (
                    <circle 
                      key={j} 
                      cx={10 * Math.sin((boltAngle * Math.PI) / 180)} 
                      cy={-10 * Math.cos((boltAngle * Math.PI) / 180)} 
                      r="1.8" 
                      fill="#777" 
                    />
                  ))}

                  {/* Center Emblem Icon */}
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

              {/* 🔄 FRONT ROTATING WHEEL (Exact Axle: cx=241, cy=233) */}
              <g ref={frontWheelRef} transform="translate(241, 233)">
                <use href="#supercar-wheel-rim" />
              </g>

              {/* FIXED FRONT BRAKE CALIPER (Mounted to suspension, does not rotate) */}
              <g transform="translate(241, 233)">
                <path 
                  d="M 40,-42 C 58,-22 59,22 40,42 L 28,36 C 44,18 43,-16 28,-36 Z" 
                  fill="#FF5A36" 
                  stroke="#ff785a" 
                  strokeWidth="1.5"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.5))"
                />
                <text x="42" y="3" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" transform="rotate(90 42,3)" textAnchor="middle" letterSpacing="0.1em">
                  BREMBO
                </text>
              </g>

              {/* 🔄 REAR ROTATING WHEEL (Exact Axle: cx=1045, cy=233) */}
              <g ref={rearWheelRef} transform="translate(1045, 233)">
                <use href="#supercar-wheel-rim" />
              </g>

              {/* FIXED REAR BRAKE CALIPER (Mounted to suspension, does not rotate) */}
              <g transform="translate(1045, 233)">
                <path 
                  d="M -40,-42 C -58,-22 -59,22 -40,42 L -28,36 C -44,18 -43,-16 -28,-36 Z" 
                  fill="#FF5A36" 
                  stroke="#ff785a" 
                  strokeWidth="1.5"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.5))"
                />
                <text x="-42" y="3" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" transform="rotate(-90 -42,3)" textAnchor="middle" letterSpacing="0.1em">
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
