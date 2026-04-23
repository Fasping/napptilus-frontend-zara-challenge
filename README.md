# Zara Web Challenge - Napptilus

A clean and minimalist smartphone catalog application inspired by the Zara aesthetic. This project was built as a frontend technical challenge, focusing on high-fidelity UI, performance, and accessibility.

## Features

- **Product Listing**: Browse the full catalog of smartphones.
- **Search**: Real-time filtering to find specific models quickly.
- **Product Detail**: Deep dive into specs, with color and storage selection.
- **Cart with Persistence**: Add items to your bag and find them there even after a refresh (thanks to localStorage).
- **Responsive Design**: Carefully crafted layouts for both mobile and desktop views.

## Challenge Requirements

- [x] Product search & listing
- [x] High-fidelity Product Detail Page
- [x] Functional Shopping Cart
- [x] Data persistence
- [x] Responsive "Zara-style" UI
- [x] Automated testing (Vitest)
- [x] Accessibility (ARIA & Semantic HTML)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **React Router 7** (Navigation)
- **Context API** (State management)
- **Vanilla CSS** (Custom design system)
- **Vitest** + **React Testing Library**

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development mode**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

5. **Run tests**:
   ```bash
   npm run test
   ```

## Environment Variables

Create a `.env` file in the root directory (you can use `.env.example` as a template):

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_API_KEY=your-secret-api-key
```

## Development vs Production

- **`npm run dev`**: Starts the Vite dev server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles and optimizes the code for production, outputting it to the `/dist` folder.
- **`npm run preview`**: Locally serves the production build to verify everything works as expected before deploying.

## Notes

- **Simplicity first**: The goal was to keep the architecture clean and practical, avoiding overengineering while maintaining high code quality.
- **AI-Assisted**: I used AI tools to speed up some repetitive tasks like CSS tweaking and boilerplate testing, but all logic, architecture, and final design decisions were made manually to ensure they meet the project's requirements.
