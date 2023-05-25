
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