import React from 'react';
import {
  AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig,
} from 'remotion';

const fade = (f: number, start: number, end: number) =>
  interpolate(f, [start, start + 12, end - 12, end], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Caption: React.FC<{children: React.ReactNode; start: number; end: number}> = ({children, start, end}) => {
  const f = useCurrentFrame();
  return <div style={{position:'absolute', left:64, right:64, bottom:150, textAlign:'center',
    color:'#fff4df', fontFamily:'Georgia, serif', fontSize:38, lineHeight:1.25,
    textShadow:'0 3px 12px rgba(0,0,0,.9)', opacity:fade(f,start,end), letterSpacing:'.2px'}}>
    {children}
  </div>;
};

const GuestEntrance: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 55], [120, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const opacity = interpolate(f, [0, 10, 55], [0, 1, 1], {extrapolateRight:'clamp'});
  return <Img src={staticFile('stranger_2d.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',
    transform:`translateX(${x}px)`,opacity}} />;
};

const WaiterReaction: React.FC = () => {
  const f = useCurrentFrame();
  const breath = Math.sin(f/19)*1.5;
  const lean = interpolate(f,[0,18,42],[0,-5,-2],{extrapolateRight:'clamp'});
  return <Img src={staticFile('waiter_2d.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',
    transform:`translateY(${breath+lean}px)`}} />;
};

export const CafeFilm: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const camera = interpolate(f,[0,360,720,1080,1439],[1,1.015,1.035,1.05,1.065],{extrapolateRight:'clamp'});
  const rainPhase = f*0.75;
  return <AbsoluteFill style={{backgroundColor:'#100e10',overflow:'hidden'}}>
    <AbsoluteFill style={{transform:`scale(${camera})`,transformOrigin:'50% 55%'}}>
      <Img src={staticFile('cafe_background_reconstructed.png')} style={{width:'100%',height:'100%',objectFit:'cover'}} />
    </AbsoluteFill>
    {/* Atmospheric rain in the window zone; subtle enough not to obscure the drawing. */}
    <svg viewBox="0 0 941 1672" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
      {Array.from({length:24},(_,i)=>{
        const x=45+(i*43)%380, y=(i*113+rainPhase*3)%1672;
        return <line key={i} x1={x} y1={y} x2={x-3} y2={y+24} stroke="#d8e8eb" strokeWidth="2" opacity=".25"/>;
      })}
    </svg>
    <Sequence from={0} durationInFrames={192}><WaiterReaction /></Sequence>
    <Sequence from={192} durationInFrames={192}><WaiterReaction /><GuestEntrance /></Sequence>
    <Sequence from={384} durationInFrames={216}><WaiterReaction /><Img src={staticFile('stranger_2d.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain'}} /></Sequence>
    <Sequence from={600} durationInFrames={264}><WaiterReaction /><Img src={staticFile('stranger_2d.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain'}} /></Sequence>
    <Sequence from={864} durationInFrames={288}><WaiterReaction /></Sequence>
    <Sequence from={1152} durationInFrames={288}><WaiterReaction /></Sequence>
    <Caption start={0} end={190}>Кафе почти закрылось. Дождь всё не прекращался.</Caption>
    <Caption start={200} end={380}>Колокольчик над дверью тихо звякнул.</Caption>
    <Caption start={390} end={590}>«Мне, пожалуйста, чашку кофе. Как в тот самый вечер».</Caption>
    <Caption start={610} end={850}>«Ты ведь обещал, что не забудешь».</Caption>
    <Caption start={870} end={1125}>Официант обернулся — но посетителя уже не было.</Caption>
    <Caption start={1160} end={1438}>Некоторые обещания время не умеет стирать.</Caption>
  </AbsoluteFill>;
};
