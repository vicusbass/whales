// Import whale data with type assertion to avoid TypeScript errors
import whaleData from '../data/whales.json' assert { type: 'json' };

// Define interfaces for the whale data structure
interface WhaleNode {
  id: string;
  label: string;
  type: string;
  parent?: string;
  children?: string[];
  species_count?: number;
}

interface WhaleData {
  nodes: WhaleNode[];
}

// Generate tree view HTML for whale taxonomy
export function generateWhaleTreeView(): string {
  const typedWhaleData = whaleData as unknown as WhaleData;
  
  // Filter out species and organize by hierarchy
  const nodes = typedWhaleData.nodes.filter(node => node.type !== 'species');
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  
  // Find root node (order level)
  const rootNode = nodes.find(node => node.type === 'order');
  if (!rootNode) return '';
  
  function renderNode(node: WhaleNode, level: number = 0): string {
    const hasChildren = node.children && node.children.length > 0;
    const childNodes = hasChildren ? (node.children || []).map(childId => nodeMap.get(childId)).filter(Boolean) : [];
    
    // Get appropriate icon based on type
    const getIcon = (type: string) => {
      switch (type) {
        case 'order': return '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 14l5.5-5.5L16 16l-5.5 5.5L5 16z"/></svg>';
        case 'suborder': return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>';
        case 'family': return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>';
        case 'genus': return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>';
        default: return '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/></svg>';
      }
    };
    
    const getColor = (type: string) => {
      switch (type) {
        case 'order': return 'text-blue-800';
        case 'suborder': return 'text-orange-600';
        case 'family': return 'text-green-600';
        case 'genus': return 'text-purple-600';
        default: return 'text-gray-600';
      }
    };
    
    if (hasChildren) {
      return `
        <div class="accordion-item" role="treeitem" data-tree-view-item='{"value": "${node.id}", "isDir": true}'>
          <div class="accordion-heading">
            <button class="accordion-toggle flex items-center justify-center w-6 h-6">
              <svg class="w-4 h-4 transition-transform duration-200 chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <div class="flex items-center gap-2">
              <span class="${getColor(node.type)}">${getIcon(node.type)}</span>
              <span class="font-medium ${getColor(node.type)}">${node.label}</span>
              ${node.species_count ? `<span class="text-xs bg-gray-100 px-2 py-1 rounded">${node.species_count} species</span>` : ''}
            </div>
          </div>
          <div class="accordion-content">
            <div class="tree-view-space">
              ${childNodes.map(child => renderNode(child as WhaleNode, level + 1)).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="py-2 pl-6" data-tree-view-item='{"value": "${node.id}", "isDir": false}'>
          <div class="flex items-center gap-2">
            <span class="${getColor(node.type)}">${getIcon(node.type)}</span>
            <span class="${getColor(node.type)}">${node.label}</span>
            ${node.species_count ? `<span class="text-xs bg-gray-100 px-2 py-1 rounded">${node.species_count} species</span>` : ''}
          </div>
        </div>
      `;
    }
  }
  
  return `
    <div data-tree-view="" class="max-w-4xl">
      ${renderNode(rootNode)}
    </div>
  `;
}