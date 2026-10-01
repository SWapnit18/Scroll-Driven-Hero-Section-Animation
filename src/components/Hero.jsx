import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initial Page Load Entrance Animation
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
        videoRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );

      // 2. Core Scroll-Driven Video Frame Scrubbing
      if (!prefersReducedMotion) {
        const video = videoRef.current;

        const setupScrollVideo = () => {
          const duration = (video && video.duration && isFinite(video.duration)) ? video.duration : 9;

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=1800',
              scrub: 1,
              pin: heroRef.current,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // Scrub video currentTime with scroll progress
          if (video) {
            scrollTl.to(video, {
              currentTime: duration,
              ease: 'none',
            }, 0);
          }

          // Subtle text parallax
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
        };

        if (video) {
          if (video.readyState >= 1 && isFinite(video.duration)) {
            setupScrollVideo();
          } else {
            video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
            // Immediate fallback trigger so it never fails to attach
            setTimeout(setupScrollVideo, 300);
          }
        } else {
          setupScrollVideo();
        }
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

        {/* Central Vehicle Showcase Container (Video + Fallback Car Image) */}
        <div className="car-showcase-container">
          <video
            ref={videoRef}
            className="car-showcase-video"
            src="/assets/car-hero.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
          />
          <div className="car-ground-shadow" />
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
