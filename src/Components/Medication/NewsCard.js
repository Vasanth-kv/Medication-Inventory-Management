import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ imageSrc, title, description, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="news-card" style={styles.card}>
        <img src={imageSrc} alt={title} style={styles.image} />
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    width: '300px', // Fixed width
    height: '350px', // Fixed height
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%', // Image will take the full width of the card
    height: '200px', // Fixed height for the image
    objectFit: 'cover', // Ensures the image maintains its aspect ratio and covers the space
    borderRadius: '8px',
  },
  title: {
    fontSize: '1.2rem',
    margin: '10px 0',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Adds ellipsis if the title is too long
  },
  description: {
    fontSize: '0.9rem',
    height: '60px', // Fixed height for description
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Limits description to 3 lines
    WebkitBoxOrient: 'vertical',
  },
};

export default NewsCard;

