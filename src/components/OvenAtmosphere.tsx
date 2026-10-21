import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  swingSpeed: number;
  swingRange: number;
  timeOffset: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
}

export const OvenAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse drift tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseInfluence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseInfluence = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Palette of 220°C oven embers
    const emberColors = [
      { fill: '#FF5E1A', glow: 'rgba(255, 94, 26, 0.8)' },
      { fill: '#FFA238', glow: 'rgba(255, 162, 56, 0.9)' },
      { fill: '#FFB800', glow: 'rgba(255, 184, 0, 0.8)' },
      { fill: '#FF3B00', glow: 'rgba(255, 59, 0, 0.7)' },
      { fill: '#FFE600', glow: 'rgba(255, 230, 0, 0.9)' },
      { fill: '#F97316', glow: 'rgba(249, 115, 22, 0.75)' },
    ];

    // Create 60 thermal sparks & embers
    const particleCount = Math.min(65, Math.floor(width / 22));
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => {
      const palette = emberColors[Math.floor(Math.random() * emberColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 1.2 + 0.6), // Constant upward heat draft
        size: Math.random() * 2.8 + 1.2,
        color: palette.fill,
        glowColor: palette.glow,
        alpha: Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.04 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.008,
        swingRange: Math.random() * 1.8 + 0.6,
        timeOffset: Math.random() * 100,
      };
    });

    // Create 40 twinkling cosmic stars for the delivery theme
    const stars: Star[] = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw twinkling cosmic stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha =
          star.alpha * (0.6 + 0.4 * Math.sin(frame * star.twinkleSpeed));

        ctx.fillStyle = `rgba(255, 245, 220, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Decay mouse influence
      if (mouseInfluence > 0) {
        mouseInfluence *= 0.98;
      }

      // 3. Draw and update glowing 220°C embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Horizontal sinusoidal thermal draft
        const wave = Math.sin(frame * p.swingSpeed + p.timeOffset) * p.swingRange;
        p.x += p.vx + wave * 0.3;
        p.y += p.vy;

        // Interaction with mouse draft
        if (mouseInfluence > 0.05) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const force = ((180 - dist) / 180) * 0.6 * mouseInfluence;
            p.x += (dx / dist) * force * 2;
            p.y -= force * 1.5; // Upward draft
          }
        }

        // Wrap around top or sides
        if (p.y < -20) {
          p.y = height + Math.random() * 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Pulsating glowing alpha
        const pulse = Math.sin(frame * p.pulseSpeed + p.pulseOffset);
        const dynamicAlpha = Math.max(0.1, Math.min(1, p.baseAlpha + pulse * 0.25));

        // Draw radial glow for the ember
        ctx.save();
        ctx.globalAlpha = dynamicAlpha;
        
        // Outer glow
        const glowRadius = p.size * 3.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, p.glowColor);
        grad.addColorStop(0.4, p.color);
        grad.addColorStop(1, 'rgba(255, 94, 26, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Hot glowing core
        ctx.fillStyle = '#FFF8E7';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Canvas for Real-Time Sparks, Thermal Drift & Twinkling Stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Top warm radial oven glow behind logo and header */}
      <div 
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[980px] h-[550px] rounded-full blur-[140px] opacity-40 animate-pulse pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 94, 26, 0.5) 0%, rgba(255, 162, 56, 0.25) 50%, transparent 80%)',
          animationDuration: '4s'
        }}
      />

      {/* Side oven hearth warmth */}
      <div 
        className="absolute top-1/4 -right-48 w-[650px] h-[650px] rounded-full blur-[170px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 94, 26, 0.4) 0%, rgba(255, 162, 56, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* Bottom glowing coals heat bed */}
      <div 
        className="absolute -bottom-48 left-1/3 -translate-x-1/2 w-[850px] h-[450px] rounded-full blur-[160px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 60, 0, 0.35) 0%, rgba(255, 162, 56, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* Thermal Heat Shimmer Gradient at the very bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(to top, rgba(255, 94, 26, 0.3) 0%, transparent 100%)'
        }}
      />
    </div>
  );
};
