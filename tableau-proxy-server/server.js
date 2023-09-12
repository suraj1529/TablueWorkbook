// Import the required modules
const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import the CORS middleware for handling cross-origin requests

// Create an Express app
const app = express(); 

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());

// Set up a route for handling POST requests to fetch Tableau data
app.post('/fetch-tableau-data', async (req, res) => {
  // Define the URL for Tableau authentication
  const url = 'https://us-west-2b.online.tableau.com/api/3.4/auth/signin';
  
  // Define the XML data containing credentials for authentication
  const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <tsRequest>
        <credentials
          personalAccessTokenName="MY_TOKEN" personalAccessTokenSecret="jKBeUSISRzuo0JHWVCYjKQ==:qS1hEGcgEmsPHSl3jXcpl3kW2l2Etsoc" >
              <site contentUrl="infometry" />
        </credentials>
    </tsRequest>
  `;

  // Define headers for the HTTP request
  const headers = {
    'Content-Type': 'application/xml',
  };

  try {
    // Dynamically import the 'node-fetch' module
    const fetchModule = await import('node-fetch');
    
    // Send a POST request to Tableau authentication endpoint
    const response = await fetchModule.default(url, {
      method: 'POST',
      headers: headers,
      body: xmlData,
    });

    // Extract the response data as text
    const data = await response.text();
    
    // Log a message and send the data in the response
    console.log("Server.js file");
    res.send(data);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Set up a route for handling GET requests to fetch Tableau workbooks
app.get('/fetch-workbooks', async (req, res) => {
  // Extract the Tableau authentication token from request headers
  const token = req.headers['x-tableau-auth'];
  console.log(token);

  // Define the URL for fetching workbooks data
  const workbooksUrl = 'https://us-west-2b.online.tableau.com/api/3.20/sites/bb2b173e-5e22-4536-a174-79573ac1e8f3/workbooks';
  
  // Define headers for the HTTP request
  const headers = {
    'X-Tableau-Auth': token,
  };

  try {
    // Dynamically import the 'node-fetch' module
    const fetchModule = await import('node-fetch');
    
    // Send a GET request to fetch workbooks data
    const workbookResponse = await fetchModule.default(workbooksUrl, {
      method: 'GET',
      headers: headers,
    });

    // Extract the response data as text
    const workbookData = await workbookResponse.text();
    
    // Log a message and send the workbook data in the response
    console.log("Test.js");
    res.send(workbookData);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define the port number for the Express app to listen on
const PORT = process.env.PORT || 5001;

// Start the Express app and listen on the specified port
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
