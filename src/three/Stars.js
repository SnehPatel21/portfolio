// src/three/Stars.js
"use client"; // Add this line to mark this file as a Client Component

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Stars = () => {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.001; // Slowly move stars
    }
  });

  return (
    <group ref={starsRef}>
      {Array(500).fill().map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

export default function StarsCanvas() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Stars />
    </Canvas>
  );
}
