#!/bin/bash

# Create Vite + React project
npm create vite@latest my-app -- --template react
cd my-app

# Install React Router
npm install react-router-dom@latest

# Install Tailwind CSS and initialize config
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn-ui@latest init

# Install TanStack libraries
npm install @tanstack/react-query@latest @tanstack/react-table@latest @tanstack/react-virtual@latest
