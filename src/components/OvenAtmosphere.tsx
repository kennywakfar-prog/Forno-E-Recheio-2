import React, { useMemo } from 'react';

export const OvenAtmosphere: React.FC = () => {
  // Generate 24 embers with different positions, sizes, and delays
  const embers = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.3 + Math.sin(i) * 10 + 100) % 98}%`,
      delay: `${(i * 0.7) % 8}s`,
      duration: `${6 + (i % 5) * 1.5}s`,
      size: `${2 + (i % 4) * 1.5}px`,
      color: i % 3 === 0 ? '#FFA238' : i % 3 === 1 ? '#FF5E1A' : '#F59E0B',
      blur: i % 2 === 0 ? '1px' : '0px',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top warm radial oven glow */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(255, 94, 26, 0.45) 0%, rgba(255, 162, 56, 0.2) 50%, transparent 80%)'
        }}
      />

      {/* Middle side glow */}
      <div 
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 94, 26, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* Subtle bottom ember glow */}
      <div 
        className="absolute -bottom-40 left-1/4 w-[700px] h-[400px] rounded-full blur-[150px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255, 60, 0, 0.3) 0%, transparent 75%)'
        }}
      />

      {/* Floating 220°C embers & sparks */}
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="absolute rounded-full"
          style={{
            left: ember.left,
            bottom: '-20px',
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 8px ${ember.color}`,
            filter: `blur(${ember.blur})`,
            animation: `emberFloat ${ember.duration} linear infinite`,
            animationDelay: ember.delay,
          }}
        />
      ))}
    </div>
  );
};
