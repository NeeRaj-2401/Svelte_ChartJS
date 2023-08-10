<script>
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import { generateRandomData } from '../routes/index';

  function generateSingleRandomData() {
    return Math.floor(Math.random() * 100);
  }

  let chartData = generateRandomData('bar');
  let chartInstance;

  onMount(() => {
    const ctx = document.getElementById('bar');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
    });

    // Update chart data every 1000ms
    const updateInterval = setInterval(() => {
      addNewData(chartInstance);
    }, 500);
  });

  function addNewData(chart) {
    if (chart.data.labels.length >= 10) {
      chart.data.labels.shift();
      chart.data.datasets.forEach(dataset => {
        dataset.data.shift();
      });
    }

    const newLabel = `Label ${chart.data.labels.length + 1}`;
    const newData = generateSingleRandomData();
    
    chart.data.labels.push(newLabel);
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(newData);
    });

    chart.update();
  }
</script>

<canvas id="bar" width="100%" height="100%"></canvas>