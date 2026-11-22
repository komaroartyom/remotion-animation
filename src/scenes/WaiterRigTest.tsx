import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';

const W = 941;
const H = 1672;

const FullCanvasLayer: React.FC<{src: string; children?: React.ReactNode; style?: React.CSSProperties}> =
  ({src, children, style}) => (
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, ...style}}>
      <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: W, height: H}} />
      {children}
    </div>
  );

export const WaiterRigTest: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = Math.sin((frame / 24) * (2 * Math.PI / 3.8));
  const leftShoulder = 1.0 * phase;
  const leftElbow = -1.5 * phase;
  const leftPalm = 0.7 * phase;
  const rightShoulder = -0.7 * phase;
  const rightElbow = 1.2 * phase;
  const rightPalm = -0.5 * phase;

  return (
    <AbsoluteFill style={{backgroundColor: '#15120f', overflow: 'hidden'}}>
      <Img src={staticFile('waiter-rig/background_repaired.png')}
        style={{position: 'absolute', inset: 0, width: W, height: H}} />
      <FullCanvasLayer src="waiter-rig/upper_arm_left.png"
        style={{transform: `rotate(${leftShoulder}deg)`, transformOrigin: '78px 1025px'}}>
        <FullCanvasLayer src="waiter-rig/forearm_left.png"
          style={{transform: `rotate(${leftElbow}deg)`, transformOrigin: '43px 1190px'}}>
          <FullCanvasLayer src="waiter-rig/hand_left.png"
            style={{transform: `rotate(${leftPalm}deg)`, transformOrigin: '218px 1438px'}} />
        </FullCanvasLayer>
      </FullCanvasLayer>
      <FullCanvasLayer src="waiter-rig/upper_arm_right.png"
        style={{transform: `rotate(${rightShoulder}deg)`, transformOrigin: '252px 1015px'}}>
        <FullCanvasLayer src="waiter-rig/forearm_right.png"
          style={{transform: `rotate(${rightElbow}deg)`, transformOrigin: '330px 1195px'}}>
          <FullCanvasLayer src="waiter-rig/hand_right.png"
            style={{transform: `rotate(${rightPalm}deg)`, transformOrigin: '432px 1410px'}} />
        </FullCanvasLayer>
      </FullCanvasLayer>
    </AbsoluteFill>
  );
};