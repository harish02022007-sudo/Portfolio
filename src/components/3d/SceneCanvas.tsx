'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { NeuralNetworkMatrix } from './NeuralNetworkMatrix';
import { AttentionMatrixGrid } from './AttentionMatrixGrid';
import { AICore } from './AICore';
import { NeuralNodes } from './NeuralNodes';
import * as THREE from 'three';

interface CameraRigProps {
  currentScene: number;
}

function CameraRig({ currentScene }: CameraRigProps) {
  useFrame((state, delta) => {
    // Scroll-driven camera trajectory through the Neural Network Matrix
    let targetX = 0;
    let targetY = 0;
    let targetZ = 12;

    switch (currentScene) {
      case 1: // Intro / Neural Core Initial State
        targetX = 0;
        targetY = 0;
        targetZ = 12;
        break;
      case 2: // Identity / Approach Identity Node
        targetX = -3.5;
        targetY = 1.8;
        targetZ = 9.5;
        break;
      case 3: // Journey / Deep Learning Timeline Trajectory
        targetX = 3.5;
        targetY = 2.2;
        targetZ = 10;
        break;
      case 4: // Skills / Neural Skill Constellation
        targetX = -4.5;
        targetY = -1.8;
        targetZ = 8.5;
        break;
      case 5: // Projects / Multimodal Pipeline Focus
        targetX = 4;
        targetY = -1.8;
        targetZ = 9.2;
        break;
      case 6: // Research / AI Lab Matrix
        targetX = 0;
        targetY = 3.5;
        targetZ = 8.8;
        break;
      case 7: // Achievements / Holographic Credentials Wall
        targetX = -3;
        targetY = -3.5;
        targetZ = 10.2;
        break;
      case 8: // Contact / Mission Control Terminal
        targetX = 3;
        targetY = -3.5;
        targetZ = 9;
        break;
      default:
        targetZ = 12;
    }

    // Smooth camera linear interpolation (lerp)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.2);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2.2);

    // Mouse parallax tilt & scroll velocity response
    const mouseX = (state.pointer.x * Math.PI) / 18;
    const mouseY = (state.pointer.y * Math.PI) / 18;
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, mouseX, delta * 1.8);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, -mouseY, delta * 1.8);
  });

  return null;
}

interface SceneCanvasProps {
  currentScene: number;
  performanceMode: boolean;
  onNodeClick: (nodeId: string) => void;
}

export function SceneCanvas({ currentScene, performanceMode, onNodeClick }: SceneCanvasProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: !performanceMode, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full pointer-events-auto"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#62E6FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#9B7CFF" />

        <CameraRig currentScene={currentScene} />
        <NeuralNetworkMatrix currentScene={currentScene} performanceMode={performanceMode} />
        {!performanceMode && <AttentionMatrixGrid currentScene={currentScene} />}
        {!performanceMode && <AICore />}
        <NeuralNodes onNodeClick={onNodeClick} />
      </Canvas>
    </div>
  );
}
