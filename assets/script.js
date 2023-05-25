var key = config.marketaux;

const authToken = '3491e214e88f50ea6f1b431ad848d7391a9ef924';
const apiUrl = 'https://cryptopanic.com/api/v1/posts/';

// Function to fetch API data
async function fetchData() {
  try {
    const response = await fetch(`${apiUrl}?auth_token=${authToken}&public=true`);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();
    // Process the data as needed
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Call the fetchData function after the page has fully loaded
document.addEventListener('DOMContentLoaded', fetchData);
