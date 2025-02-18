import React, { useState } from 'react';

const DrugInteractions = () => {
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const drugs = ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Metformin'];

  const interactions = {
    'Aspirin-Ibuprofen': 'Increased risk of stomach ulcers.',
    'Paracetamol-Amoxicillin': 'No known interactions.',
    // Add more interactions
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedDrugs(prev => (
      prev.includes(value) ? prev.filter(drug => drug !== value) : [...prev, value]
    ));
  };

  const checkInteractions = () => {
    const key = selectedDrugs.sort().join('-');
    return interactions[key] || 'No interactions found.';
  };

  return (
    <div>
      <h1>Drug Interactions</h1>
      <select onChange={handleSelect} value="">
        <option value="">Select Drug</option>
        {drugs.map((drug, index) => (
          <option key={index} value={drug}>{drug}</option>
        ))}
      </select>
      <p>Selected Drugs: {selectedDrugs.join(', ')}</p>
      {selectedDrugs.length > 1 && (
        <div>
          <h3>Interactions:</h3>
          <p>{checkInteractions()}</p>
        </div>
      )}
    </div>
  );
};

export default DrugInteractions;
