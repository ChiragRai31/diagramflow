This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).
# DiagramFlow

DiagramFlow is a **Next.js** application that lets you create, edit, and style flowcharts directly in the browser. Built on **React Flow**, it allows you to add and resize various node shapes (rectangle, ellipse, diamond, text-only, etc.), connect them with edges, and customize their colors and text. You can also toggle between light and dark modes, and download your flowchart as a PNG or SVG.

---

## Features

1. **Multiple Node Shapes**  
   - Rectangle, ellipse, diamond, parallelogram (flowData), text-only (flowText), etc.  
   - Custom styling for each shape, including skew transforms, clip-paths, shadows, and more.

2. **Multi-line Text Editing**  
   - Type directly in nodes, with text wrapping or overflowing (similar to Lucidchart).

3. **Edge Context Menus**  
   - Right-click edges to adjust arrow direction, stroke width, color, dotted line styles, and more.

4. **Light/Dark Mode**  
   - Toggle a button to switch between light and dark themes throughout the application.

5. **Download as Image**  
   - Export your flowchart as a PNG or SVG using [html-to-image](https://github.com/bubkoo/html-to-image).

6. **Resizable Sidebar**  
   - Drag to resize the left-hand sidebar, which contains buttons for creating new nodes.

---

## Tech Stack

- **Next.js** – A React framework for building fast, server-rendered applications.  
- **React Flow** – A powerful library for building node-based UIs and flowcharts in React.  
- **Tailwind CSS** (optional, depending on your styling) – Utility-first CSS framework.  
- **html-to-image** – Used for exporting the flowchart as PNG or SVG images.

---

## Getting Started Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Deployment

## Deploy on Render
1. Push your code to GitHub.
2. Log in to Render, create a new Web Service, and select your repository.
3. Configure:
    - Build Command: npm install && npm run build
    - Start Command: npm start (assuming your package.json has "start": "next start")
4. Render will build and deploy your project, giving you a live URL.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
