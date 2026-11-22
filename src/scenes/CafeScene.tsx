import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const rainSeeds = Array.from({length: 48}, (_, i) => ({
  x: i < 24 ? 18 + ((i * 47) % 120) : 704 + ((i * 53) % 228),
  y: (i * 139) % 1540,
  length: 18 + (i % 5) * 5,
  speed: 3.2 + (i % 4) * 0.55,
  opacity: 0.2 + (i % 4) * 0.09,
}));

export const CafeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const camera = interpolate(frame, [0, 210, 239], [1, 1.04, 1.04], {extrapolateRight: 'clamp'});
  const lampPulse = 0.78 + Math.sin(seconds * 1.8) * 0.08;
  const guestArrival = spring({frame: frame - 34, fps, config: {damping: 20, stiffness: 62, mass: 1.1}});
  const bellPulse = interpolate(frame, [42, 48, 55, 62, 69], [0, 0.85, 0.15, 0.65, 0.12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#15120f', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${camera})`, transformOrigin: '68% 54%'}}>
        <Img src={staticFile('cafe.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>

      {/* Vector-style rain: separate streaks, staggered and restricted to the glass. */}
      {rainSeeds.map((drop, i) => {
        const y = (drop.y + frame * drop.speed) % 1680;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: drop.x,
            top: y,
            width: 2,
            height: drop.length,
            borderRadius: 4,
            background: 'rgba(196,218,224,0.58)',
            opacity: drop.opacity,
            transform: 'rotate(8deg)',
          }} />
        );
      })}

      {/* SVGator-designed warm accents, animated here by Remotion. */}
      <div style={{
        position: 'absolute', left: 210, top: 205, width: 205, height: 56,
        borderRadius: '50%', background: 'rgba(255,185,105,0.15)',
        filter: 'blur(25px)', opacity: lampPulse,
      }} />
      <div style={{
        position: 'absolute', left: 535, top: 360, width: 125, height: 35,
        borderRadius: '50%', background: 'rgba(255,185,105,0.13)',
        filter: 'blur(18px)', opacity: lampPulse * 0.8,
      }} />

      {/* Steam curls above the coffee: restrained motion, no character distortion. */}
      <svg width="941" height="1672" viewBox="0 0 941 1672" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        {[0, 1, 2].map((i) => {
          const drift = Math.sin(seconds * 2.1 + i * 1.2) * 5;
          const lift = (frame * 0.55 + i * 18) % 28;
          const x = 394 + i * 24 + drift;
          return <path key={i}
            d={`M ${x} ${1122 - lift} C ${x - 8} ${1104 - lift}, ${x + 10} ${1085 - lift}, ${x + 2} ${1063 - lift}`}
            fill="none" stroke="rgba(250,218,175,0.72)" strokeWidth="3" strokeLinecap="round" />;
        })}
      </svg>

      {/* Bell glint marks the arrival beat; no fake walking or face deformation. */}
      <div style={{
        position: 'absolute', left: 878, top: 472, width: 12, height: 12,
        borderRadius: '50%', background: 'rgba(255,224,164,0.9)',
        opacity: bellPulse,
        transform: `scale(${0.75 + guestArrival * 0.2 + bellPulse * 0.25})`,
        filter: 'blur(1px)',
      }} />
    </AbsoluteFill>
  );
};
