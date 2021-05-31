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
      <div className=' landing-background'>
        <Title />
      </div>
      <Content />
      <Team />
    </>
  );
};

export default Home;
