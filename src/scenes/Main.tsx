import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const palette = {
  background: '#101827',
  accent: '#8B5CF6',
  accent2: '#22D3EE',
  text: '#F8FAFC',
  muted: '#A8B3C7',
};

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 90, mass: 0.8},
  });

  const titleY = interpolate(intro, [0, 1], [90, 0]);
  const titleOpacity = interpolate(intro, [0, 1], [0, 1]);
  const orbX = Math.sin(frame / 28) * 34;
  const orbY = Math.cos(frame / 34) * 28;
  const glow = interpolate(Math.sin(frame / 18), [-1, 1], [0.55, 1]);

  return (
    <AbsoluteFill
      style={{
        background: palette.background,
        color: palette.text,
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(91, 63, 160, 0.38), transparent 48%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          left: '50%',
          top: '43%',
          transform: `translate(calc(-50% + ${orbX}px), calc(-50% + ${orbY}px))`,
          background: `radial-gradient(circle, rgba(34,211,238,${glow}) 0%, rgba(139,92,246,0.6) 34%, rgba(139,92,246,0) 70%)`,
          filter: 'blur(8px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 80,
          right: 80,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: palette.accent2,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 8,
            marginBottom: 34,
          }}
        >
          REMOTION WORKSPACE
        </div>
        <div style={{fontSize: 76, fontWeight: 800, lineHeight: 1.08}}>
          ИСТОРИИ
          <br />
          В ДВИЖЕНИИ
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: palette.muted,
            lineHeight: 1.45,
          }}
        >
          Первая сцена нашего
          <br />
          вертикального проекта
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '67%',
          width: 230,
          height: 230,
          transform: `translateX(-50%) rotate(${frame * 0.7}deg)`,
          border: '3px solid rgba(255,255,255,0.48)',
          borderRadius: 54,
          boxShadow: '0 0 60px rgba(139,92,246,0.3)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 22,
            border: '2px solid rgba(34,211,238,0.8)',
            borderRadius: 38,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: palette.accent2,
            top: -20,
            right: 28,
            boxShadow: '0 0 28px rgba(34,211,238,0.8)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 130,
          width: '100%',
          textAlign: 'center',
          color: palette.muted,
          fontSize: 24,
          letterSpacing: 3,
        }}
      >
        1080 × 1920　•　30 FPS
      </div>
    </AbsoluteFill>
  );
};
