import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const rainSeeds = Array.from({length: 42}, (_, i) => ({
  x: i < 34 ? 6 + ((i * 29) % 104) : (i % 2 ? 617 + ((i * 7) % 19) : 852 + ((i * 3) % 11)),
  y: (i * 137) % 1450 + 40,
  length: 18 + (i % 4) * 5,
  speed: 3.2 + (i % 4) * 0.55,
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
  const blinkA = interpolate(frame, [47, 50, 54, 57, 136, 139, 143, 146], [0, 1, 1, 0, 0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#15120f', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${camera})`, transformOrigin: '68% 54%'}}>
        <Img src={staticFile('cafe.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <svg width="941" height="1672" viewBox="0 0 941 1672" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <defs><clipPath id="exterior-glass">
          <path d="M0 45 L115 92 L115 1425 L0 1390 Z" />
          <path d="M615 575 L637 575 L637 1005 L615 1005 Z" />
          <path d="M852 575 L864 575 L864 1005 L852 1005 Z" />
        </clipPath></defs>
        <g clipPath="url(#exterior-glass)">
          {rainSeeds.map((drop, i) => {
            const y = (drop.y + frame * drop.speed) % 1680;
            return <line key={i} x1={drop.x} y1={y} x2={drop.x + 3} y2={y + drop.length}
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
        <ellipse cx="341" cy="801" rx="15" ry={Math.max(1,34*blinkA)} fill="#ff894b" opacity={blinkA} />
        <path d="M 328 801 Q 341 808 354 801" fill="none" stroke="#160b0c" strokeWidth="4" strokeLinecap="round" opacity={blinkA} />
      </svg>
      <div style={{position:'absolute',left:878,top:472,width:12,height:12,borderRadius:'50%',background:'rgba(255,224,164,0.9)',opacity:bellPulse,transform:`scale(${0.75+guestArrival*0.2+bellPulse*0.25})`,filter:'blur(1px)'}} />
    </AbsoluteFill>
  );
};
