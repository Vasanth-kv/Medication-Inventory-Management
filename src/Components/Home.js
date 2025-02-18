import React, { useState } from 'react';
import '../Styles/Home.css';

const TrendingSearches = ({ searches, onSearchClick }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
      <p>Trending searches: 
        {searches.map((search, index) => (
          <span key={index} style={{ margin: '0 5px' }}>
            <button
              onClick={() => onSearchClick(search)}
              style={{
                color: '#007BFF',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
              }}
            >
              {search}
            </button>
            {/* <a 
              href="#"
              onClick={() => onSearchClick(search)}
              style={{
                color: '#007BFF',
                textDecoration: 'none',
              }}
            >
              {search}
            </a> */}
            {index < searches.length - 1 ? ',' : ''}
          </span>
        ))}
      </p>
    </div>
  );
};


function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false); // New state for controlling button visibility
  const trendingSearches = ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Metformin'];

  const togglePlayPause = () => {
    const video = document.getElementById('herovideo');
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true); // Show controls when mouse enters the video area
  };

  const handleMouseLeave = () => {
    setShowControls(false); // Hide controls when mouse leaves the video area
  };
  
  const toggleSearch = () => {
    const searchInput = document.querySelector('.search-bar input[type="text"]').value;
    console.log('Search Input:', searchInput);
  };

  const handleSearchClick = (search) => {
    console.log('Trending Search Clicked:', search);
    document.querySelector('.search-bar input[type="text"]').value = search;
  };

  return (
    <div>
      <h1
      >Welcome to Medication Inventory</h1>
      <p>Find accurate and up-to-date information about medications.</p>
      <div className="video-container" style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{position: 'relative'}}>
        <video
          id="herovideo"
          loop
          muted
          autoPlay
          playsInline
          poster={`${process.env.PUBLIC_URL}/assets/Videos/video-hp-poster-possible.webp`}
          style={{ width: '100%'}}  
        >
          <source src={`${process.env.PUBLIC_URL}/assets/Videos/medication-01.mp4`} type="video/mp4" />
        </video>
        <a href="https://www.example.com" className="video-link">Visit our website</a>
    <div className="video-overlay" style={{ padding: '5px',position: 'absolute',top: '370px',left: '20px',color: 'white',}}>
        <h1>Transforming Your Care</h1>
    </div>
    </div>
        <button
  id="playPauseButton"
  className="play-pause-button"
  type="button"
  aria-label={isPlaying ? 'Pause video' : 'Play video'}
  onClick={togglePlayPause}
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50px',
    height: '50px',
    backgroundColor: 'transparent', // Make the button background transparent
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    opacity: showControls ? 1 : 0, // Show/hide the buttons based on mouse hover
    transition: 'opacity 0.3s ease', // Add a smooth transition effect
  }}
>
  <img
    id="playIcon"
    src={`${process.env.PUBLIC_URL}/assets/Img/play-button.png`}
    alt="Play Icon"
    style={{
      display: isPlaying ? 'none' : 'block',
      width: '50px', // Adjust width as needed
      height: '50px', // Adjust height as needed
      position: 'absolute',
      top: '50%',
      left: '50%',
      border: 'none',
      transform: 'translate(-50%, -50%)',
    }}
  />
  <img
    id="pauseIcon"
    src={`${process.env.PUBLIC_URL}/assets/Img/pause.png`}
    alt="Pause Icon"
    style={{
      display: isPlaying ? 'block' : 'none',
      width: '50px', // Adjust width as needed
      height: '50px', // Adjust height as needed
      position: 'absolute',
      top: '50%',
      left: '50%',
      border: 'none',
      transform: 'translate(-50%, -50%)',
    }}
  />
</button>

      </div>
      <header>
        <h1 id='find-Med' style={{textAlign:'center',textshadow: '2px 2px 5px rgba(0, 0, 0, 0.8)'}}>Find Medication</h1>
        <section className="search-bar" style={{
          backgroundColor:'lightgrey',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          justifyContent: 'center',
          marginTop: '20px',
          borderRadius:'5px'
          // maxWidth: '1500px'
        }}>
          <input
            type="text"
            placeholder="Search for medications..."
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '13px',
              borderRadius: '71px',
              border: '2px solid #d9d9d9',
              width: 'calc(100% - 30px)', // Adjust width as needed to accommodate the button
            }}
          />
          <button
            id="searchBtn"
            type="button"
            className="default-button contained-btn search-cta-btn emc-icon-link"
            onClick={toggleSearch}
            style={{
              padding: '0', // Remove padding to properly center the icon
              backgroundColor: 'white',
              borderRadius: '50%', // Make the button circular
              border: 'none',
              cursor: 'pointer',
              width: '40px', // Adjust button size as needed
              height: '40px', // Adjust button size as needed
              position: 'absolute',
              right: '71px', // Adjust the position as needed
              top: '842px', // Adjust the position as needed
              transform: 'translateY(-0%)', // Center vertically
              display: 'flex',
              justifyContent: 'center', // Center the icon horizontally
              alignItems: 'center', // Center the icon vertically
              
            }}
          >
            <img
              alt="search-icon"
              src={`${process.env.PUBLIC_URL}/assets/Img/glass-icon.svg`}
              title="emc Search"
              className="ico-search"
              style={{ width: '20px', height: '20px' }} // Adjust icon size as needed
            />
          </button>
        </section>
      </header>
      <TrendingSearches searches={trendingSearches} onSearchClick={handleSearchClick} />
    </div>
  );
}

export default Home;



// {/* Add more features as needed */}
/*
<p>
        This is the homepage of our Medication Inventory application. Use the navigation above to manage your medication inventory.
      </p>
      <p>Features you can implement in this application:</p>
      <ul>
        <li>Add new medications to the inventory.</li>
        <li>Update medication details.</li>
        <li>Find medications by ID.</li>
        <li>List all medications in the inventory.</li>
      </ul>
<ul>
        <li>Add new medications to the inventory.</li>
        <li>Update medication details.</li>
        <li>Find medications by ID.</li>
        <li>List all medications in the inventory.</li>
        
        </ul>
*/        
 /*       <p>
          Feel free to explore and use the functionality provided by this application.
        </p>
 */       