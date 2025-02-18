import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../Styles/NewsUpdates.css'; // Import the specific CSS file

const categories = [
  "All News", "Consumer", "Professional", "New Drugs", 
  "Clinical Trials", "Pipelines", "FDA Alerts"
];

const NewsUpdate = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All News");

  useEffect(() => {
    console.log("Fetching alerts for category:", selectedCategory); // Log the category being fetched
    axios.get(`http://localhost:5000/alerts/${selectedCategory}`)
      .then(response => {
        console.log("Alerts fetched:", response.data); // Log the alerts data
        setAlerts(response.data);
      })
      .catch(error => console.error("Error fetching alerts:", error));
  }, [selectedCategory]);

  return (
    <div className="newsupdate-container">
      <h2>Medical News</h2>
      
      {/* Category buttons */}
      <div className="newsupdate-category-buttons">
        {categories.map(category => (
          <button 
            key={category} 
            className={`newsupdate-category-button ${selectedCategory === category ? 'active' : ''}`} 
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Displaying Alerts */}
      <div className="newsupdate-alerts-grid">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="newsupdate-alert-card">
              <h3>{alert.title}</h3>
              <p>{alert.contentSnippet}</p>
              <a href={alert.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No alerts available in this category. Please try another category.</p>
        )}
      </div>
    </div>
  );
};

export default NewsUpdate;
