import React, { Component } from 'react';

class FindAllMedicines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [], // Store the list of medications here
      error: null, // Add error state
      showMedicines: false, // State to manage button click
      alertMessage: null,
      alertType: '', // 'success' or 'error'
    };
  }

  fetchMedicines = async () => {
     // Retrieve the token from localStorage
  const token = localStorage.getItem('token'); 
  console.log('Retrieved token:', token); // Debugging: log the token

    // Check if token exists
    if (!token) {
      this.setState({
        error: 'No token found. Please log in again.',
        showMedicines: false,
        alertMessage: null,
        alertType: 'error',
      });
      return; // Exit the function if no token is found
    }

    try {
      const response = await fetch('http://localhost:8080/api/medicines/fetchAllMedicines', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the header
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-cache', // Add this line to disable caching
        },
      });
  
      console.log('Fetch response status:', response.status);  // Check status
      console.log('Fetch response headers:', response.headers); // Verify headers

      if (!response.ok) {
        // Handle non-200 responses
        const errorBody = await response.text(); // Log error details
        console.error('Error fetching medicines:', errorBody);
        throw new Error(`HTTP error! status: ${response.status}. ${errorBody}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      if (data.successMessage) {
        this.setState({
          medicines: data.data,
          showMedicines: true,
          error: null,
          alertMessage: data.successMessage,
          alertType: 'success',
        });
      } else {
        this.setState({
          error: data.failureMessage || 'Unknown error occurred.',
          showMedicines: false,
          alertMessage: null,
          alertType: 'error',
        });
      }
      
      alert('Medicines Fetched successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Error Fetching medicines');
      this.setState({
        error: error.message,
        showMedicines: false,
        alertMessage: 'Error Fetching medicine',
        alertType: 'error',
      });
    }
  };

  render() {
    const { medicines, error, showMedicines, alertMessage, alertType } = this.state;

    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Medicine List</h2>
        {!showMedicines && (
          <button
            onClick={this.fetchMedicines}
            style={{
              padding: '10px 20px',
              backgroundColor: 'lightblue',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Show All Medicines
          </button>
        )}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {showMedicines && (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              marginBottom: '20px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Dosage</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Manufacturer</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Storage Requirement</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Side Effects</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Created At</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.medicineId}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.medicineId}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.medicineName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.dosage}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.manufacturer}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.storageRequirement}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.sideEffects}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.createdAt}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medicine.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {alertMessage && (
          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: alertType === 'success' ? 'lightgreen' : 'lightcoral',
              color: alertType === 'success' ? 'darkgreen' : 'darkred',
              borderRadius: '5px',
            }}
          >
            {alertMessage}
          </div>
        )}
      </div>
    );
  }
}

export default FindAllMedicines;




