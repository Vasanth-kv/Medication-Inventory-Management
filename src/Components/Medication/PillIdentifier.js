import React, { useState } from 'react';

const PillIdentifier = () => {
  const [pill, setPill] = useState('');
  const [color, setColor] = useState('');
  const [shape, setShape] = useState('');
  const [identifiedPills, setIdentifiedPills] = useState([]);

  // Sample data for pills with imprints, color, and shape
  const pills = [
    { name: 'Aspirin', imprint: 'A123', color: 'white', shape: 'round' },
    { name: 'Ibuprofen', imprint: 'I456', color: 'orange', shape: 'oval' },
    { name: 'Paracetamol', imprint: 'P789', color: 'white', shape: 'capsule' },
    { name: 'Loratadine', imprint: 'L101', color: 'blue', shape: 'round' },
    // Add more pills with their respective imprint, color, and shape
  ];

  // Function to handle search and filter pills based on selected imprint, color, and shape
  const handleSearch = () => {
    const filteredPills = pills.filter(p =>
      (pill ? p.imprint.toLowerCase().includes(pill.toLowerCase()) : true) &&
      (color ? p.color === color : true) &&
      (shape ? p.shape === shape : true)
    );
    setIdentifiedPills(filteredPills);
  };

  return (
    <div style={{ width: '70%', backgroundColor: 'white', border: '5px lightgrey solid', borderRadius: '10px', marginTop: '10px' }}>
      <h1 style={{ width: '50%', backgroundColor: 'GrayText', border: '1px black solid', marginLeft: '50px', marginTop: '30px', padding: '5px' }}>
        Pill Identifier
      </h1>

      {/* Dropdown for Pill Imprints */}
      <div style={{ padding: '10px' }}>
        <h6 style={{ marginLeft: '40px', fontWeight: 'bolder', fontStyle: 'initial' }}>Pill Imprint</h6>
        <select style={{ height: '50px', width: '51%', backgroundColor: 'whitesmoke', margin: '5px', marginLeft: '40px', border: '1px darkblue solid', borderRadius: '5px' }} onChange={(e) => setPill(e.target.value)} value={pill}>
          <option value="">Select Imprint</option>
          {pills.map((p, index) => (
            <option key={index} value={p.imprint}>{p.imprint}</option>
          ))}
        </select>
      </div>

      {/* Dropdown for Color */}
      <div style={{ padding: '10px' }}>
        <h6 style={{ marginLeft: '40px', fontWeight: 'bolder', fontStyle: 'initial' }}>Color (optional)</h6>
        <select style={{ height: '50px', width: '51%', backgroundColor: 'whitesmoke', margin: '5px', marginLeft: '40px', border: '1px darkblue solid', borderRadius: '5px' }} onChange={(e) => setColor(e.target.value)} value={color}>
          <option value="">Select Color</option>
          <option value="white">White</option>
          <option value="beige">Beige</option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="brown">Brown</option>
          <option value="clear">Clear</option>
          <option value="gold">Gold</option>
          <option value="gray">Gray</option>
          <option value="green">Green</option>
          <option value="maroon">Maroon</option>
          <option value="orange">Orange</option>
          <option value="peach">Peach</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
          <option value="tan">Tan</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>

      {/* Dropdown for Shape */}
      <div style={{ padding: '10px' }}>
        <h6 style={{ marginLeft: '40px', fontWeight: 'bolder', fontStyle: 'initial' }}>Shape (optional)</h6>
        <select style={{ height: '50px', width: '51%', backgroundColor: 'whitesmoke', margin: '5px', marginLeft: '40px', border: '1px darkblue solid', borderRadius: '5px' }} onChange={(e) => setShape(e.target.value)} value={shape}>
          <option value="">Select Shape</option>
          <option value="barrel">Barrel</option>
          <option value="capsule">Capsule/Oblong</option>
          <option value="character">Character-shape</option>
          <option value="egg">Egg-shape</option>
          <option value="eight-sided">Eight-sided</option>
          <option value="oval">Oval</option>
          <option value="figure-eight">Figure eight-shape</option>
          <option value="five-sided">Five-sided</option>
          <option value="four-sided">Four-sided</option>
          <option value="gear">Gear-shape</option>
          <option value="heart">Heart-shape</option>
          <option value="kidney">Kidney-shape</option>
          <option value="rectangle">Rectangle</option>
          <option value="round">Round</option>
          <option value="seven-sided">Seven-sided</option>
          <option value="six-sided">Six-sided</option>
          <option value="three-sided">Three-sided</option>
          <option value="u-shape">U-shape</option>
        </select>
      </div>

      {/* Search Button */}
      <div style={{ padding: '10px' }}>
        <button onClick={handleSearch} style={{
          height: '50px',
          width: '51%',
          backgroundColor: 'darkblue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          position: 'relative',
          left: '40px',
          marginTop: '10px',
        }}>
          Search
        </button>
      </div>

      {/* Display Identified Pills */}
      <ul style={{ marginLeft: '50px' }}>
        {identifiedPills.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>

      {/* Pill Image */}
      <div style={{ flex: '0 0 auto', marginLeft: '700px' }}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Img/pill-identifier-example.png`}
          alt="pill"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '10px',
            border: '2px solid lightgray',
            marginTop: '-550px',
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
};

export default PillIdentifier;
