<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
      
    export let chartData;
    let chartInstance;
  
    onMount(() => {
      const ctx = document.getElementById('radar');
      chartInstance = new Chart(ctx, {
        type: 'radar',
        data: chartData,
      });
  
      // Update chart data every 100ms
      const updateInterval = setInterval(() => {
        addNewData(chartInstance);
      }, 500);
  
      // onDestroy(() => {
      //   clearInterval(updateInterval);
      // });
    });
  
    function addNewData(chart) {
      const newLabel = `Label ${chart.data.labels.length + 1}`;
      const newData = Math.floor(Math.random() * 100);
      
      chart.data.labels.push(newLabel);
      chart.data.datasets.forEach(dataset => {
        dataset.data.push(newData);
      });
      chart.update();
    }
  </script>
  
  <canvas id="radar" width="100%" height="100%"></canvas>