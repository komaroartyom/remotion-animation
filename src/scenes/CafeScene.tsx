import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const rainSeeds = Array.from({length: 22}, (_, i) => ({
  x: 24 + ((i * 37) % 78),
  y: (i * 97) % 440 + 30,
  length: 15 + (i % 4) * 4,
  speed: 4 + (i % 3),
  opacity: 0.24 + (i % 4) * 0.07,
}));

export const CafeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const camera = interpolate(frame, [0, 210, 239], [1, 1.04, 1.04], {extrapolateRight: 'clamp'});
  const lampPulse = 0.78 + Math.sin(seconds * 1.8) * 0.08;
  const guestArrival = spring({frame: frame - 34, fps, config: {damping: 20, stiffness: 62, mass: 1.1}});
  const bellPulse = interpolate(frame, [42, 48, 55, 62, 69], [0, 0.85, 0.15, 0.65, 0.12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blinkA = interpolate(frame, [50, 53, 56, 59, 136, 139, 142, 145], [0, 1, 1, 0, 0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#15120f', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${camera})`, transformOrigin: '68% 54%'}}>
        <Img src={staticFile('cafe.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <svg width="941" height="1672" viewBox="0 0 941 1672" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <defs><clipPath id="exterior-glass">
          <path d="M20 35 L110 72 L110 215 L20 180 Z" />
          <path d="M20 250 L110 285 L110 465 L20 430 Z" />
        </clipPath></defs>
        <g clipPath="url(#exterior-glass)">
          {rainSeeds.map((drop, i) => {
            const y = (drop.y + frame * drop.speed) % 1680;
            return <line key={i} x1={drop.x} y1={y} x2={drop.x - Math.round(drop.length * 0.16)} y2={y + drop.length}
              stroke="rgba(196,218,224,0.66)" strokeWidth="2" strokeLinecap="round" opacity={drop.opacity} />;
          })}
        </g>
      </svg>
      <div style={{position:'absolute',left:210,top:205,width:205,height:56,borderRadius:'50%',background:'rgba(255,185,105,0.15)',filter:'blur(25px)',opacity:lampPulse}} />
      <div style={{position:'absolute',left:535,top:360,width:125,height:35,borderRadius:'50%',background:'rgba(255,185,105,0.13)',filter:'blur(18px)',opacity:lampPulse*0.8}} />
      {/* Short steam wisps sit just above the cup rims; they do not cross the yellow surprise marks. */}
      <svg width="941" height="1672" viewBox="0 0 941 1672" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        {[0,1,2].map((i) => {
          const phase = seconds*1.55+i*1.35;
          const lift = (frame*0.45+i*4)%8;
          const x = 450+i*35+Math.sin(phase)*2;
          return <path key={i} d={`M ${x} ${690-lift} C ${x-4} ${683-lift}, ${x+5} ${676-lift}, ${x+2} ${666-lift}`}
            fill="none" stroke="rgba(235,240,242,0.62)" strokeWidth="2" strokeLinecap="round" />;
        })}
      </svg>
      <svg width="941" height="1672" viewBox="0 0 941 1672" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <ellipse cx="343" cy="800" rx="10" ry={Math.max(1,27*blinkA)} fill="#f87649" opacity={blinkA} />
        <path d="M 334 802 Q 343 808 352 802" fill="none" stroke="#140c12" strokeWidth="3" strokeLinecap="round" opacity={blinkA} />
      </svg>
      <div style={{position:'absolute',left:878,top:472,width:12,height:12,borderRadius:'50%',background:'rgba(255,224,164,0.9)',opacity:bellPulse,transform:`scale(${0.75+guestArrival*0.2+bellPulse*0.25})`,filter:'blur(1px)'}} />
    </AbsoluteFill>
  );
};
