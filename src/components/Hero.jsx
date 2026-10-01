import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 100;
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => `/sequence/frame_${String(i).padStart(3, '0')}.webp`);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ghostRef = useRef(null);
  const statsRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Preload image frame sequence
    const imgs = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePaths[i];
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');

      let currentFrame = -1;

      const renderFrame = (index) => {
        const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
        const img = imagesRef.current[i];
        if (!img) return;

        if (img.complete && img.naturalWidth) {
          if (i !== currentFrame) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            currentFrame = i;
          }
        } else {
          img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            currentFrame = i;
          };
        }
      };

      // Initial render
      renderFrame(0);

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
        stageRef.current,
        { opacity: 0, y: 60, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        ghostRef.current,
        { opacity: 0 },
        { opacity: 0.08, duration: 1.6 },
        0
      );

      // 2. Cinematic Scroll-Driven Drive Timeline
      if (!prefersReducedMotion) {
        const frameObj = { frame: 0 };

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=2800',
            scrub: 0.6,
            pin: heroRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // Frame playback perfectly bound to scroll position
        scrollTl.to(frameObj, {
          frame: TOTAL_FRAMES - 1,
          ease: 'none',
          duration: 1,
          onUpdate: () => renderFrame(Math.round(frameObj.frame)),
        }, 0);

        // Smooth zoom & translation dynamics
        scrollTl.to(stageRef.current, {
          scale: 1.08,
          ease: 'power1.inOut',
          duration: 1,
        }, 0);

        // Content Fade & Parallax
        scrollTl.to(headlineRef.current, {
          y: -40,
          opacity: 0.25,
          duration: 0.4,
          ease: 'none',
        }, 0.05);

        scrollTl.to(subtitleRef.current, {
          opacity: 0,
          duration: 0.15,
          ease: 'none',
        }, 0);

        scrollTl.to(statsRef.current, {
          y: -20,
          opacity: 0,
          stagger: 0.04,
          duration: 0.3,
          ease: 'none',
        }, 0.04);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="hero-container">
      <div ref={heroRef} className="hero-viewport">
        {/* Background Ghost Watermark */}
        <div ref={ghostRef} className="hero-ghost-text" aria-hidden="true">
          AETHERIS
        </div>

        {/* Editorial Text Content */}
        <div className="hero-content">
          <p className="hero-eyebrow">DIGITAL EXPERIENCES</p>
          
          <h1 ref={headlineRef} className="hero-headline">
            W E L C O M E<br />I T Z F I Z Z
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Scroll to take the Aetheris from studio to open road.
          </p>

          {/* Impact Statistics */}
          <div className="hero-stats">
            <div ref={(el) => (statsRef.current[0] = el)} className="stat-item">
              <strong className="stat-number">1000+</strong>
              <span className="stat-label">Horsepower Hybrid V8</span>
            </div>

            <div ref={(el) => (statsRef.current[1] = el)} className="stat-item">
              <strong className="stat-number">1100 Nm</strong>
              <span className="stat-label">Instant Torque</span>
            </div>

            <div ref={(el) => (statsRef.current[2] = el)} className="stat-item">
              <strong className="stat-number">100%</strong>
              <span className="stat-label">Motion Follows Scroll</span>
            </div>
          </div>
        </div>

        {/* Cinematic Hypercar Canvas Stage */}
        <div ref={stageRef} className="car-canvas-stage">
          <canvas 
            ref={canvasRef} 
            width={684} 
            height={405} 
            className="car-render-canvas"
            role="img"
            aria-label="Aetheris hypercar driving from studio to open road, controlled by scroll"
          />
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
