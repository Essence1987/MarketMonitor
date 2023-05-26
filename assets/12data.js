// 12 Data API Key 
const apikey = 'b3653483401543c5a9c34983f41185fb';

// This is where the user input search will go. For now one is entered for trial run
const symbols = 'AAPL';

// Desired interval for the data. 
const interval = '1min';

// API URL
const apiUrl= `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=${interval}&apikey=${apiKey}`;

// The API Request
fetch(apiUrl)
    .then(responce => Response.json())
    .then(data => {
        // Displays the retrieved data in console
        console.log(data);
    })
    .catch(error => {
        // Displays any errors that occur during the API request in the console
        console.error('Error:', error);
    });
