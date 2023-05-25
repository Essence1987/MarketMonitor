

//GET https://api.marketaux.com/v1/news/all HTTP/1.1

var requestOptions = {
    method: 'GET'
};

var params = {
    api_token: 'JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN',
    symbols: 'msft,fb',
    limit: '3'
};

var esc = encodeURIComponent;
var query = Object.keys(params)
    .map(function(k) {return esc(k) + '=' + esc(params[k]);})
    .join('&');

fetch("https://api.marketaux.com/v1/news/all?" + query, requestOptions)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('error', error));

const searchButtonEl = document.querySelector("#search_button");
const recentNewsFeedEl = document.querySelector("#main_recent-news");
const current_graph = document.querySelector("#current_graph");
const searchNewsEl = document.querySelector("#search_news");

searchButtonEl.addEventListener("click", function () {
  recentNewsFeedEl.classList.add("hidden"),
    current_graph.classList.add("hidden"),
    searchNewsEl.classList.remove("hidden");
});
