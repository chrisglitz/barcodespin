# BARCODE SPIN

A cyberpunk-themed picker wheel web app with 100 cybersecurity questions. Built with Next.js, TypeScript, and Tailwind CSS.

![BARCODE SPIN](./public/brand/barcode-spin-logo.png)

## Features

- **100-segment picker wheel** with smooth spin animations
- **Canvas-based rendering** for optimal performance
- **localStorage persistence** for used questions, settings, and spin history
- **Avoid repeats mode** (optional) - only land on unused questions
- **Questions management** - view all questions, edit them, or reset
- **Keyboard controls** - press Space or Enter to spin
- **Fully responsive** - works on mobile and desktop
- **Cyberpunk theme** with neon accents in orange (#f6921e) and blue (#1b75bb)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Storage**: localStorage (no backend required)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd barcodespin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

This app is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy (no configuration needed)

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Project Structure

```
barcodespin/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with wheel logic
│   └── globals.css         # Global styles
├── components/
│   ├── Wheel.tsx           # Canvas-based wheel component
│   ├── ResultCard.tsx      # Result modal after spin
│   ├── QuestionsDrawer.tsx # View all questions
│   ├── SettingsBar.tsx     # Controls and settings
│   └── EditQuestionsModal.tsx # Edit questions interface
├── lib/
│   ├── questions.ts        # 100 seed questions
│   ├── storage.ts          # localStorage utilities
│   └── wheelMath.ts        # Wheel calculations and animations
├── public/
│   └── brand/              # Logo assets
└── tailwind.config.ts      # Tailwind configuration
```

## How It Works

### The Wheel

- **100 segments** (3.6° each)
- **Canvas rendering** for smooth performance
- **Color-coded segments** alternating between orange, blue, gray, and light gray
- **Pointer at top** - wheel spins and lands with selected segment under pointer

### Spin Animation

- **6-10 full rotations** plus targeted landing
- **Cubic easing** for realistic deceleration
- **4-second duration**
- **RequestAnimationFrame** for smooth 60fps animation

### Question Selection

When "Avoid Repeats" is ON:
- Only selects from unused questions
- When all used, automatically resets or allows repeats

When "Avoid Repeats" is OFF:
- Selects randomly from all questions

### Storage

All data persists in localStorage:
- `barcode-spin-questions` - Current question list
- `barcode-spin-used` - Set of used question IDs
- `barcode-spin-history` - Last 25 spin results
- `barcode-spin-settings` - App settings

## Customization

### Adding Your Own Questions

1. Click "VIEW ALL" in the settings bar
2. Click "EDIT QUESTIONS"
3. Paste your questions (one per line)
4. Click "SAVE"

Or edit `/lib/questions.ts` directly and redeploy.

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'cyber-orange': '#f6921e',  // Your orange
  'cyber-blue': '#1b75bb',    // Your blue
  'cyber-gray': '#4d4d4d',    // Your gray
  'cyber-light-gray': '#d9d9d9', // Your light gray
}
```

### Adding Logo

1. Place your logo image in `/public/brand/`
2. Update the header in `/app/page.tsx` to use the actual logo image

## Keyboard Shortcuts

- **Space** or **Enter** - Spin the wheel
- **Escape** - Close modals/drawers

## Browser Support

Works in all modern browsers that support:
- ES2017+
- Canvas API
- localStorage
- CSS Grid & Flexbox

## License

MIT (or your preferred license)

## Credits

Built with ❤️ for the cybersecurity community

Questions curated for security professionals, enthusiasts, and conference-goers.
