import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpiryAlerts = () => {
  const [ExpiryMedicines, setExpiryMedicines] = useState([]);

  useEffect(() => {
    const fetchExpiry = async () => {
      try {
        const response = await axios.get('/api/medicines/near-expiry'); // Backend API
        setExpiryMedicines(response.data);
      } catch (error) {
        console.error('Error fetching near expiry medicines:', error);
      }
    };

    fetchExpiry();
  }, []);

  return (
    <div>
      <h2>Expiry Medicines</h2>
      {ExpiryMedicines.length === 0 ? (
        <p>No medicines are near expiry.</p>
      ) : (
        <ul>
          {ExpiryMedicines.map((medicine) => (
            <li key={medicine.id}>
              {medicine.name} - Expiry Date: {medicine.expiryDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpiryAlerts;
