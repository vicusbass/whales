<script lang="ts">
  import { onMount } from 'svelte';
  import { getChartData } from '../utils/whaleTreeData';
  import type { ChartConfiguration } from 'chart.js';

  // Props
  export let width = '100%';
  export let height = '800px'; // Increased height for better viewing of the larger tree

  let chartCanvas: HTMLCanvasElement;
  let chart: any; // Use any type to avoid TypeScript errors

  // Define a cleanup function outside onMount to satisfy TypeScript
  function cleanup() {
    if (chart) {
      chart.destroy();
    }
  }

  onMount(() => {
    // We need to wait for the client-side rendering
    if (typeof window === 'undefined') return cleanup;

    // Use setTimeout to ensure the DOM is fully rendered
    setTimeout(async () => {
      try {
        // Import Chart.js and plugins
        const { Chart } = await import('chart.js/auto');
        const ChartDataLabels = await import('chartjs-plugin-datalabels');
        
        // Import chartjs-chart-graph
        const graphModule = await import('chartjs-chart-graph');
        
        // Following the exact pattern from the documentation
        // Register the plugins globally
        Chart.register(ChartDataLabels.default);
        // Register all chart-graph components
        Chart.register(...Object.values(graphModule));
        
        // Get the chart data
        const data = getChartData();

        // Create the chart configuration exactly as shown in the documentation
        const config = {
          type: 'tree',
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            tree: {
              orientation: 'vertical',
              nodeSeparation: 300,
              levelSeparation: 200,
            },
            layout: {
              padding: {
                left: 60,
                top: 60,
                bottom: 60,
                right: 60,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                align: 'bottom',
                anchor: 'end',
                offset: 8,
                formatter: function(value: any) {
                  // Wrap long text for better readability
                  const name = value.name || '';
                  if (name.length > 20) {
                    return name.substring(0, 20) + '...';
                  }
                  return name;
                },
                color: '#000',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 4,
                padding: 6,
                font: {
                  size: 10,
                  weight: 'normal'
                },
                textAlign: 'center',
              },
              tooltip: {
                callbacks: {
                  label: function(context: any) {
                    const node = context.raw;
                    return node.name;
                  }
                }
              }
            },
          },
          plugins: [ChartDataLabels.default],
        } as any; // Type assertion to bypass TypeScript errors

        // Create the chart
        if (chartCanvas) {
          chart = new Chart(chartCanvas, config);
        }
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
    }, 100);

    return cleanup;
  });
</script>

<div style="width: {width}; height: {height};">
  <canvas bind:this={chartCanvas}></canvas>
</div>

<style>
  div {
    position: relative;
    margin: auto;
  }
</style>
