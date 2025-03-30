// components/ResizableSidebar.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import useFlowStore from '../store/useFlowStore';
import {
  Cube,
  Circle,
  Play,
  FileText,
  Link2,
  Database,
  GitMerge,
  Tool,
  Settings,
  Archive,
} from 'lucide-react';

// Fallbacks (if icons not found):
const CubeIcon = Cube || (() => <span className="inline-block w-5 h-5">□</span>);
const CircleIcon = Circle || (() => <span className="inline-block w-5 h-5">○</span>);
const PlayIcon = Play || (() => <span className="inline-block w-5 h-5">▶</span>);
const FileTextIcon = FileText || (() => <span className="inline-block w-5 h-5">📄</span>);
const Link2Icon = Link2 || (() => <span className="inline-block w-5 h-5">🔗</span>);
const DatabaseIcon = Database || (() => <span className="inline-block w-5 h-5">💽</span>);
const GitMergeIcon = GitMerge || (() => <span className="inline-block w-5 h-5">⇄</span>);
const ToolIcon = Tool || (() => <span className="inline-block w-5 h-5">🛠</span>);
const SettingsIcon = Settings || (() => <span className="inline-block w-5 h-5">⚙</span>);
const ArchiveIcon = Archive || (() => <span className="inline-block w-5 h-5">📦</span>);

const ResizableSidebar = ({ darkMode }) => {
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing.current && sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        let newWidth = e.clientX - rect.left;
        if (newWidth < 200) newWidth = 200;
        if (newWidth > 600) newWidth = 600;
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const addNode = useFlowStore((state) => state.addNode);
  const randomPosition = () => ({
    x: Math.random() * 250,
    y: Math.random() * 250,
  });

  // Helper function for monochrome or dark style
  const getButtonClass = () =>
    darkMode
      ? "bg-gray-800 text-white border border-white hover:bg-gray-700 transition mb-2 p-2 rounded flex items-center gap-2"
      : "bg-white text-black border border-black hover:bg-gray-200 transition mb-2 p-2 rounded flex items-center gap-2";

  const getHeadingClass = () =>
    darkMode
      ? "text-xl font-semibold text-gray-200 mb-2 flex items-center gap-2"
      : "text-xl font-semibold text-black mb-2 flex items-center gap-2";

  return (
    <div
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}px` }}
      className={`relative h-screen ${darkMode ? "bg-gradient-to-b from-gray-800 to-gray-700" : "bg-gradient-to-b from-gray-50 to-gray-100"} p-2`}
    >
      <div className={`h-full overflow-y-auto p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-4 border-b pb-2 ${darkMode ? "text-white" : "text-black"}`}>
          Flow Elements
        </h1>

        {/* Basic Shapes Section */}
        <section className="mb-6">
          <h2 className={getHeadingClass()}>
            <CubeIcon className="w-5 h-5 text-blue-500" /> Basic Shapes
          </h2>
          <div className="flex flex-col gap-2">
            <button
              className={getButtonClass()}
              onClick={() => addNode('rectangle', randomPosition())}
            >
              <CubeIcon className="w-4 h-4" /> Rectangle
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('ellipse', randomPosition())}
            >
              <CircleIcon className="w-4 h-4" /> Ellipse
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('diamond', randomPosition())}
            >
              <span className="w-4 h-4 inline-block text-lg">◈</span> Diamond
            </button>
          </div>
        </section>

        {/* Flowchart Elements Section */}
        <section className="mb-6">
          <h2 className={getHeadingClass()}>
            <PlayIcon className="w-5 h-5 text-indigo-500" /> Flowchart
          </h2>
          <div className="flex flex-col gap-2">
         
          
            {/* <button
              className={getButtonClass()}
              onClick={() => addNode('flowText', randomPosition())}
            >
              <FileTextIcon className="w-4 h-4" /> Add Text
            </button> */}
          
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowStart', randomPosition())}
            >
              <PlayIcon className="w-4 h-4" /> Start/End
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowProcess', randomPosition())}
            >
              <ToolIcon className="w-4 h-4" /> Process
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowDecision', randomPosition())}
            >
              <span className="w-4 h-4 inline-block text-lg">◈</span> Decision
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowInputOutput', randomPosition())}
            >
              <CircleIcon className="w-4 h-4" /> Input/Output
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowPredefined', randomPosition())}
            >
              <FileTextIcon className="w-4 h-4" /> Predefined Process
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowConnector', randomPosition())}
            >
              <Link2Icon className="w-4 h-4" /> Connector
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowData', randomPosition())}
            >
              <DatabaseIcon className="w-4 h-4" /> Data
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowDocument', randomPosition())}
            >
              <FileTextIcon className="w-4 h-4" /> Document
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowManual', randomPosition())}
            >
              <ToolIcon className="w-4 h-4" /> Manual Operation
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowPreparation', randomPosition())}
            >
              <SettingsIcon className="w-4 h-4" /> Preparation
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowStored', randomPosition())}
            >
              <ArchiveIcon className="w-4 h-4" /> Stored Data
            </button>
            <button
              className={getButtonClass()}
              onClick={() => addNode('flowMerge', randomPosition())}
            >
              <GitMergeIcon className="w-4 h-4" /> Merge
            </button>
          </div>
        </section>

        {/* Text-Only Element */}
        <section>
          
        </section>
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-gray-300"
      />
    </div>
  );
};

export default ResizableSidebar;
