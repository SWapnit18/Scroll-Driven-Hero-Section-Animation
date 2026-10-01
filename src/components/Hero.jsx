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
  const hudRef = useRef(null);

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
        videoRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );

      // 2. Core Scroll-Driven Video Scrubbing (ScrollTrigger)
      if (!prefersReducedMotion) {
        const video = videoRef.current;

        const setupScrollVideo = () => {
          if (!video || !video.duration || !isFinite(video.duration)) return;

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=2000', // 2000px scroll duration for smooth cinematic frame-by-frame control
              scrub: 1,      // 1-second smooth interpolation
              pin: heroRef.current,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // Scrub video playback position exactly across total duration
          scrollTl.to(video, {
            currentTime: video.duration,
            ease: 'none',
          }, 0);

          // Subtle text parallax and fade
          scrollTl.to(headlineRef.current, {
            y: -60,
            opacity: 0.3,
            scale: 0.95,
            ease: 'none',
          }, 0);

          scrollTl.to(statsRef.current, {
            y: 40,
            opacity: 0.25,
            stagger: 0.05,
            ease: 'none',
          }, 0);

          if (hudRef.current) {
            scrollTl.to(hudRef.current, {
              opacity: 0.8,
              scale: 1.05,
              ease: 'power1.inOut',
            }, 0.5);
          }
        };

        if (video) {
          if (video.readyState >= 2 && isFinite(video.duration)) {
            setupScrollVideo();
          } else {
            video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
          }
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
            We create digital experiences designed to move people forward.
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

        {/* Cinematic Scroll-Driven Video Stage */}
        <div className="video-stage">
          <div className="video-glow-backdrop" />
          <video
            ref={videoRef}
            className="car-hero-video"
            src="/assets/car-hero.mp4"
            muted
            playsInline
            preload="auto"
          />
          {/* Studio Floor Ambient Shadow */}
          <div className="video-floor-shadow" />
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
