// src/components/FdaAlerts.js
import React, { useEffect, useState } from 'react';
import '../../Styles/FdaAlerts.css'

const FdaAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/MedWatch/rss.xml');
        if (!response.ok) throw new Error('Failed to fetch alerts');

        const data = await response.json();
        setAlerts(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div>
      <h2>FDA MedWatch Alerts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            <h3>{alert.reason_for_recall}</h3>
            <p>{alert.product_description}</p>
            <p><strong>Date:</strong> {alert.recall_initiation_date}</p>
            <p><strong>Company:</strong> {alert.openfda?.manufacturer_name?.join(', ') || 'Unknown'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FdaAlerts;

