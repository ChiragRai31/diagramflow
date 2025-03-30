// components/ContextMenu.jsx
'use client';

import { useEffect, useState } from 'react';
import useFlowStore from '../store/useFlowStore';

const colors = ['#FFFFFF', '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF'];

const ContextMenu = ({ position, nodeId, onClose, darkMode }) => {
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const updateNodeColor = useFlowStore((state) => state.updateNodeColor);
  const updateNodeSize = useFlowStore((state) => state.updateNodeSize);

  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    window.addEventListener('click', onClose);
    return () => window.removeEventListener('click', onClose);
  }, [onClose]);

  const baseClass = darkMode
    ? "bg-gray-800 border border-gray-700 text-white"
    : "bg-white border border-gray-300 text-gray-900";

  return (
    <div
      style={{ top: position.y, left: position.x }}
      className={`absolute ${baseClass} shadow-lg rounded z-50 p-2`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={`block px-4 py-2 hover:${darkMode ? "bg-gray-600" : "bg-gray-200" }  w-full text-left`}
        onClick={() => setShowColors(!showColors)}
      >
        Change Color
      </button>

      {showColors && (
        <div className="flex gap-1 px-2 py-2">
          {colors.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded border"
              onClick={() => {
                updateNodeColor(nodeId, color);
                onClose();
              }}
            />
          ))}
        </div>
      )}

      <button
        className={`block px-4 py-2 hover:${darkMode ? "bg-red-600" : "bg-red-500"} hover:${darkMode ? "text-white" : ""} w-full text-left`}
        onClick={() => {
          deleteNode(nodeId);
          onClose();
        }}
      >
        Delete Node
      </button>
    </div>
  );
};

export default ContextMenu;
