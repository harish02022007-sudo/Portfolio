'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkMatrixProps {
  count?: number;
  currentScene: number;
  performanceMode?: boolean;
}

export function NeuralNetworkMatrix({ count = 1800, currentScene, performanceMode }: NeuralNetworkMatrixProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  // 1. Generate Deep Learning Neural Nodes & Synapses
  const [nodePositions, nodeColors, linePositions, lineColors, pulsePositions] = useMemo(() => {
    const totalNodes = performanceMode ? 500 : count;
    const pos = new Float32Array(totalNodes * 3);
    const cols = new Float32Array(totalNodes * 3);

    const cyan = new THREE.Color('#62E6FF');
    const violet = new THREE.Color('#9B7CFF');
    const green = new THREE.Color('#71F5A3');

    const nodeArray: [number, number, number][] = [];

    // Distribute nodes into multi-layer neural network clusters (Latent space + Layers)
    for (let i = 0; i < totalNodes; i++) {
      const layer = (i % 7) - 3; // -3 to 3 layers
      const x = layer * 15 + (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      nodeArray.push([x, y, z]);

      const rand = Math.random();
      let color = cyan;
      if (rand > 0.6) color = violet;
      else if (rand > 0.85) color = green;

      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    // Connect adjacent neural nodes with synaptic connections
    const linePosList: number[] = [];
    const lineColList: number[] = [];
    const maxConnections = performanceMode ? 300 : 800;
    let connectionsCount = 0;

    for (let i = 0; i < totalNodes && connectionsCount < maxConnections; i++) {
      for (let j = i + 1; j < totalNodes && connectionsCount < maxConnections; j++) {
        const [x1, y1, z1] = nodeArray[i];
        const [x2, y2, z2] = nodeArray[j];
        const distSq = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

        if (distSq < 160) {
          linePosList.push(x1, y1, z1, x2, y2, z2);
          const c1 = cols[i * 3];
          const c2 = cols[i * 3 + 1];
          const c3 = cols[i * 3 + 2];
          lineColList.push(c1, c2, c3, c1, c2, c3);
          connectionsCount++;
        }
      }
    }

    // Synaptic Data Pulse Particles moving along network
    const pulseCount = performanceMode ? 100 : 300;
    const pulses = new Float32Array(pulseCount * 3);
    for (let p = 0; p < pulseCount; p++) {
      const randomNodeIndex = Math.floor(Math.random() * totalNodes);
      pulses[p * 3] = pos[randomNodeIndex * 3];
      pulses[p * 3 + 1] = pos[randomNodeIndex * 3 + 1];
      pulses[p * 3 + 2] = pos[randomNodeIndex * 3 + 2];
    }

    return [
      pos,
      cols,
      new Float32Array(linePosList),
      new Float32Array(lineColList),
      pulses,
    ];
  }, [count, performanceMode]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Scroll-driven rotational & translation velocity
    const sceneRotationSpeed = 0.05 + currentScene * 0.01;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * sceneRotationSpeed;
      pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y += delta * sceneRotationSpeed;
      linesRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
    }

    // 2. Animate Data Pulses along Synapses
    if (pulsesRef.current) {
      pulsesRef.current.rotation.y += delta * (sceneRotationSpeed * 1.5);
      const positionsAttr = pulsesRef.current.geometry.attributes.position;
      const arr = positionsAttr.array as Float32Array;

      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3 + 1] += Math.sin(time * 2 + i) * 0.05; // Pulse vertical oscillation
        if (arr[i * 3 + 1] > 30) arr[i * 3 + 1] = -30;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 3D Neural Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* 3D Synaptic Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors opacity={0.22} transparent />
      </lineSegments>

      {/* Travelling Synaptic Electric Data Pulses */}
      {!performanceMode && (
        <points ref={pulsesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.35}
            color="#62E6FF"
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
