"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DEFAULT_FILE: {
        '/index.html': {
            code: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Anon App</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body class="font-['Inter']">
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>`,
        },
        '/src/main.jsx': {
            code: `import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App'
    import '../App.css'
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )`,
        },
        '/App.css': {
            code: `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    @layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;
        --primary: 240 5.9% 10%;
        --primary-foreground: 0 0% 98%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 240 5.9% 10%;
        --radius: 0.75rem;
      }
    
      .dark {
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;
        --card: 240 10% 3.9%;
        --card-foreground: 0 0% 98%;
        --popover: 240 10% 3.9%;
        --popover-foreground: 0 0% 98%;
        --primary: 0 0% 98%;
        --primary-foreground: 240 5.9% 10%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 240 3.7% 15.9%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 240 4.9% 83.9%;
      }
    }
    
   
    
    .animate-in {
      animation: animate-in 0.5s ease-out;
    }
    
    @keyframes animate-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
        `,
        },
        '/tailwind.config.js': {
            code: `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }`,
        },
        '/postcss.config.js': {
            code: `
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
        `,
        },
        '/vite.config.js': {
            code: `
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    
    export default defineConfig({
      plugins: [react()],
    })
        `,
        },
        '/package.json': {
            code: `{
      "name": "anon_new",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "vite --host",
        "build": "vite build",
        "preview": "vite preview"
      },
      "type":"module",
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "autoprefixer": "^10.4.0",
        "postcss": "^8.4.0",
        "tailwindcss": "^3.4.1",
        "uuid4": "^2.0.3",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "lucide-react": "^0.469.0",
        "react-router-dom": "^7.1.1",
        "date-fns": "^4.1.0",
         "@faker-js/faker": "^9.7.0",
        "framer-motion": "^12.0.6",
        "locomotive-scroll": "^5.0.0-beta.21",
        "@permaweb/aoconnect": "^0.0.63",
        "arweave": "^1.15.5",
        "firebase": "^11.1.0",
        "@google/generative-ai": "^0.21.0",
        "react-chartjs-2": "^5.3.0",
        "chart.js": "^4.4.7",
        "axios": "^1.7.9",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.0.0",
        "@tailwindcss/typography": "^0.5.10"
      },
      "devDependencies": {
        "vite": "^5.0.0",
        "@vitejs/plugin-react": "^4.0.0"
      }
    }`,
        },
    },
    DEPENDANCY: {
        postcss: '^8',
        tailwindcss: '^3.4.1',
        autoprefixer: '^10.0.0',
        uuid4: '^2.0.3',
        'tailwind-merge': '^2.4.0',
        'tailwindcss-animate': '^1.0.7',
        'lucide-react': '^0.469.0',
        'react-router-dom': '^7.1.1',
        'date-fns': '^4.1.0',
        'framer-motion': '^12.0.6',
        'locomotive-scroll': '^5.0.0-beta.21',
        '@permaweb/aoconnect': '^0.0.63',
        arweave: '^1.15.5',
        firebase: '^11.1.0',
        '@google/generative-ai': '^0.21.0',
        'react-chartjs-2': '^5.3.0',
        'chart.js': '^4.4.7',
        'axios': '^1.7.9',
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.0.0',
        '@tailwindcss/typography': '^0.5.10',
    },
};
