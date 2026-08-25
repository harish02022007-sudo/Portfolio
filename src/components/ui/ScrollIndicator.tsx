import React from 'react';

interface ScrollIndicatorProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneIndex: number) => void;
}

export function ScrollIndicator({ currentScene, totalScenes, onSelectScene }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 glass-panel p-2.5 rounded-full border border-bg-border shadow-2xl">
      <span className="font-mono text-[10px] text-cyan-accent font-bold">
        0{currentScene}
      </span>
      <div className="w-[1px] h-4 bg-cyan-accent/30" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: totalScenes }).map((_, idx) => {
          const sceneNum = idx + 1;
          const isActive = currentScene === sceneNum;
          return (
            <button
              key={idx}
              onClick={() => onSelectScene(sceneNum)}
              data-cursor="hover"
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-cyan-accent scale-125 shadow-cyan-glow'
                  : 'bg-text-muted/40 hover:bg-text-secondary'
              }`}
              title={`Jump to Scene 0${sceneNum}`}
            />
          );
        })}
      </div>
      <div className="w-[1px] h-4 bg-cyan-accent/30" />
      <span className="font-mono text-[10px] text-text-muted">
        0{totalScenes}
      </span>
    </div>
  );
}
