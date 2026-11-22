import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';

// Café scene test: preserve the supplied illustration while adding layered, eased motion.
// Place the source art at public/cafe.png before previewing/rendering.
export const CafeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const arrival = spring({frame: frame - 24, fps, config: {damping: 18, stiffness: 70, mass: 1.0}});
  const camera = interpolate(frame, [0, 210, 239], [1, 1.035, 1.035], {extrapolateRight: 'clamp'});
  const lamp = 0.94 + Math.sin(t * 1.8) * 0.035;
  const rainOpacity = interpolate(frame, [0, 12], [0, 0.42], {extrapolateRight: 'clamp'});
  const guestX = interpolate(arrival, [0, 1], [18, 0]);
  const guestScale = interpolate(arrival, [0, 1], [0.985, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: '#181513', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${camera})`, transformOrigin: '68% 55%'}}>
        <Img src={staticFile('cafe.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      {/* Atmospheric window rain — fine, staggered streaks, confined to the glazing. */}
      <AbsoluteFill style={{pointerEvents: 'none', opacity: rainOpacity}}>
        {Array.from({length: 42}, (_, i) => {
          const x = (i * 71 + 23) % 1080;
          const y = (i * 137 + frame * (3.2 + (i % 4) * 0.45)) % 1920;
          const inWindow = (x < 155 && y < 1240) || (x > 690 && y > 490 && y < 1350);
          return inWindow ? <div key={i} style={{
            position: 'absolute', left: x, top: y, width: 2, height: 17 + (i % 5) * 5,
            background: 'rgba(205,218,220,0.55)', borderRadius: 4,
            transform: 'rotate(8deg)', opacity: 0.25 + (i % 5) * 0.09,
          }} /> : null;
        })}
      </AbsoluteFill>
      {/* Warm lamp response is restrained, so it does not wash over the illustration. */}
      <div style={{
        position: 'absolute', left: '19%', top: '11%', width: '20%', height: '5%',
        borderRadius: '50%', background: 'rgba(255,174,72,0.12)',
        filter: 'blur(24px)', opacity: lamp,
      }} />
      {/* The original illustration stays intact; the arrival beat is expressed as a gentle camera emphasis. */}
      <div style={{
        position: 'absolute', right: '7%', bottom: '17%', width: 22, height: 22,
        borderRadius: '50%', background: 'rgba(255,205,132,0.65)',
        opacity: interpolate(frame, [35, 48, 60, 74], [0, 0.75, 0.15, 0.65], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        transform: `translateX(${guestX}px) scale(${guestScale})`,
        filter: 'blur(2px)',
      }} />
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => <CafeScene />;
