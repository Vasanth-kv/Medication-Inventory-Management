import React, { Component } from 'react';

class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicineId: '',
      medicineName: '',
      dosage: '',
      manufacturer: '',
      storageRequirement: '',
      sideEffects: '',
      responseData: [],
      result: false,
      error: null,
      alertMessage: null,
      alertType: '', // 'success' or 'error'
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { medicineId, medicineName, dosage, manufacturer, storageRequirement, sideEffects } = this.state;
      const data = { medicineId, medicineName, dosage, manufacturer, storageRequirement, sideEffects };
      await this.AddMedicine(data);
    } else {
      console.log('Form validation failed');
      alert('Form validation failed. Please fill in all fields.');
    }
  };

  AddMedicine = async (data) => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);
  
    if (!token) {
      this.setState({
        error: 'No token found. Please log in again.',
        showMedicines: false,
        alertMessage: null,
        alertType: 'error',
      });
      return;
    }
  
    console.log('Data to be sent:', data);
    try {
      const response = await fetch('http://localhost:8080/api/medicines/insertMedicine', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-cache',
        },
      });
  
      console.log('Response status:', response.status);  // Add this to check the response status
      console.log('Response headers:', response.headers);  // Check the headers to verify CORS/Authorization
  
      if (!response.ok) {
        // If response is not OK, print the body for debugging
        const errorBody = await response.text();
        console.error('Error response body:', errorBody);
        throw new Error(`Network response was not ok. ${errorBody}`);
      }
  
      const responseData = await response.json();
      console.log('Response Data:', responseData); // Print the response data
  
      this.setState({
        responseData,
        result: true,
        error: null,
        alertMessage: 'Medicine Added successfully',
        alertType: 'success',
      });
  
      alert('Medicine added successfully');
    } catch (error) {
      console.error('Error in AddMedicine:', error);
      alert('Error adding medicine');
      this.setState({
        error: error.message,
        alertMessage: 'Error Adding medicine',
        alertType: 'error',
      });
    }
  };
  
  

  validateForm = () => {
    const { medicineId, medicineName, dosage, manufacturer, storageRequirement, sideEffects } = this.state;
    return medicineId.trim() !== '' && medicineName.trim() !== '' && dosage.trim() !== '' && manufacturer.trim() !== '' && storageRequirement.trim() !== '' && sideEffects.trim() !== '';
  };

  handleReset = () => {
    this.setState({
      medicineId: '',
      medicineName: '',
      dosage: '',
      manufacturer: '',
      storageRequirement: '',
      sideEffects: '',
      responseData: [],
      result: false,
    });
  };

  componentDidMount() {
    console.log('AddMedicine component mounted');
  }

  render() {
    const { responseData: medicineData, error, alertMessage, alertType } = this.state;
    
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Add Medicine</h2>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="medicineId">Medicine Id:</label>
            <input
              type="text"
              id="medicineId"
              name="medicineId"
              value={this.state.medicineId}
              onChange={this.handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="medicineName">Medicine Name:</label>
            <input
              type="text"
              id="medicineName"
              name="medicineName"
              value={this.state.medicineName}
              onChange={this.handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="dosage">Dosage:</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={this.state.dosage}
              onChange={this.handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="manufacturer">Manufacturer:</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={this.state.manufacturer}
              onChange={this.handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="storageRequirement">Storage Requirement:</label>
            <input
              type="text"
              id="storageRequirement"
              name="storageRequirement"
              value={this.state.storageRequirement}
              onChange={this.handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="sideEffects">Side Effects:</label>
            <input
              type="text"
              id="sideEffects"
              name="sideEffects"
              value={this.state.sideEffects}
              onChange={this.handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ display: 'flex',gap:'10px', }}>
            <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: 'lightblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add Medicine
            </button>
            <button type="button" onClick={this.handleReset} style={{ flex: 1, padding: '10px', backgroundColor: 'lightcoral', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </form>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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
{/* Newly added */}
            {medicineData.length > 0 ? (
      <ul>
        {medicineData.map((med, index) => (
          <li key={index}>
            {med.medicineName} - {med.dosage} ({med.manufacturer})
          </li>
        ))}
      </ul>
    ) : (
      !error && <p>No medicine data available.</p>
    )}{/* Newly added */}
      </div>
    );
  }
}

export default AddMedicine;

