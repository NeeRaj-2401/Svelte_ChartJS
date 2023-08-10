function generateRandomData(chartType: String) {
    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
    const data = labels.map(() => Math.floor(Math.random() * 100));
    
    return {
      labels: labels,
      datasets: [
        {
          label: 'Random Data',
          data : data,
          backgroundColor: chartType === 'Pie' ? ['red', 'blue', 'green', 'orange', 'purple'] : 'blue',
          borderColor: 'blue',
          borderWidth: 0.5,
        },
      ],
    };
  }


export { generateRandomData };
  