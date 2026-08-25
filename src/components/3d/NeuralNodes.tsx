'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
}

interface NeuralNodesProps {
  onNodeClick: (nodeId: string) => void;
}

const NODES: NodeData[] = [
  { id: 'identity', label: 'IDENTITY', position: [-6, 3, 0], color: '#62E6FF' },
  { id: 'journey', label: 'JOURNEY', position: [6, 4, -2], color: '#9B7CFF' },
  { id: 'skills', label: 'SKILLS', position: [-8, -3, -1], color: '#71F5A3' },
  { id: 'projects', label: 'PROJECTS', position: [7, -3, 1], color: '#62E6FF' },
  { id: 'research', label: 'RESEARCH', position: [0, 6, -4], color: '#9B7CFF' },
  { id: 'achievements', label: 'ACHIEVEMENTS', position: [-5, -6, -3], color: '#71F5A3' },
  { id: 'contact', label: 'CONTACT', position: [5, -6, 0], color: '#62E6FF' },
];

export function NeuralNodes({ onNodeClick }: NeuralNodesProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <group>
      {/* Dynamic connection lines between nodes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -6, 3, 0, 0, 0, 0,
                6, 4, -2, 0, 0, 0,
                -8, -3, -1, 0, 0, 0,
                7, -3, 1, 0, 0, 0,
                0, 6, -4, 0, 0, 0,
                -5, -6, -3, 0, 0, 0,
                5, -6, 0, 0, 0, 0,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#62E6FF" opacity={0.25} transparent />
      </lineSegments>

      {/* Render each node sphere */}
      {NODES.map((node) => {
        const isHovered = hoveredNode === node.id;
        const scale = isHovered ? 1.4 : 1.0;

        return (
          <group key={node.id} position={node.position}>
            <mesh
              scale={[scale, scale, scale]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNode(node.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredNode(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                onNodeClick(node.id);
              }}
            >
              <sphereGeometry args={[0.4, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHovered ? 2.5 : 1.0}
                roughness={0.1}
              />
            </mesh>

            {/* Orbiting halo ring on hover */}
            {isHovered && (
              <mesh>
                <ringGeometry args={[0.6, 0.7, 32]} />
                <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
            )}

            {/* HTML Label Billboard */}
            <Html position={[0, 0.8, 0]} center distanceFactor={12}>
              <div
                onClick={() => onNodeClick(node.id)}
                className={`px-3 py-1 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer select-none whitespace-nowrap shadow-lg ${
                  isHovered
                    ? 'bg-cyan-accent text-bg-void shadow-cyan-glow scale-110'
                    : 'bg-bg-dark/80 text-text-primary border border-bg-border backdrop-blur-md'
                }`}
              >
                ● {node.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
