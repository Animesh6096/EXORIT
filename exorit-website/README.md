
# EXORIT Website

A modern, responsive company website for EXORIT, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- ⚡ Fast development with Vite
- 🎨 Styled using Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design
- 🧩 Modular React components
- ✨ Animations with Framer Motion
- 📝 Linting with ESLint and TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
cd exorit-website
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

### Build

```bash
npm run build
# or
yarn build
```

### Lint

```bash
npm run lint
# or
yarn lint
```

## Project Structure

```
exorit-website/
  ├── public/           # Static assets
  ├── src/              # Source code
  │   ├── components/   # Reusable React components
  │   ├── pages/        # Page components
  │   ├── layouts/      # Layout components
  │   ├── contexts/     # React context providers
  │   └── assets/       # Images and other assets
  ├── tailwind.config.js
  ├── vite.config.ts
  └── package.json
```

## Deployment

This project is ready to deploy on platforms like Netlify or Vercel. A sample `netlify.toml` is included.

## License

MIT

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
