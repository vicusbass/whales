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
  common_name?: string;
}

interface WhaleData {
  nodes: WhaleNode[];
}

// Generate tree view HTML for whale taxonomy
export function generateWhaleTreeView(): string {
  const typedWhaleData = whaleData as unknown as WhaleData;
  
  // Include all nodes (order, suborder, family, genus, species)
  const nodes = typedWhaleData.nodes;
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
        case 'order': return 'icon-[tabler--crown]';
        case 'suborder': return 'icon-[tabler--git-branch]';
        case 'family': return 'icon-[tabler--users]';
        case 'genus': return 'icon-[tabler--dna]';
        case 'species': return `<svg class="w-5 h-5" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M944.7 435.7c11.5 13.5 16.4 31.2 13.6 48.6 0 0.2 0 0.4-0.1 0.5-10.8 65.6-41.5 125.2-88.7 172.3-25.2 25.2-54.2 45.7-85.7 61.1-31.5 15.3-65.5 25.4-100.7 29.6-6 12.4-16.4 22.5-29.4 27.9l-169 71.2c-6.1 2.1-12 1-14.2 0.1-4.6-1.9-8.2-5.5-10.1-10-12.7-30.1-13.1-62.3-3.6-91.1-69.4-11.2-133.1-45.2-181.4-97.4-54.5-58.8-84.5-135.4-84.5-215.7V328.5c0-4.3 0.6-8.5 1.6-12.5h-32.6c-52.8 0-95.7-42.9-95.7-95.7v-25.6c0-10.3 8.3-18.6 18.6-18.6h55.8c41 0 78.3 20.9 100.4 53.4 22.1-32.4 59.4-53.4 100.4-53.4h55.8c10.3 0 18.6 8.3 18.6 18.6v25.6c0 52.8-42.9 95.7-95.7 95.7h-29.5c0.3 1.1 0.6 2.2 0.8 3.3 10.4 55 58.7 95 114.9 95h494.2c17.7 0 34.6 7.8 46.2 21.4z" fill="currentColor"/>
          <path d="M916.4 459.8c1.6 1.9 2.9 4 3.8 6.2-133.9 23.7-240.8 126.5-268.9 260.7 0 0.2-0.1 0.4-0.1 0.7-1.4 6.3-5.8 11.6-11.8 14.1l-150.2 63.3c-8.5-42.4 13.7-86.5 55.1-104 9.5-4 13.9-14.9 9.9-24.3-4-9.5-14.9-13.9-24.3-9.9-23 9.7-41.8 25.3-55.3 44.3-65.8-7.8-126.5-38.7-171.9-87.6-48.2-51.9-74.7-119.5-74.7-190.4V328.5c0-3.4 1.3-6.5 3.6-8.8 2.4-2.4 5.5-3.7 8.9-3.7 6 0 11.2 4.3 12.3 10.3 13.7 72.6 77.4 125.2 151.4 125.2h494.2c6.9-0.1 13.5 3 18 8.3z" fill="currentColor" opacity="0.8"/>
        </svg>`;
        default: return 'icon-[tabler--circle]';
      }
    };
    
    const getColor = (type: string) => {
      switch (type) {
        case 'order': return 'text-blue-800';
        case 'suborder': return 'text-orange-600';
        case 'family': return 'text-green-600';
        case 'genus': return 'text-purple-600';
        case 'species': return 'text-teal-600';
        default: return 'text-gray-600';
      }
    };
    
    if (hasChildren) {
      return `
        <div class="accordion-item" role="treeitem" data-tree-view-item='{"value": "${node.id}", "isDir": true}' data-tree-level="${level}">
          <div class="accordion-heading">
            <div class="flex items-center gap-2 w-full">
              <button class="accordion-toggle flex items-center justify-center w-6 h-6">
                <span class="icon-[tabler--plus] plus-icon text-base-content/80 size-4 transition-all duration-300"></span>
                <span class="icon-[tabler--minus] minus-icon text-base-content/80 size-4 transition-all duration-300 hidden"></span>
              </button>
              ${node.type === 'species' ? 
                `<span class="${getColor(node.type)}">${getIcon(node.type)}</span>` :
                `<span class="${getIcon(node.type)} ${getColor(node.type)} w-5 h-5"></span>`
              }
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
            ${node.type === 'species' ? 
              `<span class="${getColor(node.type)}">${getIcon(node.type)}</span>` :
              `<span class="${getIcon(node.type)} ${getColor(node.type)} w-5 h-5"></span>`
            }
            ${node.type === 'species' ? 
              `<a href="/species/${node.id}" class="${getColor(node.type)} hover:underline hover:text-teal-800 transition-colors">
                ${node.common_name ? `${node.label} - ${node.common_name}` : node.label}
              </a>` :
              `<span class="${getColor(node.type)}">
                ${node.label}
              </span>`
            }
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