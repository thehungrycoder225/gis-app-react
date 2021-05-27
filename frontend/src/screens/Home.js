import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Title from './landing/Title';
import Content from './landing/Content';
import Team from './landing/Team';
import Model from '../components/Model';
import HtmlContent from '../components/HtmlContent';
import '../stylesheets/landing-styles.css';

const Home = () => {
  return (
    <>
      <Canvas
        className='canvas-height landing-background'
        colorManagement
        camera={{ position: [0, 0, 120], fov: 100 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 25, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <OrbitControls autoRotate />
        </Suspense>
        <Title />
      </Canvas>
      <Content />
      <Team />
    </>
  );
};

export default Home;
