'use client';

import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import useFlowStore from '../store/useFlowStore';

const EditableNode = ({ id, data, selected }) => {
  const [label, setLabel] = useState(data.label || "");
  const [textColorMenuOpen, setTextColorMenuOpen] = useState(false);

  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);
  const updateNodeSize = useFlowStore((state) => state.updateNodeSize);
  const updateNodeTextColor = useFlowStore((state) => state.updateNodeTextColor);

  useEffect(() => {
    updateNodeLabel(id, label);
  }, [label, id, updateNodeLabel]);

  const handleResize = useCallback(
    (event, params) => {
      updateNodeSize(id, params.width, params.height);
    },
    [id, updateNodeSize]
  );

  // Container uses node dimensions
  const outerStyle = {
    width: data.width,
    height: data.height,
    position: 'relative',
  };
  const outerClass = 'relative flex justify-center items-center';

  // Base style
  let innerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'visible',
  };

  // Set text color (default black)
  const textColor = data.textColor || 'black';

  // Decide shape-based styling
  switch (data.shape) {
    case 'flowText':
      // Force background fully transparent
      innerStyle.backgroundColor = 'rgba(0,0,0,0)';
      innerStyle.boxShadow = 'none';
      break;
    case 'ellipse':
    case 'flowStart':
      innerStyle.backgroundColor = data.color;
      innerStyle.borderRadius = '50%';
      innerStyle.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
      break;
    case 'diamond':
    case 'flowDecision':
      innerStyle.backgroundColor = data.color;
      innerStyle.clipPath = 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)';
      innerStyle.filter = 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))';
      break;
    case 'flowInputOutput':
      innerStyle.backgroundColor = data.color;
      innerStyle.transform = 'skewX(-20deg)';
      innerStyle.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
      break;
    case 'flowData':
      innerStyle.backgroundColor = data.color;
      innerStyle.clipPath = 'polygon(10% 0%,100% 0%,90% 100%,0% 100%)';
      innerStyle.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
      break;
    case 'rectangle':
    default:
      innerStyle.backgroundColor = data.color;
      innerStyle.borderRadius = '4px';
      innerStyle.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
      break;
  }

  // For flowInputOutput, wrap the text area so text isn't skewed
  let contentElement;
  if (data.shape === 'flowInputOutput') {
    contentElement = (
      <div
        style={{ transform: 'skewX(20deg)', width: '100%', height: '100%' }}
        className="flex justify-center items-center"
      >
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="text-center w-full bg-transparent outline-none resize-none overflow-hidden"
          style={{ color: textColor, border: 'none' }}
        />
      </div>
    );
  } else {
    // Normal shape or flowText
    contentElement = (
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="text-center w-full bg-transparent outline-none resize-none overflow-hidden"
        style={{ color: textColor, border: 'none' }}
      />
    );
  }

  const textColors = ['black', 'red', 'blue', 'green', 'orange', 'purple'];

  return (
    <div style={outerStyle} className={outerClass}>
      {selected && (
        <NodeResizer
          color="#3b82f6"
          minWidth={50}
          minHeight={50}
          onResize={handleResize}
        />
      )}
      <div style={innerStyle} className="relative">
        {contentElement}
      </div>
      {/* Connection handles */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        style={{ transform: 'translate(-50%,-50%)' }}
        className={`transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={{ transform: 'translate(-50%,50%)' }}
        className={`transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{ transform: 'translate(-50%,-50%)' }}
        className={`transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{ transform: 'translate(50%,-50%)' }}
        className={`transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {selected && (
        <div className="absolute top-1 right-1">
          <button
            onClick={() => setTextColorMenuOpen(!textColorMenuOpen)}
            className="w-6 h-6 rounded-full border border-gray-400"
            style={{ backgroundColor: textColor }}
          />
          {textColorMenuOpen && (
            <div className="absolute top-7 right-0 bg-white border rounded shadow-md p-1 z-10">
              {textColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    updateNodeTextColor(id, color);
                    setTextColorMenuOpen(false);
                  }}
                  className="w-4 h-4 rounded-full m-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableNode;
