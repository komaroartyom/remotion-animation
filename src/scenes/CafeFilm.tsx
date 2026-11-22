import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const fade = (f: number, start: number, end: number) =>
  interpolate(f, [start, start + 12, end - 12, end], [0, 1, 1, 0], clamp);

const Caption: React.FC<{children: React.ReactNode; start: number; end: number}> = ({children, start, end}) => {
  const f = useCurrentFrame();
  return <div style={{position:'absolute',left:54,right:54,bottom:132,textAlign:'center',
    color:'#fff1d8',fontFamily:'Georgia,serif',fontSize:36,lineHeight:1.3,
    textShadow:'0 3px 14px rgba(0,0,0,.95)',opacity:fade(f,start,end),letterSpacing:'.2px'}}>
    {children}
  </div>;
};

const CafeBackground: React.FC = () => {
  const f = useCurrentFrame();
  return <svg viewBox="0 0 941 1672" preserveAspectRatio="xMidYMid slice" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="wall" x2="0" y2="1"><stop stopColor="#24232b"/><stop offset="1" stopColor="#100f16"/></linearGradient>
      <linearGradient id="window" x2="0" y2="1"><stop stopColor="#182d40"/><stop offset="1" stopColor="#080f1c"/></linearGradient>
      <linearGradient id="floor" x2="0" y2="1"><stop stopColor="#34272a"/><stop offset="1" stopColor="#100d12"/></linearGradient>
      <radialGradient id="lamp"><stop stopColor="#f4c77c" stopOpacity=".32"/><stop offset="1" stopColor="#f4c77c" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="941" height="1672" fill="url(#wall)"/>
    <rect x="42" y="150" width="470" height="760" rx="12" fill="#090d16" stroke="#6c5142" strokeWidth="18"/>
    <rect x="64" y="172" width="426" height="716" fill="url(#window)"/>
    <path d="M277 172V888M64 510H490" stroke="#735745" strokeWidth="14"/>
    <circle cx="365" cy="310" r="150" fill="#d9a66a" opacity=".08"/>
    <path d="M70 735 Q160 690 245 740 T490 730V888H70Z" fill="#253342" opacity=".55"/>
    {Array.from({length:28},(_,i)=>{
      const x=82+(i*71)%395, y=(i*139+f*5)%720+180;
      return <line key={i} x1={x} y1={y} x2={x-8} y2={y+42} stroke="#b8d4e0" strokeWidth="3" opacity=".25"/>;
    })}
    <rect x="548" y="170" width="350" height="690" fill="#30252a"/>
    <path d="M548 170H898V860H548Z" fill="#30252a"/>
    <rect x="600" y="250" width="246" height="330" rx="8" fill="#17151b" stroke="#8a6347" strokeWidth="10"/>
    <path d="M622 520V280H824V520Z" fill="#4b302b"/>
    <path d="M650 475Q720 390 795 475" fill="none" stroke="#d29a5b" strokeWidth="8" opacity=".7"/>
    <circle cx="720" cy="360" r="95" fill="url(#lamp)"/>
    <path d="M0 1060L941 990V1672H0Z" fill="url(#floor)"/>
    <path d="M0 1220L941 1150M0 1430L941 1360" stroke="#6c4b40" strokeWidth="5" opacity=".28"/>
    <rect x="0" y="1010" width="941" height="72" fill="#21191e"/>
    <rect x="70" y="1020" width="800" height="20" fill="#896348" opacity=".8"/>
    <g opacity=".75"><path d="M110 1040V1200M830 1040V1200" stroke="#171116" strokeWidth="20"/><path d="M75 1195H865" stroke="#6b4a3d" strokeWidth="18"/></g>
    <g transform="translate(120 950)"><path d="M0 0H180L160 30H20Z" fill="#a77a52"/><path d="M18 30V125M162 30V125" stroke="#39272a" strokeWidth="12"/><ellipse cx="90" cy="-8" rx="90" ry="17" fill="#d1a06d"/><path d="M62 -12Q90 -58 118 -12Z" fill="#eee0c6"/><path d="M67 -18Q90 -40 113 -18" fill="#4a2923"/></g>
    <g transform="translate(730 950)"><path d="M0 0H150L135 28H15Z" fill="#986b4c"/><path d="M20 28V130M130 28V130" stroke="#39272a" strokeWidth="12"/></g>
    <rect width="941" height="1672" fill="#080910" opacity=".16"/>
  </svg>;
};

