import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';

const wood = (color:string, roughness=0.72) => <meshStandardMaterial color={color} roughness={roughness} />;
const CafeModule: React.FC<{x:number;kind:0|1|2}> = ({x,kind}) => {
  const palette = [
    {wall:'#33251f', trim:'#a87949', floor:'#3c2924', seat:'#674437', glass:'#20394c'},
    {wall:'#34383b', trim:'#8c8d88', floor:'#303438', seat:'#4b5359', glass:'#263f50'},
    {wall:'#34252b', trim:'#c69a5b', floor:'#4a3336', seat:'#713f42', glass:'#293c4a'}
  ][kind];
  return <group position={[x,0,0]}>
    <mesh position={[0,2,-1.8]}><boxGeometry args={[5.1,4.1,.22]}/>{wood(palette.wall)}</mesh>
    <mesh position={[0,-.12,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[5.1,4.7]}/><meshStandardMaterial color={palette.floor} roughness={kind===1?.25:.62} metalness={kind===1?.22:.04}/></mesh>
    {[-1.65,0,1.65].map((wx,i)=><group key={i} position={[wx,2.05,-1.64]}>
      {kind===2 ? <mesh position={[0,.02,0]}><cylinderGeometry args={[.83,.83,.14,48,1,true,0,Math.PI]}/><meshStandardMaterial color={palette.trim} roughness={.5}/></mesh> : null}
      <mesh><boxGeometry args={[1.35,2.55,.08]}/><meshStandardMaterial color={palette.glass} metalness={.25} roughness={.2}/></mesh>
      <mesh position={[0,0,.055]}><boxGeometry args={[.075,2.7,.08]}/>{wood(palette.trim,.42)}</mesh>
      <mesh position={[0,0,.055]}><boxGeometry args={[1.42,.075,.08]}/>{wood(palette.trim,.42)}</mesh>
      <mesh position={[0,0,.07]}><boxGeometry args={[.04,2.45,.04]}/>{wood(palette.trim,.42)}</mesh>
    </group>)}
    {[-2.25,2.25].map((px,i)=><mesh key={i} position={[px,2, -.85]}><boxGeometry args={[.16,4,.28]}/>{wood(palette.trim)}</mesh>)}
    <group position={[-1.1,.45,.35]}>
      <mesh position={[0,.55,0]}><boxGeometry args={[1.5,.16,.78]}/>{wood(palette.trim)}</mesh>
      {[ -.58,.58].map((v,i)=><mesh key={i} position={[v,.26,0]}><boxGeometry args={[.12,.55,.12]}/>{wood('#251a18')}</mesh>)}
      <mesh position={[0,.9,-.22]}><boxGeometry args={[1.5,.72,.2]}/><meshStandardMaterial color={palette.seat} roughness={.9}/></mesh>
      <mesh position={[0,.9,.13]}><boxGeometry args={[1.5,.72,.2]}/><meshStandardMaterial color={palette.seat} roughness={.9}/></mesh>
    </group>
    <group position={[.9,.55,.15]}>
      <mesh position={[0,.62,0]}><cylinderGeometry args={[.62,.62,.13,40]}/>{wood(palette.trim,.38)}</mesh>
      {[0,1,2].map(i=><mesh key={i} position={[Math.cos(i*2.1)*.4,.28,Math.sin(i*2.1)*.4]}><cylinderGeometry args={[.045,.055,.55,12]}/>{wood('#211a18')}</mesh>)}
      <mesh position={[0,.76,0]}><cylinderGeometry args={[.09,.12,.17,24]}/><meshStandardMaterial color="#e7ddd0" roughness={.2}/></mesh>
      <mesh position={[0,.86,0]}><cylinderGeometry args={[.08,.08,.015,24]}/><meshStandardMaterial color="#4b2924"/></mesh>
    </group>
    <mesh position={[0,3.65,-1.35]}><cylinderGeometry args={[.045,.045,.85,12]}/>{wood(palette.trim)}</mesh>
    <mesh position={[0,3.15,-1.35]}><coneGeometry args={[.43,.48,32,1,true]}/><meshStandardMaterial color={kind===1?'#d4b58b':'#e4b76d'} emissive="#c77b36" emissiveIntensity={.55} side={THREE.DoubleSide}/></mesh>
    <pointLight position={[0,2.9,-.8]} color="#ffbf78" intensity={kind===1?3:5} distance={5}/>
    {kind===1 && <group>{Array.from({length:7},(_,i)=><mesh key={i} position={[-2.15+i*.7,.1,-1.55]}><boxGeometry args={[.045,3.3,.16]}/><meshStandardMaterial color="#77736d" roughness={.95}/></mesh>)}</group>}
    {kind===2 && <group>{[-1.65,0,1.65].map((wx,i)=><mesh key={i} position={[wx,2.02,-1.55]}><torusGeometry args={[.72,.065,10,48,Math.PI]}/><meshStandardMaterial color="#d0a86b" metalness:.45 roughness:.3/></mesh>)}</group>}
    <mesh position={[0,1.2,-1.62]}><boxGeometry args={[4.8,.055,.055]}/>{wood(palette.trim)}</mesh>
  </group>;
};

const CharacterCard: React.FC<{x:number;variant:0|1|2}> = ({x,variant}) => {
 const f=useCurrentFrame(); const bob=Math.sin(f/9+variant)*2;
 const styles=[
  {head:'#efbd99',hair:'#34251f',coat:'#263d59',shirt:'#f1e8d8',line:'#17171b'},
  {head:'#dca783',hair:'#2a2425',coat:'#35413d',shirt:'#e8dfcb',line:'#171719'},
  {head:'#f0c5a1',hair:'#4a3428',coat:'#4b3039',shirt:'#f2e8d7',line:'#181619'}
 ][variant];
 const waiter = (cx:number, scale:number) => <g transform={`translate(${cx} ${bob}) scale(${scale})`} stroke={styles.line} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
  <path d="M-43 135 Q-58 90 -35 65 Q-10 48 28 64 Q55 82 48 142 L40 225H-48Z" fill={styles.coat}/>
  <path d="M-22 68L0 98L22 68L25 160H-25Z" fill={styles.shirt}/>
  <path d="M-8 100L0 111L9 100L12 157H-12Z" fill="#8b4444"/>
  <path d="M-37 78Q-64 98 -56 153L-39 168L-24 126M39 78Q63 105 56 151L42 168L26 126" fill={styles.coat}/>
  <path d="M-26 61Q-37 12 -7 0Q32 -8 39 31Q42 69 9 78Q-17 77 -26 61Z" fill={styles.head}/>
  <path d="M-29 33Q-34 -9 2 -12Q39 -8 42 30L25 17Q2 3 -20 29Z" fill={styles.hair}/>
  <path d="M-17 39Q-8 33 -1 39M14 39Q23 33 29 39" fill="none" strokeWidth="5"/>
  <ellipse cx="-8" cy="42" rx="3.4" ry="5" fill="#181619" stroke="none"/><ellipse cx="21" cy="42" rx="3.4" ry="5" fill="#181619" stroke="none"/>
  <path d="M5 45L0 57L9 59" fill="none" strokeWidth="4"/>
  <path d={variant===1?"M-7 68Q8 58 22 68":"M-7 68Q8 76 22 67"} fill="none" stroke="#754b43" strokeWidth="4"/>
  <path d="M-35 223L-39 282H-8L1 233L12 282H42L32 223Z" fill="#26232a"/>
  <path d="M-43 281H-6L-4 295H-53Q-56 288 -43 281M13 281H45L57 295H10Z" fill="#18181c"/>
 </g>;
 const guest = (cx:number, scale:number) => <g transform={`translate(${cx} 0) scale(${scale})`} stroke="#19181a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
  <path d="M-43 135Q-58 90 -35 65Q-10 48 28 64Q55 82 48 142L40 225H-48Z" fill="#4a4b50"/>
  <path d="M-22 68L0 98L22 68L25 160H-25Z" fill="#c9b99e"/>
  <path d="M-26 61Q-37 12 -7 0Q32 -8 39 31Q42 69 9 78Q-17 77 -26 61Z" fill="#d4a98a"/>
  <path d="M-31 31Q-28 -12 5 -13Q42 -8 43 33L27 19Q0 0 -22 34Z" fill="#c2c0b7"/>
  <path d="M-17 39Q-8 33 -1 39M14 39Q23 33 29 39" fill="none" strokeWidth="5"/>
  <ellipse cx="-8" cy="42" rx="3.4" ry="5" fill="#181619" stroke="none"/><ellipse cx="21" cy="42" rx="3.4" ry="5" fill="#181619" stroke="none"/>
  <path d="M5 45L0 57L9 59M-7 68Q8 74 22 67" fill="none" stroke="#765047" strokeWidth="4"/>
  <path d="M-35 223L-39 282H-8L1 233L12 282H42L32 223Z" fill="#373941"/>
  <path d="M-43 281H-6L-4 295H-53Q-56 288 -43 281M13 281H45L57 295H10Z" fill="#18181c"/>
 </g>;
 return <g transform={`translate(${x} 0)`}>
   <rect x="-145" y="0" width="290" height="380" rx="18" fill="#f4ead8" stroke="#242126" strokeWidth="4"/>
   {waiter(-45,.78)}{guest(58,.72)}
   <path d="M-118 321H118" stroke="#c3ad91" strokeWidth="2"/>
   <text x="0" y="350" textAnchor="middle" fontSize="19" fontWeight="800" fill="#28232a">ПЕРСОНАЖ {variant+1}</text>
 </g>;
};

export const CafeConcepts: React.FC = () => {
 const f=useCurrentFrame();
 const cam=interpolate(f,[0,120],[13,12.2],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:'#17181c',overflow:'hidden'}}>
  <div style={{position:'absolute',top:28,left:0,right:0,textAlign:'center',color:'#f5e9d7',font:'bold 34px Georgia'}}>ПОСЛЕДНИЙ ПОСЕТИТЕЛЬ</div>
  <div style={{position:'absolute',top:76,left:0,right:0,textAlign:'center',color:'#d5b88e',font:'18px Arial'}}>3 процедурных 3D-интерьера · создано геометрией и материалами</div>
  <ThreeCanvas width={941} height={830} camera={{position:[0,5.6,cam],fov:43}} style={{position:'absolute',top:130,left:0,width:'100%',height:830,background:'#171b22'}}>
   <ambientLight intensity={.72}/><hemisphereLight args={['#c4d7e8','#241c1c',.8]}/>
   <directionalLight position={[-4,7,6]} intensity={2.2} castShadow/>
   <CafeModule x={-5.2} kind={0}/><CafeModule x={0} kind={1}/><CafeModule x={5.2} kind={2}/>
   <mesh position={[0,-.16,-.6]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[19,8]}/><meshStandardMaterial color="#101318" roughness={.45}/></mesh>
  </ThreeCanvas>
  <div style={{position:'absolute',top:920,left:0,right:0,textAlign:'center',color:'#f5e9d7',font:'bold 27px Georgia'}}>ТРИ ВАРИАНТА РИСОВКИ ПЕРСОНАЖЕЙ</div>
  <svg viewBox="0 0 941 430" style={{position:'absolute',left:0,right:0,bottom:0,width:'100%',height:430}}>
   <CharacterCard x={165} variant={0}/><CharacterCard x={470} variant={1}/><CharacterCard x={775} variant={2}/>
  </svg>
  <div style={{position:'absolute',top:180,left:12,color:'#fff',font:'bold 20px Arial',textShadow:'0 2px 4px #000'}}>1 · КЛАССИКА</div>
  <div style={{position:'absolute',top:180,left:'38%',color:'#fff',font:'bold 20px Arial',textShadow:'0 2px 4px #000'}}>2 · ЛОФТ</div>
  <div style={{position:'absolute',top:180,right:12,color:'#fff',font:'bold 20px Arial',textShadow:'0 2px 4px #000'}}>3 · АР-ДЕКО</div>
 </AbsoluteFill>;
};
