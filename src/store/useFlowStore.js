// store/useFlowStore.js
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';

const useFlowStore = create((set) => ({
  nodes: [],
  edges: [],

  addNode: (type, position) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: nanoid(),
          type, // this will be "rectangle", "ellipse", "diamond", etc.
          position,
          data: {
            label: `${type} node`,
            color: '#ffffff',
            width: 150,
            height: 50,
            shape: type, // save the shape type in data for rendering purposes
          },
          style: { width: 150, height: 50 },
        },
      ],
    })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          markerEnd: { type: 'arrowclosed' },
          style: { stroke: '#000', strokeWidth: 2 },
        },
        state.edges
      ),
    })),

  updateNodeLabel: (id, label) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      ),
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    })),

  updateNodeColor: (id, color) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, color } } : node
      ),
    })),

  updateNodeSize: (id, width, height) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, width, height },
              style: { width, height },
            }
          : node
      ),
    })),

  updateEdgeStyle: (id, newStyle) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              style: {
                ...(edge.style || {}),
                ...(newStyle.style || {}),
              },
              markerStart: newStyle.markerStart !== undefined ? newStyle.markerStart : edge.markerStart,
              markerEnd: newStyle.markerEnd !== undefined ? newStyle.markerEnd : edge.markerEnd,
            }
          : edge
      ),
    })),

  removeEdgeMarkers: (id, removeStart, removeEnd) =>
    set((state) => ({
      edges: state.edges.map((edge) => {
        if (edge.id === id) {
          const newEdge = { ...edge };
          if (removeStart) delete newEdge.markerStart;
          if (removeEnd) delete newEdge.markerEnd;
          return newEdge;
        }
        return edge;
      }),
    })),

  updateEdgeStrokeWidth: (id, strokeWidth) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              style: {
                ...(edge.style || {}),
                strokeWidth,
              },
            }
          : edge
      ),
    })),

  updateEdgeColor: (id, color) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              style: {
                ...(edge.style || {}),
                stroke: color,
              },
            }
          : edge
      ),
    })),
    updateNodeTextColor: (id, textColor) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, textColor } } : node
        ),
      })),
  deleteEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    })),
}));

export default useFlowStore;
 