const Waiter: React.FC = () => {
  const f = useCurrentFrame();
  const breath = Math.sin(f/18)*3;
  const turn = interpolate(f,[0,26,52],[0,-3,-1],clamp);
  return <svg viewBox="0 0 941 1672" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <g transform={`translate(0 ${breath}) rotate(${turn} 730 930)`}>
      <path d="M650 900Q630 820 650 730Q675 650 755 650Q835 650 850 740L860 1040H625Z" fill="#20232c" stroke="#11131a" strokeWidth="10"/>
      <path d="M686 690L750 770L812 690L795 920H700Z" fill="#e7dfd0"/>
      <path d="M716 735L750 770L785 735L772 940H728Z" fill="#7a3436"/>
      <path d="M655 760Q610 790 605 920L620 1050Q630 1075 652 1058L680 890" fill="#242832" stroke="#11131a" strokeWidth="10"/>
      <path d="M835 760Q885 810 875 920L850 1030Q840 1050 820 1030L810 890" fill="#242832" stroke="#11131a" strokeWidth="10"/>
      <path d="M680 650Q680 565 750 555Q820 565 820 650L805 710Q780 750 750 750Q710 740 690 700Z" fill="#d5a27e" stroke="#6e4b40" strokeWidth="8"/>
      <path d="M681 635Q680 555 750 550Q827 556 823 645L805 615Q780 590 744 604Q714 616 690 658Z" fill="#30272a"/>
      <path d="M714 660Q728 650 740 660M765 660Q780 650 792 660" stroke="#34252a" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M744 690Q758 700 772 690" stroke="#754b42" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M700 1040L685 1320L670 1510H735L755 1260L780 1510H845L820 1300L840 1040Z" fill="#171a22"/>
      <path d="M665 1505H742L750 1545H645Q635 1525 665 1505M780 1505H850L875 1545H770Z" fill="#090b10"/>
    </g>
  </svg>;
};

const Guest: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f,[0,52],[190,0],clamp);
  const opacity = interpolate(f,[0,10,52],[0,1,1],clamp);
  const sway = Math.sin(f/23)*1.2;
  return <svg viewBox="0 0 941 1672" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity}}>
    <g transform={`translate(${x} ${sway})`}>
      <path d="M165 920Q155 790 200 730Q250 680 325 720Q390 770 385 930L370 1120H150Z" fill="#343944" stroke="#171b23" strokeWidth="12"/>
      <path d="M210 730L275 800L335 730L320 1000H220Z" fill="#b9aa92"/>
      <path d="M205 790Q160 840 170 980L195 1030L220 990L225 870M365 790Q410 850 395 970L370 1035L345 990L345 870" fill="#343944" stroke="#171b23" strokeWidth="10"/>
      <path d="M215 710Q205 620 270 600Q345 600 355 690L340 750Q315 790 275 790Q235 775 215 710Z" fill="#c69b7e" stroke="#705144" strokeWidth="8"/>
      <path d="M207 690Q190 605 270 580Q355 590 365 680L345 660Q310 620 260 650L220 710Z" fill="#b8b3a7"/>
      <path d="M230 700Q244 690 255 700M292 700Q308 690 322 700" stroke="#51413c" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M260 735Q280 745 300 735" stroke="#765047" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M190 1110L180 1370L165 1510H235L260 1280L290 1510H360L340 1350L350 1110Z" fill="#252a34"/>
      <path d="M160 1505H240L250 1545H145Q135 1525 160 1505M290 1505H365L385 1545H280Z" fill="#10131a"/>
      <path d="M215 780Q275 860 350 780" stroke="#a99b89" strokeWidth="10" fill="none" opacity=".7"/>
    </g>
  </svg>;
};


