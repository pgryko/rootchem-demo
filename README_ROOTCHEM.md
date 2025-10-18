# RootChem Demo Interface

An interactive React-based demonstration of RootChem's AI-powered quantum chemistry simulation platform.

## Quick Start

```bash
npm start
```

Visit http://localhost:3000

## Using the Demo

### Running a Simulation
1. Click a template button (💊 Drug Binding, ⚗️ Reaction, or ☀️ Materials)
2. Watch the AI process your request
3. View results with interactive tabs
4. Click "Reset Demo" to start over

### Presenter Mode
Press `⌘⇧P` (Mac) or `Ctrl⇧P` (Windows) to activate:
- **R**: Reset demo
- **S**: Skip to results  
- **1/2/3**: Change speed (1x, 1.5x, 2x)

## Features
- Natural language chat interface
- 3 pre-built scenarios with realistic timing
- Animated progress visualization
- Smooth Framer Motion transitions
- Hidden presenter controls for pitches

## Architecture
- React 18 + TypeScript
- Zustand for state management
- Tailwind CSS for styling
- Framer Motion for animations

## Three Scenarios
1. **Drug Binding**: Aspirin + COX-2 enzyme binding energy
2. **Chemical Reaction**: SN2 reaction (methyl iodide + sodium ethoxide)
3. **Materials Science**: HOMO-LUMO gap for organic solar cells

Built for 3-minute pitch presentations.
