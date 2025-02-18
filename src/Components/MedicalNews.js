// src/components/MedicalNews.js
import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser'; // RSS parser for fetching feeds

const MedicalNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL('https://news.google.com/rss/search?q=global+medical+news');
      setNews(feed.items); // Set the feed data to state
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Global Medical News</h2>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.contentSnippet}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalNews;
