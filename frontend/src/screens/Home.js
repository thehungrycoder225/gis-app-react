import React from 'react';
import Logo from '../extras/Logo';
import Title from './landing/Title';
import Content from './landing/Content';
import Team from './landing/Team';
import './landing-styles.css';
const Home = () => {
  return (
    <>
      <Title />
      <Content />
      <Team />
    </>
  );
};

export default Home;
