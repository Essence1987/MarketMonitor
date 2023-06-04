// Define variable name for API token
var stockNews_api_token = 'JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN';

// Define variable name for selectors
const searchButtonEl = document.querySelector('#search_button');
const recentNewsFeedEl = document.querySelector('#main_recent-news');
const current_graph = document.querySelector('#current_graph');
const searchNewsEl = document.querySelector('#search_news');
const searchInput = document.getElementById('search_input');
const recommendNewsEl = document.getElementById('recommended_news');
const divCard = document.querySelector('.col');
const historyEl = document.getElementById('history');
const clearHistoryEl = document.getElementById('history-button');

let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

function init() {
	// Get history from local storage if any
	searchButtonEl.addEventListener('click', function () {
		const searchTerm = searchInput.value;
		searchHistory.push(searchTerm);
		localStorage.setItem('search', JSON.stringify(searchHistory));
		renderSearchHistory();
	});

	// Clear History button
	clearHistoryEl.addEventListener('click', function () {
		localStorage.clear();
		searchHistory = [];
		renderSearchHistory();
	});

	// Creates elements for each search
	function renderSearchHistory() {
		historyEl.innerHTML = '';
		for (let i = 0; i < searchHistory.length; i++) {
			const historyItem = document.createElement('input');
			historyItem.setAttribute('type', 'text');
			historyItem.setAttribute('readonly', true);
			historyItem.setAttribute('class', 'form-control d-block bg-white');
			historyItem.setAttribute('style', 'cursor: pointer;');
			historyItem.setAttribute('value', searchHistory[i]);
			historyItem.addEventListener('click', function () {
				fetchStockNewsApi(historyItem.value);
			});
			// Remove the oldest item if history exceeds 4 items
			if (searchHistory.length > 4) {
				searchHistory.shift();
			}
			historyEl.append(historyItem);
		}
	}

	// Event listener for the search bar
	searchButtonEl.addEventListener('click', function () {
		// Hides the recent news feed
		recentNewsFeedEl.classList.add('d-none');
		// Shows the searched news feed
		searchNewsEl.classList.remove('d-none');
		// Shows the searched array data
		document.getElementById('array0Data').classList.remove('d-none');
		// Runs the fetchStockNewsAPI function
		fetchStockNewsApi();
	});

	// fetchStockNewsAPI function setup
	function fetchStockNewsApi() {
		var inputValue = searchInput.value;

		fetch(
			'https://api.marketaux.com/v1/news/all?symbols=' +
				inputValue +
				'&filter_entities=true&limit=3&language=en&api_token=' +
				stockNews_api_token
		)
			.then(function (response) {
				if (!response.ok) {
					throw new Error('Error ' + response.status);
				}
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				for (i = 0; i < 3; i++) {
					var articleDescription = data.data[i].description;
					var articleImg = data.data[i].image_url;
					var articleTitle = data.data[i].title;
					var articleUrl = data.data[i].url;

					document.querySelector('.card-title' + (i + 1)).innerHTML =
						articleTitle;
					document.querySelector('.card-text' + (i + 1)).innerHTML =
						articleDescription;
					document.querySelector('.card-img-top' + (i + 1)).src = articleImg;
					document.querySelector('.card-url' + (i + 1)).href = articleUrl;
				}
			})
			.catch(function (error) {
				console.log('API error:', error);
				recentNewsFeedEl.classList.remove('d-none');
				searchNewsEl.classList.add('d-none');
			});
	}
}

init();
