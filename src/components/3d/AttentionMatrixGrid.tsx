'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AttentionMatrixGridProps {
  currentScene: number;
}

export function AttentionMatrixGrid({ currentScene }: AttentionMatrixGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Undulating Loss Landscape / Attention Matrix Waves
    const geom = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geom.attributes.position;

    // React to currentScene elevation and wave frequency
    const freq = 0.3 + currentScene * 0.05;
    const amp = 0.6 + currentScene * 0.1;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * freq + time * 1.5) * Math.cos(y * freq + time * 1.2) * amp;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -14, -10]}
    >
      <planeGeometry args={[100, 100, 40, 40]} />
      <meshStandardMaterial
        color="#62E6FF"
        emissive="#62E6FF"
        emissiveIntensity={0.15}
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}
