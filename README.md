# Memory Card Game

A modern, responsive memory card matching game built with React and Vite. Features custom SVG artwork, smooth animations, and full accessibility support.

## Features

- **Multiple Difficulty Levels**: Easy (2×2), Medium (4×4), Hard (6×6)
- **Custom SVG Artwork**: Support for personalized card designs
- **Game Statistics**: Move counter and timer with best score tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Local Storage**: Persistent best scores across sessions
- **Smooth Animations**: CSS-powered card flip animations

## Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/sarmientobengjii/memory-game
   cd memory-card-game
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Visit `http://localhost:5173`

## How to Play

1. Select your preferred difficulty level
2. Click cards to flip them over
3. Match pairs by finding two identical cards
4. Complete the game with the fewest moves possible
5. Beat your best score!

## Project Structure

```
src/
├── components/          # React components
│   ├── Card.jsx        # Individual card component
│   ├── GameBoard.jsx   # Grid layout
│   ├── GameControls.jsx # Timer, moves, restart
│   └── DifficultySelector.jsx
├── hooks/              # Custom React hooks
│   ├── useTimer.js     # Game timer logic
│   ├── useLocalStorage.js # Score persistence
│   └── useGameLogic.js # Core game mechanics
├── utils/              # Configuration
│   ├── cardAssets.js   # SVG imports and card data
│   └── gameConfig.js   # Difficulty settings
├── assets/
│   └── cards/          # SVG card artwork
└── App.jsx             # Main application
```

## Adding Custom Artwork

1. **Add SVG files** to `src/assets/cards/` (named card-01.svg, card-02.svg, etc.)

2. **Import in cardAssets.js**:
   ```javascript
   import Card01 from '../assets/cards/card-01.svg';
   // ... more imports

   export const CARD_ASSETS = [
     { id: 'card-01', name: 'Your Card Name', src: Card01 },
     // ... more cards
   ];
   ```

3. **Restart development server** to see your custom cards

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Responsive design and animations
- **Lucide React** - Clean, consistent icons

## Architecture Highlights

- **Custom Hooks Pattern**: Separates business logic from UI components
- **Component Composition**: Modular, reusable components
- **Responsive CSS**: Mobile-first design approach
- **Accessibility First**: WCAG compliant keyboard navigation
- **Performance Optimized**: Efficient state management and animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with modern web technologies and accessibility in mind.
