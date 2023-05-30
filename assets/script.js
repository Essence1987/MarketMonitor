var api_token = 'JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN';

const searchButtonEl = document.querySelector("#search_button");
const recentNewsFeedEl = document.querySelector("#main_recent-news");
const current_graph = document.querySelector("#current_graph");
const searchNewsEl = document.querySelector("#search_news");
const searchInput = document.getElementById("search_input");



searchButtonEl.addEventListener("click", function () {
  recentNewsFeedEl.classList.add("hidden"),
    current_graph.classList.add("hidden"),
    searchNewsEl.classList.remove("hidden");
  fetchStockNewsApi()
});


function fetchStockNewsApi() {

  var inputValue = searchInput.textContent;

  fetch("https://api.marketaux.com/v1/news/all?symbols=" + inputValue + "&filter_entities=true&language=en&api_token=" + api_token)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}

function init() {
  fetch("https://api.marketaux.com/v1/news/all?symbols=TSLA&filter_entities=true&language=en&api_token=JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN")
    .then(response => response.json())
    .then(data => {
      console.log(data.data[0].description);
    })

}


init()