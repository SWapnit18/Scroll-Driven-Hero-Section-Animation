import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, TrendingUp, Award, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Reveal Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Reveal Stat Cards with Stagger
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const impactData = [
    {
      percentage: '32%',
      title: 'Faster Experiences',
      description: 'Streamlined visual architectures and GPU acceleration elevate front-end load times and runtime responsiveness.',
      icon: Zap,
      accent: 'from-orange-500/20 to-amber-500/5',
      badge: 'Performance Metric',
      points: ['Sub-second latency', 'Optimized repaint cycle', 'Zero jank scrolling']
    },
    {
      percentage: '68%',
      title: 'Higher Engagement',
      description: 'Interactive scroll-driven storytelling keeps visitors immersed, doubling session duration and active interaction.',
      icon: TrendingUp,
      accent: 'from-[#FF5A36]/20 to-red-500/5',
      badge: 'User Retention',
      points: ['2.4x time on page', 'Fluid micro-animations', 'Intuitive gesture response']
    },
    {
      percentage: '94%',
      title: 'Client Satisfaction',
      description: 'Engineered with pixel-perfection, verified accessibility standards, and fluid cross-device harmony.',
      icon: Award,
      accent: 'from-amber-600/20 to-yellow-500/5',
      badge: 'Quality Standard',
      points: ['Clean modular React', '100% responsive coverage', 'Modern aesthetics']
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="impact" 
      className="py-24 md:py-32 bg-[#F5F2EC] relative border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/5 text-xs font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
            <span>Proven Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] uppercase tracking-wider font-heading">
            OUR IMPACT
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#666666] leading-relaxed">
            Delivering quantifiable business breakthroughs through precision digital engineering and kinetic UI design.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-black/5 hover:border-[#FF5A36]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Background decorative tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#666666] px-3 py-1 bg-black/5 rounded-full">
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#FF5A36] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Percentage */}
                  <div className="text-5xl md:text-6xl font-black font-heading text-[#111111] tracking-tight mb-2 group-hover:text-[#FF5A36] transition-colors duration-300">
                    {item.percentage}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#111111] tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#666666] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Points */}
                <div className="pt-6 border-t border-black/5 space-y-2.5">
                  {item.points.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-center gap-2.5 text-xs font-semibold text-[#444444]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A36]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
