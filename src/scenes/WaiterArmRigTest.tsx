import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

const W = 941;
const H = 1672;
const ELBOW = {x: 315, y: 1210};
const SHOULDER = {x: 285, y: 955};
const WRIST = {x: 405, y: 1408};

export const WaiterArmRigTest: React.FC = () => {
  const frame = useCurrentFrame();
  // A deliberately small first test range: the forearm pivots at the elbow.
  const angle = Math.sin((frame / 72) * Math.PI * 2) * 6;
  const radians = (angle * Math.PI) / 180;
  const dx = WRIST.x - ELBOW.x;
  const dy = WRIST.y - ELBOW.y;
  const wristNow = {
    x: ELBOW.x + dx * Math.cos(radians) - dy * Math.sin(radians),
    y: ELBOW.y + dx * Math.sin(radians) + dy * Math.cos(radians),
  };

  return (
    <AbsoluteFill style={{backgroundColor: '#292630', overflow: 'hidden'}}>
      <Img
        src={staticFile('waiter_arm_forearm_hand.png')}
        style={{
          position: 'absolute', left: 0, top: 0, width: W, height: H,
          transform: `rotate(${angle}deg)`,
          transformOrigin: `${ELBOW.x}px ${ELBOW.y}px`,
        }}
      />
      <Img
        src={staticFile('waiter_arm_upper.png')}
        style={{position: 'absolute', left: 0, top: 0, width: W, height: H}}
      />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
        <path d={`M ${SHOULDER.x} ${SHOULDER.y} L ${ELBOW.x} ${ELBOW.y} L ${wristNow.x} ${wristNow.y}`}
          fill="none" stroke="#20d9e8" strokeWidth="5" strokeLinecap="round" />
        {[SHOULDER, ELBOW, wristNow].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="10" fill={i === 1 ? '#ffca42' : '#f7f7f7'} stroke="#17141d" strokeWidth="4" />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
