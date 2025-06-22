// Import whale data with type assertion to avoid TypeScript errors
import whaleData from '../data/whales.json' assert { type: 'json' };

// Define interfaces for the whale data structure
interface WhaleNode {
  id: string;
  label: string;
  type: string;
  parent?: string;
  children?: string[];
  common_name?: string;
  species_count?: number;
  description?: string;
}

interface WhaleData {
  nodes: WhaleNode[];
  edges: Array<{source: string; target: string}>;
  summary: Record<string, number | string>;
}

// Define the node structure for the tree chart
export interface TreeNode {
  id: string;
  name: string;
  children?: string[];
  parent?: string | null;
  level?: number;
  nodeType?: string;
  commonName?: string;
}

// Function to transform the whale data into the format needed for the chart
export function getChartData() {
  // Map node types to levels for consistent visualization
  const typeLevelMap: Record<string, number> = {
    'order': 0,
    'suborder': 1,
    'family': 2,
    'genus': 3,
    'species': 4
  };

  // Create colors based on levels/types
  const levelColors: Record<number, string> = {
    0: '#002838', // Order
    1: '#ed7d00', // Suborder
    2: '#395c6b', // Family
    3: '#d94d15', // Genus
    4: '#889da6'  // Species
  };
  
  // Extract nodes from the data and type them correctly, excluding species
  const typedWhaleData = whaleData as unknown as WhaleData;
  const nodes = typedWhaleData.nodes
    .filter((node: WhaleNode) => node.type !== 'species') // Exclude species
    .map((node: WhaleNode) => ({
      id: node.id,
      name: node.label || node.id,
      commonName: node.common_name,
      children: node.children || [],
      parent: node.parent || null,
      level: typeLevelMap[node.type] || 0,
      nodeType: node.type
    }));
  
  // Create a mapping from node ID to array index
  const nodeIdToIndex = new Map<string, number>();
  nodes.forEach((node, index) => {
    nodeIdToIndex.set(node.id, index);
  });

  // Format the data for the chart - parent should be index, not ID
  const chartData = nodes.map((node) => {
    const parentIndex = node.parent ? nodeIdToIndex.get(node.parent) : undefined;
    
    return {
      name: node.nodeType === 'species' && node.commonName ? 
        `${node.name} - ${node.commonName}` : node.name,
      parent: parentIndex,
      level: node.level || 0,
      nodeType: node.nodeType
    };
  });

  return {
    labels: chartData.map(node => node.name),
    datasets: [
      {
        pointBackgroundColor: chartData.map(node => {
          const level = node.level || 0;
          return levelColors[level] || '#889da6';
        }),
        pointRadius: chartData.map(node => {
          // Decrease size by level, but ensure minimum size
          const baseSize = 10;
          const level = node.level || 0;
          return Math.max(baseSize - level * 1.5, 4);
        }),
        data: chartData,
      },
    ],
  };
}
