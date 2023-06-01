var stockNews_api_token  = 'JuJOIG1hHbpKquZiBFJtJ4OCTTKIavGBRQyzQ4bN';

const searchButtonEl = document.querySelector("#search_button");
const recentNewsFeedEl = document.querySelector("#main_recent-news");
const current_graph = document.querySelector("#current_graph");
const searchNewsEl = document.querySelector("#search_news");
const searchInput = document.getElementById("search_input");
const recommendNewsEl = document.getElementById("recommended_news");
const divCard = document.querySelector(".col");

recommendNewsEl.style.display = "none";

searchButtonEl.addEventListener("click", function () {
    recentNewsFeedEl.classList.add("hidden"),
    current_graph.classList.add("hidden"),
    searchNewsEl.classList.remove("hidden");
    fetchStockNewsApi()
});

function fetchStockNewsApi(){

var inputValue = searchInput.textContent;

fetch("https://api.marketaux.com/v1/news/all?symbols=" + inputValue + "&filter_entities=true&limit=3&language=en&api_token=" + stockNews_api_token)
    .then (function (response){
        return response.json();
    })
    .then (function(data){
        console.log(data);
        
        for(i=0;i<3;i++){
        var articleDescription = data.data[i].description;
        var articleImg = data.data[i].image_url;
        var articleTitle = data.data[i].title;
        var articleUrl = data.data[i].url;

        console.log(articleTitle);
        console.log(articleDescription);
        console.log(articleImg);     
        console.log(articleUrl);

        document.querySelector(".card-title" + (i+1)).innerHTML = articleTitle;
        document.querySelector(".card-text" + (i+1)).innerHTML = articleDescription;
        document.querySelector(".card-img-top" + (i+1)).src = articleImg;
        document.querySelector(".card-url" + (i+1)).href = articleUrl;
        
        
        }
    })
}



function fetchSimilarStockNewsApi(){
    fetch("https://api.marketaux.com/v1/news/similar/" + uuid + "?api_token=" + stockNews_api_token + "&language=en")
}