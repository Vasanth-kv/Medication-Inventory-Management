import React from 'react';

const HeroSection = () => (
  <section className="hero-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Welcome to Medication Website</h1>
          <p>Find accurate and up-to-date information about medications.</p>
          <a href="#" className="btn btn-primary">Explore Now</a>
        </div>
        <video id="herovideo" controls loop muted autoPlay playsInline poster="D:\360 Ripples\web Designing\Videos\video-hp-poster-possible.webp">
          <source src="D:\360 Ripples\web Designing\Videos\medication-01.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
);

export default HeroSection;