const MemoryPhoto: React.FC = () => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 18, 288], [0, 1, 1], clamp);
  const lift = interpolate(f, [0, 28], [90, 0], clamp);
  const scale = interpolate(f, [0, 28], [0.82, 1], clamp);
  const glow = 0.12 + Math.max(0, Math.sin(f / 24)) * 0.08;
  return <svg viewBox="0 0 941 1672" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
    <defs>
      <linearGradient id="photoPaper" x2="0" y2="1"><stop stopColor="#f3e4c7"/><stop offset="1" stopColor="#cbb894"/></linearGradient>
      <linearGradient id="photoImage" x2="0" y2="1"><stop stopColor="#7e8b86"/><stop offset="1" stopColor="#35434a"/></linearGradient>
      <filter id="photoShadow"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <g opacity={opacity} transform={`translate(0 ${lift}) translate(470 1270) rotate(-7) scale(${scale}) translate(-470 -1270)`}>
      <ellipse cx="470" cy="1450" rx="210" ry="48" fill="#000" opacity=".55" filter="url(#photoShadow)"/>
      <rect x="292" y="1040" width="356" height="430" rx="8" fill="#09090d" opacity=".28"/>
      <rect x="278" y="1018" width="356" height="430" rx="7" fill="url(#photoPaper)" stroke="#f8ebd0" strokeWidth="8"/>
      <rect x="302" y="1042" width="308" height="330" fill="url(#photoImage)"/>
      <circle cx="452" cy="1158" r="125" fill="#d9b47d" opacity={glow}/>
      <path d="M302 1315Q365 1250 430 1290T610 1280V1372H302Z" fill="#273c3d" opacity=".8"/>
      <path d="M330 1368Q326 1270 374 1235Q415 1208 449 1240Q480 1272 480 1368Z" fill="#4d5660"/>
      <circle cx="405" cy="1200" r="42" fill="#c69c7a"/>
      <path d="M360 1192Q355 1148 405 1145Q455 1150 449 1195L430 1175Q400 1160 374 1180Z" fill="#66564a"/>
      <path d="M463 1368Q460 1240 515 1190Q562 1152 585 1200Q610 1240 602 1368Z" fill="#5b4639"/>
      <circle cx="534" cy="1155" r="58" fill="#c49a78"/>
      <path d="M478 1150Q480 1076 541 1080Q600 1088 590 1162L568 1130Q527 1105 492 1148Z" fill="#d2c7b2"/>
      <path d="M470 1195Q490 1220 525 1210Q555 1222 580 1194" fill="none" stroke="#ead5b6" strokeWidth="9"/>
      <rect x="302" y="1042" width="308" height="330" fill="none" stroke="#e8d6b8" strokeWidth="5" opacity=".65"/>
      <text x="456" y="1412" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fill="#59483a">Папа и я</text>
      <path d="M345 1430H567" stroke="#9b8265" strokeWidth="2" opacity=".6"/>
    </g>
  </svg>;
};

const RainOverlay: React.FC = () => {
  const f = useCurrentFrame();
  return <svg viewBox="0 0 941 1672" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
    {Array.from({length:34},(_,i)=>{
      const x=48+(i*43)%430, y=(i*113+f*7)%900+170;
      return <line key={i} x1={x} y1={y} x2={x-5} y2={y+32} stroke="#d7e6ec" strokeWidth="2" opacity=".3"/>;
    })}
  </svg>;
};

export const CafeFilm: React.FC = () => {
  const f = useCurrentFrame();
  const camera = interpolate(f,[0,360,720,1080,1439],[1,1.012,1.026,1.04,1.052],clamp);
  return <AbsoluteFill style={{backgroundColor:'#100e12',overflow:'hidden'}}>
    <AbsoluteFill style={{transform:`scale(${camera})`,transformOrigin:'50% 55%'}}>
      <CafeBackground />
    </AbsoluteFill>
    <RainOverlay />
    <Sequence from={0} durationInFrames={192}><Waiter /></Sequence>
    <Sequence from={192} durationInFrames={192}><Waiter /><Guest /></Sequence>
    <Sequence from={384} durationInFrames={216}><Waiter /><Guest /></Sequence>
    <Sequence from={600} durationInFrames={264}><Waiter /><Guest /></Sequence>
    <Sequence from={864} durationInFrames={288}><Waiter /><MemoryPhoto /></Sequence>
    <Sequence from={1152} durationInFrames={288}><Waiter /></Sequence>
    <Caption start={0} end={190}>Кафе почти закрылось. Дождь всё не прекращался.</Caption>
    <Caption start={200} end={380}>Колокольчик над дверью тихо звякнул.</Caption>
    <Caption start={390} end={590}>«Мне, пожалуйста, чашку кофе. Как в тот самый вечер».</Caption>
    <Caption start={610} end={850}>«Ты ведь обещал, что не забудешь».</Caption>
    <Caption start={870} end={1125}>На столе осталась старая фотография. Официант узнал себя и отца.</Caption>
    <Caption start={1160} end={1438}>Некоторые обещания время не умеет стирать.</Caption>
  </AbsoluteFill>;
};
