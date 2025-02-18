import React, { useEffect, useState } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import '../Styles/NewDrugApprovals.css';


const NewDrugApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        // Fetch the XML data
        const response = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://www.who.int/feeds/entity/medicines/en/rss.xml', {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
          },
        });

        // Parse the XML data into JSON format
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            setError('Failed to parse the XML feed.');
            console.error(err);
          } else {
            // The feed items will be inside `result.rss.channel[0].item`
            const items = result.rss.channel[0].item;
            setApprovals(items);
          }
        });
      } catch (err) {
        console.error('Error fetching drug approvals:', err);
        setError('Failed to fetch new drug approvals. Please try again later.');
      }
    };

    fetchApprovals();
  }, []);

  return (
    <div className="approvals-container">
      <h2>New Drug Approvals (Global)</h2>
      {error && <p>{error}</p>}
      <div className="approvals-grid">
        {approvals.length > 0 ? (
          approvals.map((approval, index) => (
            <div key={index} className="approval-card">
              <h3>{approval.title[0]}</h3>
              <p>{approval.description[0]}</p>
              <a href={approval.link[0]} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No new drug approvals available.</p>
        )}
      </div>
    </div>
  );
};

export default NewDrugApprovals;
