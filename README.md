# Itzfizz Scroll-Driven Hero Animation

A high-performance, responsive, one-page landing experience showcasing scroll-driven motion storytelling using **React**, **Tailwind CSS**, **GSAP**, and **GSAP ScrollTrigger**.

![Itzfizz Showcase](/public/car.png)

## Overview

This project was developed for the **Itzfizz Web Development Internship Assignment: Scroll-Driven Hero Section Animation**. The primary objective is to demonstrate mastery in frontend animations, kinematics, viewport pinning, performance optimization, and refined UI/UX design.

The core highlight is the **interactive scroll-driven hero motion**: the central aerodynamic visual is tied directly to the user's scroll progress (via GSAP ScrollTrigger `scrub: 1`). As the user scrolls down, the visual glides across the viewport; pausing immediately holds the animation state; and scrolling back up smoothly reverses the motion.

---

## Features

- 🏎️ **Scroll-Driven Hero Section (Pinned Viewport)**: Full-viewport pinning with GSAP ScrollTrigger where the main visual moves, elevates, and gently angles based on exact scroll progress.
- ⚡ **Initial Load Sequence**: Clean timeline entrance animating the letter-spaced headline (`W E L C O M E   I T Z F I Z Z`), subtitle, visual object, and staggered impact metrics.
- 📊 **Impact Statistics Section (`OUR IMPACT`)**: Viewport-triggered reveal cards showcasing key metrics (32% Faster Experiences, 68% Higher Engagement, 94% Client Satisfaction).
- 🎯 **Final CTA Section (`READY TO MOVE FORWARD?`)**: Minimalist, high-contrast dark call-to-action module with ambient glowing accents and interactive email dispatch.
- 📱 **Fully Responsive Across All Viewports**: Tested and optimized for 320px, 375px, 425px, 768px, 1024px, and 1440px+ screens.
- ♿ **Accessibility & Reduced Motion**: Automatically respects `prefers-reduced-motion: reduce` by preserving layout stability and minimizing jarring movements.
- 🚀 **Production-Grade Performance**: Driven strictly through GPU-accelerated `transform` and `opacity` properties, avoiding layout thrashing.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine**: [GSAP](https://greensock.com/gsap/) & [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Manrope & Space Grotesk](https://fonts.google.com/)

---

## Animation Approach & Architecture

1. **Initial Load (Intro Sequence)**:
   - Orchestrated with `gsap.timeline({ defaults: { ease: 'power3.out' } })`.
   - The letter-spaced header fades in while translating on the Y-axis.
   - The central visual slides in from offset with slight scaling.
   - The 3 statistic cards trigger sequentially using staggered delays (`stagger: 0.18s`).

2. **Core Scroll Animation (ScrollTrigger + Scrub)**:
   - Configured with `trigger: containerRef`, `pin: heroRef`, `start: "top top"`, `end: "+=1300"`, `scrub: 1`.
   - The central visual translates along the X and Y axes with dynamic responsive thresholds (accounting for mobile vs. desktop display widths).
   - Speed line vectors dynamically stretch and travel in parallax against the car motion to create depth.
   - Initial headline & hero stat badges subtly fade and translate to clear the visual canvas for the cinematic vehicle pass.

3. **Reverse Scrolling**:
   - Because `scrub` is enabled on the ScrollTrigger instance, reversing the scroll direction naturally reverses the timeline with identical momentum and interpolation.

---

## Performance Considerations

- **GPU Acceleration**: All motions use `transform: translate3d / scale / rotate` with `will-change-transform` to prevent triggering expensive layout reflows (`top`, `left`, `width`, `height`).
- **Memory Management**: All GSAP timelines and ScrollTrigger instances are wrapped inside `gsap.context()` inside `useLayoutEffect` and cleaned up with `ctx.revert()` on component unmount.
- **Scroll Throttling**: GSAP ScrollTrigger handles scroll listener interpolation off the main rendering thread via `requestAnimationFrame`.

---

## Responsive Design Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| **< 768px (Mobile)** | Stacked navigation drawer, single-column hero stats, proportional translation scaling (`x: 180px`), adjusted headline font size. |
| **768px - 1024px (Tablet)** | Two/three-column grid adjustments, responsive padding, full horizontal navigation. |
| **> 1024px (Desktop)** | Full cinematic stage, expanded translation width (`x: 380px` - `520px`), parallax decorative lines. |

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/itzfizz-scroll-animation.git
cd itzfizz-scroll-animation
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Live Demo & Repository

- **Live Demo**: `https://swapnit18.github.io/Scroll-Driven-Hero-Section-Animation/` *(or Vercel / Netlify link)*
- **GitHub Repository**: https://github.com/SWapnit18/Scroll-Driven-Hero-Section-Animation

---

## Deployment Instructions

### Deploy to GitHub Pages:
1. In `vite.config.js`, set `base: '/<repo-name>/'`.
2. Run `npm run build`.
3. Push the `dist` directory or use GitHub Actions workflow for automatic deployment.

### Deploy to Vercel / Netlify:
- Connect your GitHub repository.
- Build command: `npm run build`
- Output directory: `dist`

---

## Submission Checklist Verification

- [x] Hero section occupies the initial viewport (above the fold)
- [x] Letter-spaced `W E L C O M E   I T Z F I Z Z` headline
- [x] Initial headline fade + translation animation on load
- [x] Staggered initial load animation for 3 hero statistic cards
- [x] High-resolution, premium vehicle visual asset
- [x] Central visual strictly driven by user scroll progress (No autoplay)
- [x] GSAP ScrollTrigger with smooth scrub interpolation (`scrub: 1`)
- [x] Hero pinned during scroll trajectory
- [x] Natural and smooth reverse scrolling
- [x] Impact Section (`OUR IMPACT`) with 3 benchmark cards
- [x] Final Call to Action (`READY TO MOVE FORWARD?`) with interactive CTA
- [x] Minimal editorial Navbar with desktop & mobile drawer support
- [x] Responsive on 320px, 375px, 425px, 768px, 1024px, 1440px+
- [x] Production build verified and passed with zero errors
