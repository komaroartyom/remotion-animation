import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Cafe3D: React.FC = () => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const cameraZ = 8 - interpolate(f, [0, 191], [0, 0.32], clamp);
  return (
    <ThreeCanvas width={width} height={height} camera={{position: [0, 2.25, cameraZ], fov: 48}} style={{position: 'absolute', inset: 0, backgroundColor: '#101722'}}>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#b9c9dc', '#21161a', 0.65]} />
      <spotLight position={[-2.7, 4.7, 1.5]} angle={0.62} penumbra={0.8} intensity={95} color="#ffc77d" castShadow />
      <pointLight position={[2.5, 2.5, -2.2]} intensity={18} color="#d48b52" />
      <mesh position={[0, 1.7, -3.4]}><boxGeometry args={[7, 4.2, 0.22]} /><meshStandardMaterial color="#28242a" roughness={0.92} /></mesh>
      <mesh position={[0, 0, -3.25]}><boxGeometry args={[3.35, 2.45, 0.05]} /><meshStandardMaterial color="#101d2b" metalness={0.18} roughness={0.22} /></mesh>
      <mesh position={[0, 0, -3.19]}><boxGeometry args={[0.055, 2.45, 0.06]} /><meshStandardMaterial color="#806044" roughness={0.48} /></mesh>
      <mesh position={[0, 0, -3.18]}><boxGeometry args={[3.35, 0.055, 0.06]} /><meshStandardMaterial color="#806044" roughness={0.48} /></mesh>
      <mesh position={[-1.8, 0.7, -3.05]}><boxGeometry args={[0.35, 1.05, 0.12]} /><meshStandardMaterial color="#d6a56e" emissive="#a35d2d" emissiveIntensity={0.22} /></mesh>
      <mesh position={[0, -1.05, -0.2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[9, 11]} /><meshStandardMaterial color="#35272a" roughness={0.38} metalness={0.12} /></mesh>
      {Array.from({length: 9}, (_, i) => <mesh key={i} position={[-3.8 + i * 0.95, 0.5, -3.12]} rotation={[0, 0, 0.08]}><boxGeometry args={[0.018, 0.55 + (i % 3) * 0.16, 0.018]} /><meshBasicMaterial color="#a8d4e7" transparent opacity={0.3 + (i % 2) * 0.16} /></mesh>)}
      <mesh position={[-2.15, -0.08, -0.1]}><boxGeometry args={[1.1, 0.12, 0.72]} /><meshStandardMaterial color="#68452f" roughness={0.38} /></mesh>
      <mesh position={[-2.15, -0.58, -0.1]}><boxGeometry args={[0.12, 0.92, 0.12]} /><meshStandardMaterial color="#392820" /></mesh>
      <mesh position={[-2.15, -0.58, 0.42]}><boxGeometry args={[0.12, 0.92, 0.12]} /><meshStandardMaterial color="#392820" /></mesh>
      <mesh position={[0.2, -0.12, -0.4]}><cylinderGeometry args={[0.035, 0.045, 0.16, 24]} /><meshStandardMaterial color="#f1e7d5" roughness={0.2} /></mesh>
      <mesh position={[0.2, -0.035, -0.4]}><cylinderGeometry args={[0.034, 0.034, 0.008, 24]} /><meshStandardMaterial color="#3c211a" /></mesh>
      <mesh position={[0.2, -0.23, -0.4]}><torusGeometry args={[0.045, 0.009, 8, 24]} /><meshStandardMaterial color="#e7d8c3" /></mesh>
      <mesh position={[0.2, -0.12, -0.4]}><torusGeometry args={[0.05, 0.008, 8, 24]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#f1e7d5" /></mesh>
      <mesh position={[0.2, -0.32, -0.4]}><boxGeometry args={[1.8, 0.07, 0.95]} /><meshStandardMaterial color="#765039" roughness={0.32} /></mesh>
      <mesh position={[0.2, -0.67, -0.4]}><boxGeometry args={[0.08, 0.7, 0.08]} /><meshStandardMaterial color="#392820" /></mesh>
      <mesh position={[0.98, -0.67, -0.4]}><boxGeometry args={[0.08, 0.7, 0.08]} /><meshStandardMaterial color="#392820" /></mesh>
      <mesh position={[-0.58, -0.67, -0.4]}><boxGeometry args={[0.08, 0.7, 0.08]} /><meshStandardMaterial color="#392820" /></mesh>
      <mesh position={[0.2, 1.25, -1.4]}><cylinderGeometry args={[0.025, 0.025, 0.75, 16]} /><meshStandardMaterial color="#35241c" /></mesh>
      <mesh position={[0.2, 0.84, -1.4]}><coneGeometry args={[0.32, 0.42, 32, 1, true]} /><meshStandardMaterial color="#d5a46d" side={2} emissive="#8b4c20" emissiveIntensity={0.18} /></mesh>
      <mesh position={[0.2, 0.6, -1.4]}><sphereGeometry args={[0.36, 24, 16]} /><meshBasicMaterial color="#e7a95f" transparent opacity={0.055} /></mesh>
    </ThreeCanvas>
  );
};

const WaiterIllustration: React.FC = () => {
  const f = useCurrentFrame();
  const breath = Math.sin(f / 13) * 2.2;
  const hand = interpolate(Math.sin(f / 18), [-1, 1], [0, 7]);
  return <svg viewBox="0 0 941 1672" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
    <defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .09 0"/></filter></defs>
    <g transform={`translate(0 ${breath})`} stroke="#17151a" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round">
      <path d="M600 760Q625 690 715 690Q815 690 842 780L855 1160H575Z" fill="#242b35"/>
      <path d="M681 715L728 780L779 715L797 1000H664Z" fill="#e9e0d2" strokeWidth="7"/>
      <path d="M715 770L730 788L748 770L759 970H705Z" fill="#7a343b" strokeWidth="5"/>
      <path d="M610 790Q560 850 568 1010L610 1080Q633 1084 640 1055L652 900" fill="#252c37"/>
      <path d={`M824 790Q865 840 850 980L810 1050Q785 1058 786 1028L795 900`} fill="#252c37"/>
      <path d="M667 700Q650 610 712 566Q786 538 829 613Q854 688 805 742Q748 792 690 736Z" fill="#d7a583"/>
      <path d="M657 645Q653 555 737 540Q833 544 845 644L815 621Q778 590 734 608Q695 621 671 674Z" fill="#342b2c"/>
      <path d="M689 674Q706 662 721 674M764 674Q782 661 800 674" fill="none" strokeWidth="7"/>
      <path d="M729 690L719 711L737 715" fill="none" strokeWidth="5"/>
      <path d="M712 737Q743 752 770 735" fill="none" stroke="#81564b" strokeWidth="5"/>
      <path d="M606 1150L592 1395L578 1540H662L693 1310L731 1540H815L789 1370L810 1150Z" fill="#171c25"/>
      <path d="M580 1530H668L678 1570H555Q545 1548 580 1530M730 1530H820L847 1570H720Z" fill="#0e1118"/>
      <path d={`M824 1000Q875 1005 888 ${1050 + hand}L900 1120Q890 1140 870 1122L820 1050`} fill="#d7a583" strokeWidth="8"/>
      <path d="M868 1110Q842 1080 815 1090" fill="none" strokeWidth="7"/>
    </g>
    <rect width="941" height="1672" filter="url(#grain)" opacity=".12"/>
  </svg>;
};

export const CafeTrial: React.FC = () => {
  const f = useCurrentFrame();
  const titleOpacity = interpolate(f, [0, 18, 172, 191], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: '#101722', overflow: 'hidden'}}>
    <Cafe3D />
    <WaiterIllustration />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(5,8,15,.25),transparent 35%,rgba(5,7,12,.48))', pointerEvents: 'none'}} />
    <div style={{position: 'absolute', left: 48, right: 48, bottom: 130, color: '#f3e4ca', textAlign: 'center', fontFamily: 'Georgia,serif', fontSize: 34, lineHeight: 1.3, textShadow: '0 3px 16px #000', opacity: titleOpacity}}>
      Кафе почти закрылось. Дождь всё не прекращался.
    </div>
  </AbsoluteFill>;
};
