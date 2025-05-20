# PureScript Landing Page

A minimal landing page built with PureScript and Halogen.

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- PureScript (install via npm: `npm install -g purescript`)
- Spago (install via npm: `npm install -g spago`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Initialize the PureScript project:
```bash
spago init
```

3. Build the project:
```bash
npm run build
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `src/Main.purs` - Main PureScript module with Halogen component
- `index.html` - HTML entry point
- `index.js` - JavaScript entry point
- `style.css` - Styles for the landing page
- `spago.dhall` - PureScript package configuration
- `package.json` - Node.js project configuration

## Development

To make changes to the PureScript code:

1. Edit the files in the `src` directory
2. Run `npm run build` to compile the changes
3. Refresh your browser to see the updates

## Building for Production

To create a production build:

```bash
npm run build
```

The compiled files will be in the `dist` directory. 