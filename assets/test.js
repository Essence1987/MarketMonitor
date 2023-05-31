function fetchData() {
    // 12 Data API Key 
    const apiKey = 'b3653483401543c5a9c34983f41185fb';
    console.log(apiKey);
    
    // Get user input for symbol
    const symbolInput = document.getElementById("symbolInput");
    const symbols = symbolInput.value;
    console.log(symbols);
    
    // Desired interval for the data. 
    const interval = '1min';
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
      })
      .catch(error => {
        // Displays any errors that occur during the API request in the console
        console.error('Error:', error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    // Find the search button element
    const searchButtonEl = document.getElementById("searchButton");
  
    // Call the fetchData function when the search button is clicked
    searchButtonEl.addEventListener("click", function() {
      fetchData();
    });
  });
  
  