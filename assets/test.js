const searchInputGraph = document.getElementById('search_input');

function fetchData() {
	// 12 Data API Key
	const apiKey = 'b3653483401543c5a9c34983f41185fb';

	// Get user input for symbol
	const symbols = searchInputGraph.value;
	console.log(symbols);

	// Desired interval for the data.
	const interval = '1day';
	console.log(interval);

	// API URL
	const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=${interval}&apikey=${apiKey}`;

    // APILogoURL
    const apiLogoUrl = `https://api.twelvedata.com/logo?symbol=${symbols}&apikey=${apiKey}`;

    //   API Crypto URL
    const apiCryptoUrl = `https://api.twelvedata.com/cryptocurrencies?symbol=${symbols}&apikey=${apiKey}`;

	// The API Request
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			// Displays the retrieved data in console
			console.log(data);
			if (data.error && data.error.code === 400) {
				// Symbol not found, call cryptocurrency function
				fetchCryptocurrencies();
			} else {
			plotGraphAndDisplayData(data);
			}
		})
		.catch((error) => {
			// Displays any errors that occur during the API request in the console
			console.error('Error:', error);
		});

    // APILogoURL Request
    fetch(apiLogoUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
	const logoImage = document.getElementById('logoImage');

	if (data.url === undefined) {
		// Symbol not found, call crypto logo URL
		const logoUrl = data.logo_base;
		console.log(logoUrl);
    logoImage.src = logoUrl;
    logoImage.alt = "Crypto Logo";
	} else {
	const logoUrl = data.url;
    logoImage.src = logoUrl;
    logoImage.alt = "Company Logo";
	}
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function fetchCryptocurrencies() {
	fetch('https://api.twelvedata.com/cryptocurrencies')
		.then((response) => response.json())
		.then((data) => {
			// Process cryptocurrency data here
			console.log(data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

function plotGraphAndDisplayData(data) {
	plotGraph(data);
	displayArray0Data(data);
}

// Function to plot the graph
function plotGraph(data) {
	const closeData = data.values.map((item) => item.close);
	const datetimeData = data.values.map((item) => item.datetime);

	const graphData = [
		{
			x: datetimeData,
			y: closeData,
			type: 'scatter',
			mode: 'lines+markers',
			marker: { size: 6 },
			line: { shape: 'spline' },
		},
	];

	const layout = {
		title: 'Close Data',
		xaxis: { title: 'Date' },
		yaxis: { title: 'Close Value' },
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
	const currentDate = new Date().toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	currentDateElement.textContent = currentDate;

	document.getElementById('openData').value = openData;
	document.getElementById('highData').value = highData;
	document.getElementById('lowData').value = lowData;
	document.getElementById('closeData').value = closeData;
	document.getElementById('array0Data').classList.remove('d-none');
}

// Helper function to format currency with two decimal places
function formatCurrency(value) {
	return parseFloat(value).toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
	const searchButtonEl = document.getElementById('search_button');
	searchButtonEl.addEventListener('click', function () {
		fetchData();
	});
});
