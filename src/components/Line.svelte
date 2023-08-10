<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { generateRandomData } from '../routes/index';

  function generateSingleRandomData() {
    return Math.floor(Math.random() * 100);
  }

  let chartData = generateRandomData('line');
  let chartInstance;

  onMount(() => {
    const ctx = document.getElementById('line');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
    });

    // Update chart data every 500ms
    const updateInterval = setInterval(() => {
      addNewData(chartInstance);
    }, 250);
  });

  function addNewData(chart) {
    if (chart.data.labels.length >= 15) {
      chart.data.labels.shift();
      chart.data.datasets.forEach(dataset => {
        dataset.data.shift();
      });
    }

    const newLabel = `Label ${chart.data.labels.length + 1}`;
    const newData = generateSingleRandomData();

    if (chart.data.labels.length === 0) {
      chart.data.labels.push(newLabel);
    } else {
      const lastLabel = chart.data.labels[chart.data.labels.length - 1];
      const labelNumber = Number(lastLabel.split(' ')[1]) + 1;
      chart.data.labels.push(`Label ${labelNumber}`);
    }

    chart.data.datasets.forEach(dataset => {
      dataset.data.push(newData);
    });

    chart.update();
  }
</script>

<canvas id="line" width="100%" height="100%"></canvas>