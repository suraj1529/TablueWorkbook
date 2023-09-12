import React, { useEffect, useState } from 'react';

const Workbooks = ({ token }) => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5001/fetch-workbooks', {
        method: 'GET',
        headers: {
          'X-Tableau-Auth': token,
        },
      })
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const workbookNodes = xmlDoc.getElementsByTagName('workbook');
          const projectsMap = new Map();

          for (const workbookNode of workbookNodes) {
            const projectName = workbookNode
              .getElementsByTagName('project')[0]
              .getAttribute('name');
            const workbookName = workbookNode.getAttribute('name');
            const webpageUrl = workbookNode.getAttribute('webpageUrl'); // Get the webpageUrl attribute

            if (!projectsMap.has(projectName)) {
              projectsMap.set(projectName, []);
            }
            projectsMap.get(projectName).push({ workbookName, webpageUrl }); // Store both workbook name and webpageUrl
          }

          setProjectsData(Array.from(projectsMap.entries()));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [token]);

  return (
    <div className="button-grid">
      {projectsData.map(([project, workbooks], index) => (
        <div key={index} className="dropdown">
          <button className="dropbtn">{project}</button>
          <div className="dropdown-content">
            {workbooks.map((workbook, workbookIndex) => (
              <a
                key={workbookIndex}
                href={workbook.webpageUrl} // Use the webpageUrl as the href
                target="_blank"
                rel="noopener noreferrer"
              >
                {workbook.workbookName}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Workbooks;


