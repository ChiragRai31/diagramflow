// components/FlowCanvas.jsx
'use client';

import { useState, useRef } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import useFlowStore from '../store/useFlowStore';
import EditableNode from './EditableNode';
import ContextMenu from './ContextMenu';
import ContextMenuEdge from './ContextMenuEdge';
import { toPng, toSvg } from 'html-to-image';

const nodeTypes = { 
  flowtext: EditableNode,
  rectangle: EditableNode,
  ellipse: EditableNode,
  diamond: EditableNode,
  flowStart: EditableNode,
  flowProcess: EditableNode,
  flowDecision: EditableNode,
  flowInputOutput: EditableNode,
  flowPredefined: EditableNode,
  flowConnector: EditableNode,
  flowData: EditableNode,
  flowDocument: EditableNode,
  flowManual: EditableNode,
  flowPreparation: EditableNode,
  flowStored: EditableNode,
  flowMerge: EditableNode,
};

const FlowCanvas = ({ darkMode }) => {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);

  const [menu, setMenu] = useState(null);
  const [edgeMenu, setEdgeMenu] = useState(null);
  const containerRef = useRef(null);

  // Grid type: 'lines', 'dots', or 'none'
  const [gridType, setGridType] = useState('lines');
  const toggleGridType = () => {
    if (gridType === 'lines') setGridType('dots');
    else if (gridType === 'dots') setGridType('none');
    else setGridType('lines');
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    setMenu({
      id: node.id,
      position: { x: event.clientX - rect.left, y: event.clientY - rect.top },
    });
  };

  const onEdgeContextMenu = (event, edge) => {
    event.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    setEdgeMenu({
      id: edge.id,
      position: { x: event.clientX - rect.left, y: event.clientY - rect.top },
    });
  };
   // Download as PNG function.
   const downloadPNG = () => {
    if (containerRef.current === null) return;
    toPng(containerRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flowchart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating PNG:', err);
      });
  };

  // Download as SVG function.
  const downloadSVG = () => {
    if (containerRef.current === null) return;
    toSvg(containerRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flowchart.svg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating SVG:', err);
      });
  };

  return (
    <div
      ref={containerRef}
      className={`h-full w-full rounded-lg shadow-inner relative ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        fitView
      >
        {gridType !== 'none' && (
          <Background variant={gridType} gap={16} size={1} />
        )}
        <Controls
          style={{
            position: 'absolute',
            bottom: 100,
            left: -10,
            zIndex: 4,
            background: darkMode ? "#333" : "#fff",
            border: darkMode ? "1px solid #444" : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <MiniMap 
          nodeColor={(node) => node.data?.color || (darkMode ? "#444" : "#eee")}
          nodeStrokeColor={(node) => darkMode ? "#888" : "#ccc"}
        />
      </ReactFlow>

      {/* Grid toggle button at bottom left */}
      <div className="absolute bottom-20 left-2 z-50">
        <button
          onClick={toggleGridType}
          className={`px-3 py-1 border rounded bg-white dark:bg-gray-50 dark:text-gray-900 `}
        >
          {`Grid: ${gridType}`}
        </button>
      </div>
          {/* Download buttons */}
      <div className="absolute top-1 right-1 z-50 flex flex-col gap-2">
        <button
          onClick={downloadPNG}
          className="px-4 py-2 border rounded bg-white dark:bg-gray-100 dark:text-gray-900"
        >
          Download PNG
        </button>
        <button
          onClick={downloadSVG}
          className="px-4 py-2 border rounded bg-white dark:bg-gray-100 dark:text-gray-900"
        >
          Download SVG
        </button>
      </div>
      {menu && (
        <ContextMenu
          position={menu.position}
          nodeId={menu.id}
          onClose={() => setMenu(null)}
          darkMode={darkMode}
        />
      )}

      {edgeMenu && (
        <ContextMenuEdge
          position={edgeMenu.position}
          edgeId={edgeMenu.id}
          onClose={() => setEdgeMenu(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default FlowCanvas;
