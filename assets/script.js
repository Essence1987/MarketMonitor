
var marketkey = JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN;

const searchButtonEl = document.querySelector("#search_button");
const recentNewsFeedEl = document.querySelector("#main_recent-news");
const current_graph = document.querySelector("#current_graph");
const searchNewsEl = document.querySelector("#search_news");

searchButtonEl.addEventListener("click", function () {
  recentNewsFeedEl.classList.add("hidden"),
    current_graph.classList.add("hidden"),
    searchNewsEl.classList.remove("hidden");
});
