// app/page.js
'use client';

import Image from 'next/image';
import { useState } from 'react';
import FlowCanvas from '../components/FlowCanvas';
import ResizableSidebar from '../components/Sidebar';
import { Lobster } from 'next/font/google';

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`flex flex-col h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-stone-50 text-gray-900"}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/diagramflow.png"  // Ensure the image exists in your public folder
            alt="DiagramFlow Logo"
            width={40}
            height={45}
          />
          <h1 className={`${lobster.className} text-3xl font-bold text-center`}>
            DiagramFlow
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 border rounded transition hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex flex-1 gap-4">
        <ResizableSidebar darkMode={darkMode} />
        <FlowCanvas darkMode={darkMode} />
      </div>
    </div>
  );
}
