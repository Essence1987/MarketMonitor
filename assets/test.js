function fetchData() {
  // 12 Data API Key 
  const apiKey = 'b3653483401543c5a9c34983f41185fb';

  // Get user input for symbol
  const symbolInput = document.getElementById("symbolInput");
  const symbols = symbolInput.value;
  console.log(symbols);

  // Desired interval for the data. 
  const interval = '1day';
  console.log(interval);

  // API URL
  const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=${interval}&apikey=${apiKey}`;
  console.log(apiUrl);

  // The API Request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Displays the retrieved data in console
      console.log(data);
      plotGraphAndDisplayData(data);
    })
    .catch(error => {
      // Displays any errors that occur during the API request in the console
      console.error('Error:', error);
    });
}

function plotGraphAndDisplayData(data) {
  plotGraph(data);
  displayArray0Data(data);
}

// Function to plot the graph
function plotGraph(data) {
  const closeData = data.values.map(item => item.close);
  const datetimeData = data.values.map(item => item.datetime);

  const graphData = [{
    x: datetimeData,
    y: closeData,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { size: 6 },
    line: { shape: 'spline' }
  }];

  const layout = {
    title: 'Close Data',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Close Value' }
  };

  Plotly.newPlot('graph', graphData, layout);
}


// Function to display data for Array 0
function displayArray0Data(data) {
  const array0Data = data.values[0];
  const openData = formatCurrency(array0Data.open);
  const highData = formatCurrency(array0Data.high);
  const lowData = formatCurrency(array0Data.low);
  const closeData = formatCurrency(array0Data.close);
  const currentDateElement = document.getElementById('currentDate'); // Add this line
  const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

  currentDateElement.textContent = currentDate;

  document.getElementById('openData').value = openData;
  document.getElementById('highData').value = highData;
  document.getElementById('lowData').value = lowData;
  document.getElementById('closeData').value = closeData;
  document.getElementById('array0Data').classList.remove('hidden');
}


// Helper function to format currency with two decimal places
function formatCurrency(value) {
  return parseFloat(value).toFixed(2);
}

document.addEventListener("DOMContentLoaded", function() {
  const searchButtonEl = document.getElementById("searchButton");
  searchButtonEl.addEventListener("click", function() {
    fetchData();
  });
});