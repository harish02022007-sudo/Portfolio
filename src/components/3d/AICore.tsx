'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AICore() {
  const coreGroupRef = useRef<THREE.Group>(null);
  const tensorCubeRef = useRef<THREE.Mesh>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const weightNodesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y += delta * 0.2;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x += delta * 0.35;
      icosahedronRef.current.rotation.z -= delta * 0.25;
      const scale = 1 + Math.sin(time * 2.5) * 0.06;
      icosahedronRef.current.scale.set(scale, scale, scale);
    }

    if (tensorCubeRef.current) {
      tensorCubeRef.current.rotation.y -= delta * 0.4;
      tensorCubeRef.current.rotation.x += delta * 0.2;
    }

    if (weightNodesRef.current) {
      weightNodesRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={coreGroupRef} position={[0, 0, 0]}>
      {/* 1. Central Machine Learning Neural Tensor Core (Icosahedron Geometry) */}
      <mesh ref={icosahedronRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#62E6FF"
          emissive="#62E6FF"
          emissiveIntensity={1.8}
          roughness={0.1}
          wireframe
        />
      </mesh>

      {/* 2. Outer Tensor Architecture Framework (Wireframe Octahedron) */}
      <mesh ref={tensorCubeRef}>
        <octahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial
          color="#9B7CFF"
          emissive="#9B7CFF"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>

      {/* 3. Orbiting Neural Weight Matrix Nodes (Replaces Planetary Rings) */}
      <group ref={weightNodesRef}>
        {[
          [-2.2, 1.2, 0],
          [2.2, -1.2, 0],
          [0, 2.2, 1.2],
          [0, -2.2, -1.2],
          [1.8, 1.8, -1],
          [-1.8, -1.8, 1],
        ].map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#62E6FF' : '#71F5A3'}
              emissive={idx % 2 === 0 ? '#62E6FF' : '#71F5A3'}
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>

      {/* Point Lights inside Neural Tensor Core */}
      <pointLight color="#62E6FF" intensity={3.5} distance={15} />
      <pointLight color="#9B7CFF" intensity={2.5} distance={20} />
    </group>
  );
}
