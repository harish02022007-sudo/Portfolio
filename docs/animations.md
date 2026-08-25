# 3D Environment & Animation Architecture

## 3D Environment (React Three Fiber & Three.js)
- `SceneCanvas`: R3F canvas container managing WebGL rendering, ambient & directional lighting, camera interpolation, and performance scaling.
- `StarField`: Procedurally generated 3D starfield particles with smooth rotational drift and dual cyan/violet luminescence.
- `AICore`: Glowing central wireframe sphere with pulsing inner core and 3 orbiting wireframe torus rings.
- `NeuralNodes`: Interactive 3D section nodes in 3D space with connection line segments, scale-up on hover, and billboard labels.
- `CameraRig`: Linear camera position interpolation (`lerp`) reacting to scene scroll index (Scenes 01 to 08) and mouse parallax pointer tilt.

## Motion & Performance Scaling
- Performance mode switch (`VISUAL MODE` vs `PERFORMANCE MODE`) reduces particle count from 2,500 to 600, disables antialiasing and complex post-processing.
- Accessibility: Respects `prefers-reduced-motion: reduce` by disabling camera tilt, particle movement, and cursor trails.
