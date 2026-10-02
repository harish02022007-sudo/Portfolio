'use client';

import React from 'react';

interface SceneCanvasProps {
  currentScene: number;
  performanceMode: boolean;
  onNodeClick: (nodeId: string) => void;
}

export function SceneCanvas({ currentScene, performanceMode, onNodeClick }: SceneCanvasProps) {
  // Background space, star, and 3D particle animations completely removed
  return null;
}
