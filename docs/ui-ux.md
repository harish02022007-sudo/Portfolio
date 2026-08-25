# UI/UX & Design System Architecture

## Design Language
- **Theme**: Futuristic Dark AI Research Laboratory & Digital Universe.
- **Palette Ratio**: 95% Dark Neutral (`#050507`, `#08090D`, `#0A0A0F`), 4% Accent (Electric Cyan `#62E6FF`, Violet `#9B7CFF`), 1% Highlight (Soft Green `#71F5A3`).
- **Typography Hierarchy**:
  - Headings: Geometric/futuristic display font (`Space Grotesk`, `Orbitron`).
  - Body Text: Clean sans-serif (`Inter`).
  - System Metadata: Monospace font (`Fira Code`, `JetBrains Mono`) for labels, coordinates, and telemetry stats.

## Interactive Controls
- **Custom Luminous Cursor**: Dual-ring pointer with smooth spring trail and contextual hover states (`VIEW`, `EXPLORE`, link expand). Disables automatically on touch devices and `prefers-reduced-motion`.
- **Magnetic Buttons**: Spring displacement physics reacting to cursor proximity.
- **Glassmorphism Panels**: Blur backdrops with subtle 1px luminous cyan/violet border accents.
