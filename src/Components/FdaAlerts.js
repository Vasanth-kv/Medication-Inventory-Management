// src/components/FdaAlerts.js
import React, { useEffect, useState } from 'react';
import '../Styles/FdaAlerts.css'; 

const FdaAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {

         // Fetching WHO (World Health Organization) alerts
         const whoResponse = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.who.int/rss-feeds/news-english.xml'
        );
        if (!whoResponse.ok) throw new Error('Failed to fetch WHO alerts');
        const whoData = await whoResponse.json();
        
        // Fetching FDA (US) alerts
        const fdaResponse = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/MedWatch/rss.xml'
        );
        if (!fdaResponse.ok) throw new Error('Failed to fetch FDA alerts');
        const fdaData = await fdaResponse.json();

        // Combine both alerts
        const combinedAlerts = [...fdaData.items, ...whoData.items];
        setAlerts(combinedAlerts);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
        setError('Failed to fetch alerts. Please try again later.');
      }
    };

    fetchAlerts();
  }, []);

  return (
<div className="alerts-container">
  <h2>FDA Medical Alerts</h2>
  {error && <p>{error}</p>}
  <div className="alerts-grid">
    {alerts.length > 0 ? (
      alerts.map((alert, index) => (
        <div key={index} className="alert-card">
          <h3>{alert.title}</h3>
          <div className="alert-content" dangerouslySetInnerHTML={{ __html: alert.contentSnippet || alert.description }} />
          <a href={alert.link} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
        </div>
      ))
    ) : (
      <p>No alerts available.</p>
    )}
  </div>
</div>

  );
};

export default FdaAlerts;

