import React, { useEffect, useState } from 'react';
import Workbooks from './Workbooks';

const Connection = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    let isMounted = true;

    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
      <tsRequest>
        <credentials personalAccessTokenName="MY_TOKEN" personalAccessTokenSecret="jKBeUSISRzuo0JHWVCYjKQ==:qS1hEGcgEmsPHSl3jXcpl3kW2l2Etsoc">
          <site contentUrl="infometry" />
        </credentials>
      </tsRequest>`;

    const headers = {
      'Content-Type': 'application/xml',
    };

    fetch('http://localhost:5001/fetch-tableau-data', {
      method: 'POST',
      headers: headers,
      body: xmlData,
    })
      .then(response => response.text())
      .then(data => {
        if (isMounted) {
          // Parse the XML response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');

          // Extract the token attribute from the credentials element
          const extractedToken = xmlDoc.querySelector('credentials').getAttribute('token');
          setToken(extractedToken);
          console.log(extractedToken)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    return () => {
      isMounted = false; // Clean up to prevent state update after unmounting
    };
  }, []);

  return (
    <div>
      {/* Use the token in your component as needed */}
      {/* <p>Token: {token}</p> */}
      <Workbooks token={token} /> 
    </div>
  );
};

export default Connection;
