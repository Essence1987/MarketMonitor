var api_token = 'JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN';
const searchButtonEl = document.querySelector('#search_button');
const recentNewsFeedEl = document.querySelector('#main_recent-news');
const current_graph = document.querySelector('#current_graph');
const searchNewsEl = document.querySelector('#search_news');
const searchInput = document.getElementById('search_input');
const recommendNewsEl = document.getElementById('recommended_news');

recommendNewsEl.style.display = 'd-none';

searchButtonEl.addEventListener('click', function () {
	recentNewsFeedEl.classList.add('d-none'),
		current_graph.classList.add('d-none'),
		searchNewsEl.classList.remove('d-none');
	fetchStockNewsApi();
});
function fetchStockNewsApi() {
	var inputValue = searchInput.value;
	console.log(inputValue);
	console.log(
		'https://api.marketaux.com/v1/news/all?symbols=' +
			inputValue +
			'&filter_entities=true&language=en&api_token=' +
			api_token
	);
	fetch(
		'https://api.marketaux.com/v1/news/all?symbols=' +
			inputValue +
			'&filter_entities=true&language=en&api_token=' +
			api_token
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			for (i = 0; i < 3; i++) {
				var articleDescription = data.data[i].description;
				var articleImg = data.data[i].image_url;
				var articleTitle = data.data[i].title;

				console.log(articleTitle);
				console.log(articleDescription);
				console.log(articleImg);

				document.querySelector('.card-title' + (i + 1)).innerHTML =
					articleTitle;
				document.querySelector('.card-text' + (i + 1)).innerHTML =
					articleDescription;
				document.querySelector('.card-img-top' + (i + 1)).src = articleImg;
			}
		});
}
