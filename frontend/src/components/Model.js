import React from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const Model = () => {
  const gltf = useLoader(GLTFLoader, './scene.gltf');
  return (
    <mesh>
      <primitive object={gltf.scene} scale={75} />
    </mesh>
  );
};

export default Model;
