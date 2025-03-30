// components/ContextMenuEdge.jsx
'use client';

import { useEffect, useState } from 'react';
import useFlowStore from '../store/useFlowStore';
import { ChevronDown, ChevronRight } from 'lucide-react';

const colors = ['#000000', '#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'];

const ContextMenuEdge = ({ position, edgeId, onClose, darkMode }) => {
  const updateEdgeStyle = useFlowStore((state) => state.updateEdgeStyle);
  const removeEdgeMarkers = useFlowStore((state) => state.removeEdgeMarkers);
  const updateEdgeStrokeWidth = useFlowStore((state) => state.updateEdgeStrokeWidth);
  const updateEdgeColor = useFlowStore((state) => state.updateEdgeColor);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);

  const [strokeMenuOpen, setStrokeMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('click', onClose);
    return () => window.removeEventListener('click', onClose);
  }, [onClose]);

  const setArrowDirection = (direction) => {
    if (direction === 'right') {
      updateEdgeStyle(edgeId, { markerEnd: { type: 'arrowclosed' }, style: {} });
      removeEdgeMarkers(edgeId, true, false);
    } else if (direction === 'left') {
      updateEdgeStyle(edgeId, { markerStart: { type: 'arrowclosed' }, style: {} });
      removeEdgeMarkers(edgeId, false, true);
    } else if (direction === 'none') {
      removeEdgeMarkers(edgeId, true, true);
    }
    onClose();
  };

  const setLineStyle = () => {
    updateEdgeStyle(edgeId, { style: { strokeDasharray: '5,5' } });
    onClose();
  };

  const setStrokeWidth = (width) => {
    updateEdgeStrokeWidth(edgeId, width);
    onClose();
  };

  const setColor = (color) => {
    updateEdgeColor(edgeId, color);
    onClose();
  };

  const handleDeleteEdge = () => {
    deleteEdge(edgeId);
    onClose();
  };

  const baseClass = darkMode
    ? "bg-gray-800 border border-gray-700 text-white"
    : "bg-white border border-gray-300 text-gray-900";

  return (
    <div
      style={{ top: position.y, left: position.x, maxHeight: '300px', overflowY: 'auto' }}
      className={`absolute ${baseClass} shadow-lg rounded z-50 w-44 p-2`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-2 py-1 text-sm font-semibold">Arrow Direction</div>
      <button
        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
        onClick={() => setArrowDirection('right')}
      >
        Right Arrow
      </button>
      <button
        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
        onClick={() => setArrowDirection('left')}
      >
        Left Arrow
      </button>
      <button
        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
        onClick={() => setArrowDirection('none')}
      >
        No Arrow
      </button>

      <div className="border-t my-1"></div>

      <div className="px-2 py-1 text-sm font-semibold">Line Style</div>
      <button
        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
        onClick={setLineStyle}
      >
        Dotted Line
      </button>

      <div className="border-t my-1"></div>

      <button
        className="flex justify-between px-4 py-2 hover:bg-gray-200 w-full text-left"
        onClick={() => setStrokeMenuOpen((prev) => !prev)}
      >
        Stroke Width
        {strokeMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {strokeMenuOpen && (
        <div className="bg-gray-50 border-t">
          {[1, 2, 3, 4, 5].map((width) => (
            <button
              key={width}
              className="block px-6 py-2 hover:bg-gray-200 w-full text-left text-sm"
              onClick={() => setStrokeWidth(width)}
            >
              {width}px
            </button>
          ))}
        </div>
      )}

      <div className="border-t my-1"></div>

      <button
        className="flex justify-between px-4 py-2 hover:bg-gray-200 w-full text-left"
        onClick={() => setColorMenuOpen((prev) => !prev)}
      >
        Color
        {colorMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {colorMenuOpen && (
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-t">
          {colors.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded border"
              onClick={() => setColor(color)}
            />
          ))}
        </div>
      )}

      <div className="border-t my-1"></div>
      
      <button
        className="block px-4 py-2 hover:bg-red-500 hover:text-white w-full text-left"
        onClick={handleDeleteEdge}
      >
        Delete Edge
      </button>
    </div>
  );
};

export default ContextMenuEdge;
