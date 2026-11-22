import React from 'react';
import {Composition} from 'remotion';
import {Main} from './scenes/Main';
import {CafeScene} from './scenes/CafeScene';
import {CafeFilm} from './scenes/CafeFilm';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Main" component={Main} durationInFrames={180} fps={30} width={1080} height={1920} />
      <Composition id="CafeScene" component={CafeScene} durationInFrames={192} fps={24} width={941} height={1672} />
      <Composition id="CafeFilm" component={CafeFilm} durationInFrames={1440} fps={24} width={941} height={1672} />
    </>
  );
};