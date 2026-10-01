import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ctaRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={ctaRef} 
      id="contact" 
      className="py-20 md:py-28 bg-[#F5F2EC] relative border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main CTA Card */}
        <div 
          ref={cardRef}
          className="relative bg-[#111111] text-white rounded-3xl p-10 md:p-16 lg:p-20 overflow-hidden shadow-2xl text-center flex flex-col items-center"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5A36]/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-widest font-semibold text-[#FF5A36] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Your Next Journey</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading uppercase tracking-wider max-w-3xl leading-tight">
            READY TO MOVE FORWARD?
          </h2>

          {/* Text */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
            Let's build something meaningful. Transform your digital presence with scroll-driven precision and cinematic web craft.
          </p>

          {/* Action Button & Email */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="mailto:contact@itzfizz.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FF5A36] hover:bg-[#ff431b] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FF5A36]/30 text-base"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="mailto:contact@itzfizz.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-full transition-all duration-300 text-sm border border-white/10"
            >
              <Mail className="w-4 h-4 text-[#FF5A36]" />
              <span>contact@itzfizz.com</span>
            </a>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#666666]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111111]">ITZFIZZ</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-[#111111] transition-colors">Privacy</a>
            <a href="#hero" className="hover:text-[#111111] transition-colors">Terms</a>
            <a href="#hero" className="hover:text-[#111111] transition-colors">Scroll to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
