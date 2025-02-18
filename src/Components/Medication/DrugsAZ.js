import React, { useState, useEffect } from 'react';
// import '../../Styles/DrugsAZ.css'


// const toggleSearch = () => {
//   const searchInput = document.querySelector('.search-bar input[type="text"]').value;
//   console.log('Search Input:', searchInput);
// };

// const handleSearchClick = (search) => {
//   console.log('Trending Search Clicked:', search);
//   document.querySelector('.search-bar input[type="text"]').value = search;
// };

const DrugsAZ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/medicines/fetchAllMedicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  }, []);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMedicineClick = (medicineId) => {
    fetch(`http://localhost:8080/api/medicines/findMedicineById?medicineId=${medicineId}`)
      .then(response => response.json())
      .then(data => setSelectedMedicine(data))
      .catch(error => console.error('Error fetching medicine details:', error));
  };

  const handleSearch = () => {
    console.log('Search Input:', searchTerm);
  };

  return (
    <div  className="drugs-az-container">
      <h1>Drugs A-Z</h1>
      <section className="search-bar" style={{
          backgroundColor:'lightgrey',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <input
            type="text"
            placeholder="Search for medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              // display: 'flex',
              // alignItems: 'center',
              padding: '13px',
              borderRadius: '71px',
              border: '2px solid #d9d9d9',
              width: 'calc(100% - 60px)', // Adjust width as needed to accommodate the button
            }}
          />
          <button
            // id="searchBtn"
            type="button"
            // className="default-button contained-btn search-cta-btn emc-icon-link"
            onClick={handleSearch}
            style={{
              // padding: '0', // Remove padding to properly center the icon
              backgroundColor: 'white',
              borderRadius: '50%', // Make the button circular
              border: 'none',
              cursor: 'pointer',
              width: '40px', // Adjust button size as needed
              height: '40px', // Adjust button size as needed
              // position: 'relative',
              // right: '0px', // Adjust the position as needed
              // top: '0px', // Adjust the position as needed
              // transform: 'translateY(-0%)', // Center vertically
              display: 'flex',
              justifyContent: 'center', // Center the icon horizontally
              alignItems: 'center', // Center the icon vertically
              marginLeft:'-44px',
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
      <ul>
        {filteredMedicines.map(medicine => (
          <li key={medicine.medicineId} onClick={() => handleMedicineClick(medicine.medicineId)}>
            {medicine.name}
          </li>
        ))}
      </ul>
      {selectedMedicine && (
        <div>
          <h2>{selectedMedicine.name}</h2>
          <p><strong>Uses:</strong> {selectedMedicine.uses}</p>
          <p><strong>Warnings:</strong> {selectedMedicine.warnings}</p>
          <p><strong>Before Taking:</strong> {selectedMedicine.before_taking}</p>
          <p><strong>Dosage:</strong> {selectedMedicine.dosage}</p>
          <p><strong>Side Effects:</strong> {selectedMedicine.side_effects}</p>
          <p><strong>Interactions:</strong> {selectedMedicine.interactions}</p>
          <p><strong>FAQ:</strong> {selectedMedicine.faq}</p>
        </div>
      )}
    </div>
  );
};

export default DrugsAZ;
