import React from 'react';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';

const Animate = ({ children }) => {
  const startState = { autoAlpha: 0, y: -50 };
  return (
    <Transition
      unmountOnExit
      in={children.show}
      timeout={1000}
      onEnter={(node) => TweenMax.set(node, startState)}
      addEndListener={(node, done) => {
        TweenMax.to(node, 0.5, {
          AutoAlpha: children.show ? 1 : 0,
          y: children.show ? 0 : 50,
          onComplete: done,
        });
      }}
    >
      {children}
    </Transition>
  );
};

export default Animate;
