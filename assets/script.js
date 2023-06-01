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

// Event listener for the search bar
searchButtonEl.addEventListener('click', function () {
	// Hides the recent news feed
	recentNewsFeedEl.classList.add('d-none'),
		// Shows the searched news feed
		searchNewsEl.classList.remove('d-none');
	// Shows the searched array data
	document.getElementById('array0Data').classList.remove('d-none');
	// Runs the fetchStockNewsAPI function
	fetchStockNewsApi();
});

// fetchStockNewsAPI function setup
function fetchStockNewsApi() {
	// Define variable for input in the search bar
	var inputValue = searchInput.value;
	// Fetch API
	fetch(
		'https://api.marketaux.com/v1/news/all?symbols=' +
			inputValue +
			'&filter_entities=true&limit=3&language=en&api_token=' +
			stockNews_api_token
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			// For loop for the three article card for the searched symbol news
			for (i = 0; i < 3; i++) {
				// Define variable for the data received from the API
				var articleDescription = data.data[i].description;
				var articleImg = data.data[i].image_url;
				var articleTitle = data.data[i].title;
				var articleUrl = data.data[i].url;
				// Enters data received from the API to according placement
				document.querySelector('.card-title' + (i + 1)).innerHTML =
					articleTitle;
				document.querySelector('.card-text' + (i + 1)).innerHTML =
					articleDescription;
				document.querySelector('.card-img-top' + (i + 1)).src = articleImg;
				document.querySelector('.card-url' + (i + 1)).href = articleUrl;
			}
		});
}

// recommendNewsEl.style.display = 'd-none';
// function fetchSimilarStockNewsApi() {
// 	fetch(
// 		'https://api.marketaux.com/v1/news/similar/' +
// 			uuid +
// 			'?api_token=' +
// 			stockNews_api_token +
// 			'&language=en'
// 	);
// }
