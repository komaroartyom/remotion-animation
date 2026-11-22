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
    {kind===2 && <group>{[-1.65,0,1.65].map((wx,i)=><mesh key={i} position={[wx,2.02,-1.55]}><torusGeometry args={[.72,.065,10,48,Math.PI]}/><meshStandardMaterial color="#d0a86b" metalness={.45} roughness={.3}/></mesh>)}</group>}
    <mesh position={[0,1.2,-1.62]}><boxGeometry args={[4.8,.055,.055]}/>{wood(palette.trim)}</mesh>
  </group>;
};

const CharacterCard: React.FC<{x:number;variant:0|1|2}> = ({x,variant}) => {
 const f=useCurrentFrame();
 const bob=Math.sin(f/9+variant)*2;
 const labels = ['РЕАЛИСТИЧНАЯ ИЛЛЮСТРАЦИЯ','КАРИКАТУРНЫЙ КОМИКС','АНИМЕ / ГРАФИЧНЫЙ СТИЛЬ'];
 return <g transform={\`translate(\${x} 0)\`}>
   <rect x="-145" y="0" width="290" height="380" rx="18" fill="#f4ead8" stroke="#242126" strokeWidth="4"/>
   {variant===0 && <g transform={\`translate(0 \${bob})\`}>
     <defs>
       <linearGradient id="realCoat" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#344b63"/><stop offset="1" stopColor="#182b40"/></linearGradient>
       <linearGradient id="realSkin" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f5d0b2"/><stop offset="1" stopColor="#c98769"/></linearGradient>
     </defs>
     <g stroke="#5c443b" strokeWidth="1.5" strokeLinejoin="round">
       <path d="M-111 225Q-119 173 -91 148Q-68 130 -42 147L-31 284H-116Z" fill="url(#realCoat)"/>
       <path d="M-87 151L-72 176L-57 151L-50 225H-95Z" fill="#eee5d8"/>
       <path d="M-73 176L-64 188L-55 176L-52 232H-77Z" fill="#9d4c43"/>
       <path d="M-102 164Q-120 190 -113 229L-100 237L-88 199M-43 164Q-25 190 -34 226L-48 237L-57 199" fill="none" stroke="url(#realCoat)" strokeWidth="13" strokeLinecap="round"/>
       <path d="M-91 145Q-101 112 -83 91Q-63 70 -43 93Q-30 113 -42 145Q-64 166 -91 145Z" fill="url(#realSkin)"/>
       <path d="M-94 119Q-100 85 -74 79Q-43 73 -35 106L-48 99Q-70 87 -88 119Z" fill="#352821"/>
       <path d="M-83 121Q-74 115 -68 121M-57 120Q-50 115 -44 120" fill="none" stroke="#49352d" strokeWidth="2.5"/>
       <ellipse cx="-73" cy="126" rx="2.4" ry="3.3" fill="#282321" stroke="none"/><ellipse cx="-50" cy="126" rx="2.4" ry="3.3" fill="#282321" stroke="none"/>
       <path d="M-62 128L-66 137L-59 139M-72 148Q-60 153 -49 146" fill="none" stroke="#9b5f51" strokeWidth="2"/>
       <path d="M-102 283L-105 309H-78L-69 285L-61 309H-34L-42 283Z" fill="#28272b"/>
       <path d="M-108 308H-77L-74 316H-116Q-118 312 -108 308M-61 308H-32L-24 316H-65Z" fill="#17191d"/>
     </g>
     <g stroke="#655047" strokeWidth="1.5" strokeLinejoin="round">
       <path d="M20 225Q13 173 38 151Q60 132 87 148L100 284H18Z" fill="#8a7460"/>
       <path d="M41 151L58 176L73 151L80 225H33Z" fill="#e6d6bf"/>
       <path d="M30 165Q13 189 23 228L37 237L47 198M86 165Q107 188 97 228L83 237L72 198" fill="none" stroke="#8a7460" strokeWidth="13" strokeLinecap="round"/>
       <path d="M39 146Q29 112 48 92Q68 72 88 96Q101 117 88 147Q62 164 39 146Z" fill="#e5b99b"/>
       <path d="M36 116Q38 83 66 82Q96 82 98 117L85 105Q61 91 42 122Z" fill="#bdb8ac"/>
       <path d="M47 121Q55 116 61 121M72 121Q80 116 86 121" fill="none" stroke="#5d514a" strokeWidth="2.5"/>
       <ellipse cx="56" cy="126" rx="2.4" ry="3.3" fill="#292522" stroke="none"/><ellipse cx="79" cy="126" rx="2.4" ry="3.3" fill="#292522" stroke="none"/>
       <path d="M68 129L64 138L71 140M55 148Q68 153 81 147" fill="none" stroke="#a36f5e" strokeWidth="2"/>
       <path d="M30 283L28 309H54L62 285L72 309H98L91 283Z" fill="#55515a"/>
       <path d="M25 308H55L58 316H19Q17 312 25 308M72 308H100L108 316H69Z" fill="#242328"/>
     </g>
   </g>}
   {variant===1 && <g transform={\`translate(0 \${bob})\`} stroke="#211c1c" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
     <g>
       <path d="M-113 222Q-130 164 -95 147Q-65 130 -37 157L-30 282H-119Z" fill="#e3a52e"/>
       <path d="M-91 154L-74 182L-55 154L-49 231H-99Z" fill="#fff0c9"/>
       <path d="M-111 173Q-133 190 -118 238L-96 247L-83 200M-39 173Q-16 189 -32 238L-53 246L-67 199" fill="none" strokeWidth="18"/>
       <path d="M-96 143Q-116 105 -91 77Q-66 48 -37 76Q-17 104 -37 143Q-66 171 -96 143Z" fill="#f0b98c"/>
       <path d="M-101 112Q-109 65 -69 62Q-31 59 -29 108L-47 94Q-73 80 -94 119Z" fill="#29201e"/>
       <path d="M-88 113Q-75 102 -63 113M-53 112Q-41 102 -31 113" fill="none" strokeWidth="5"/>
       <ellipse cx="-74" cy="119" rx="5" ry="7" fill="#211c1c" stroke="none"/><ellipse cx="-42" cy="119" rx="5" ry="7" fill="#211c1c" stroke="none"/>
       <path d="M-60 123L-67 137L-54 139M-80 151Q-62 166 -43 149" fill="none" stroke="#7e4035" strokeWidth="5"/>
       <path d="M-109 281L-112 308H-77L-67 286L-58 308H-25L-35 281Z" fill="#37323a"/>
       <path d="M-118 308H-77L-73 319H-128Q-132 313 -118 308M-58 308H-23L-12 319H-64Z" fill="#211e22"/>
     </g>
     <g>
       <path d="M21 223Q7 165 43 150Q75 133 102 158L110 282H18Z" fill="#586c55"/>
       <path d="M45 154L62 181L80 154L84 229H37Z" fill="#f4e6ca"/>
       <path d="M26 174Q4 194 19 239L40 247L50 200M99 174Q122 193 107 239L86 247L77 200" fill="none" strokeWidth="18"/>
       <path d="M37 144Q17 108 41 80Q68 51 96 80Q116 110 94 145Q67 169 37 144Z" fill="#dba47e"/>
       <path d="M33 111Q35 63 73 65Q111 68 108 117L89 98Q65 83 42 119Z" fill="#c7c2b6"/>
       <path d="M43 114Q55 103 66 114M78 113Q90 102 101 113" fill="none" strokeWidth="5"/>
       <ellipse cx="55" cy="121" rx="5" ry="7" fill="#211c1c" stroke="none"/><ellipse cx="89" cy="120" rx="5" ry="7" fill="#211c1c" stroke="none"/>
       <path d="M72 124L66 138L79 140M51 151Q69 165 91 148" fill="none" stroke="#875849" strokeWidth="5"/>
       <path d="M28 281L26 308H60L69 285L78 308H111L103 281Z" fill="#3b3b42"/>
       <path d="M21 308H60L64 319H13Q9 313 21 308M78 308H113L124 319H72Z" fill="#211e22"/>
     </g>
   </g>}
   {variant===2 && <g transform={\`translate(0 \${bob})\`} stroke="#25202b" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
     <g>
       <path d="M-111 225L-99 160L-70 143L-42 160L-31 286H-119Z" fill="#493c66"/>
       <path d="M-94 157L-72 186L-52 157L-48 239H-98Z" fill="#f8f0e7"/>
       <path d="M-100 163L-119 223L-103 240L-83 195M-43 163L-24 223L-41 240L-60 195" fill="none" stroke="#493c66" strokeWidth="13"/>
       <path d="M-90 145Q-105 110 -88 87Q-70 68 -49 87Q-34 111 -45 145Q-66 160 -90 145Z" fill="#f2c7a9"/>
       <path d="M-94 112L-108 79L-83 91L-75 61L-57 84L-36 72L-42 111L-57 99L-78 102Z" fill="#25202b"/>
       <path d="M-86 119Q-76 108 -65 117M-59 117Q-49 107 -40 117" fill="none" strokeWidth="3"/>
       <path d="M-83 120Q-74 114 -67 120Q-74 129 -83 120M-57 120Q-49 113 -42 119Q-50 129 -57 120" fill="#fff" stroke="#25202b" strokeWidth="1.5"/>
       <circle cx="-74" cy="121" r="3" fill="#704b9d" stroke="none"/><circle cx="-50" cy="120" r="3" fill="#704b9d" stroke="none"/>
       <path d="M-62 124L-67 136L-58 138M-76 148Q-62 155 -48 145" fill="none" stroke="#a45e67" strokeWidth="2.5"/>
       <path d="M-106 284L-111 314H-81L-69 286L-57 314H-28L-37 284Z" fill="#282630"/>
       <path d="M-114 313H-80L-77 320H-121Q-124 316 -114 313M-57 313H-27L-18 320H-62Z" fill="#17171d"/>
     </g>
     <g>
       <path d="M22 225L33 159L63 143L92 159L105 286H18Z" fill="#315e69"/>
       <path d="M39 157L62 185L83 157L87 239H35Z" fill="#f5eadc"/>
       <path d="M32 165L14 224L30 241L49 196M93 165L112 224L96 241L76 196" fill="none" stroke="#315e69" strokeWidth="13"/>
       <path d="M39 145Q25 109 43 86Q63 67 85 88Q102 111 88 145Q64 161 39 145Z" fill="#eab99a"/>
       <path d="M35 111L26 77L49 91L57 60L71 85L99 72L91 112L76 99L53 102Z" fill="#d0c9bd"/>
       <path d="M43 119Q53 108 64 117M72 117Q83 107 94 117" fill="none" strokeWidth="3"/>
       <path d="M46 120Q55 113 63 120Q55 130 46 120M74 120Q83 113 91 119Q83 130 74 120" fill="#fff" stroke="#25202b" strokeWidth="1.5"/>
       <circle cx="55" cy="121" r="3.3" fill="#3c80a2" stroke="none"/><circle cx="83" cy="120" r="3.3" fill="#3c80a2" stroke="none"/>
       <path d="M68 124L64 136L73 138M53 148Q67 155 84 145" fill="none" stroke="#a45e67" strokeWidth="2.5"/>
       <path d="M29 284L26 314H57L67 286L79 314H108L99 284Z" fill="#30303a"/>
       <path d="M20 313H57L60 320H13Q10 316 20 313M79 313H110L119 320H73Z" fill="#17171d"/>
     </g>
   </g>}
   <path d="M-118 321H118" stroke="#c3ad91" strokeWidth="2"/>
   <text x="0" y="349" textAnchor="middle" fontSize="14" fontWeight="800" fill="#28232a">{labels[variant]}</text>
   <text x="0" y="367" textAnchor="middle" fontSize="11" fill="#786957">ПЕРСОНАЖИ · ВАРИАНТ {variant+1}</text>
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
