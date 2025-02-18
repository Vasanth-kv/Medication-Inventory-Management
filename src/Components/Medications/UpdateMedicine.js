import React, { Component } from 'react';

class UpdateMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicineId: '',
      medicineName: '',
      dosage: '',
      manufacturer: '',
      storageRequirement: '',
      sideEffects: '',
      error: null,
      alertMessage: null,
      alertType: '', // 'success' or 'error'
    };
  }

  componentDidMount() {
    // Assume the medicineId is passed as a prop or via URL params
    const { medicineId } = this.state;

    if (medicineId) {
      this.fetchMedicineDetails(medicineId);
    }
  }

  fetchMedicineDetails = async (medicineId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/medicines/${medicineId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch medicine details');
      }
      const data = await response.json();
      this.setState({
        medicineName: data.medicineName || '',
        dosage: data.dosage || '',
        manufacturer: data.manufacturer || '',
        storageRequirement: data.storageRequirement || '',
        sideEffects: data.sideEffects || '',
        error: null,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { medicineId, medicineName, dosage, manufacturer, storageRequirement, sideEffects } = this.state;

    const data = { medicineId }; // Include the medicineId in the data object
// Only include fields that have been modified and are not empty
    if (medicineName.trim() !== '') data.medicineName = medicineName;
    if (dosage.trim() !== '') data.dosage = dosage;
    if (manufacturer.trim() !== '') data.manufacturer = manufacturer;
    if (storageRequirement.trim() !== '') data.storageRequirement = storageRequirement;
    if (sideEffects.trim() !== '') data.sideEffects = sideEffects;

    this.updateMedicine(data);
  };

  updateMedicine = async (data, medicineId) => {
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

    console.log('Data to be updated:', data);// Log the data being sent

    try {
      const response = await fetch(`http://localhost:8080/api/medicines/updateMedicine`, {
        method: 'PATCH', // Use PATCH for partial updates
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the header
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-cache', // Add this line to disable caching
        },
      });

      console.log('Update response status:', response.status);  // Check status
      console.log('Update response headers:', response.headers); // Verify headers

      if (!response.ok) {
      const errorBody = await response.text(); // Log error details
      console.error('Error updating medicine:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}. ${errorBody}`);
      }

      const responseData = await response.json();
      console.log('Update response data:', responseData);

      this.setState({
        responseData,
        result: true,
        error: null,
        alertMessage: 'Medicine updated successfully.',
        alertType: 'success',
      });

      alert('Medicine updated successfully');
    } catch (error) {
      console.error('Error updating medicine:', error);
      alert('Error Updating medicine');
      this.setState({
        alertMessage: 'Error updating medicine.',
        alertType: 'error',
        error: error.message,
      });
    }
  };

  handleReset = () => {
    this.setState({
      medicineId: '',
      medicineName: '',
      dosage: '',
      manufacturer: '',
      storageRequirement: '',
      sideEffects: '',
      alertMessage: null,
      alertType: '',
    });
  };

  render() {
    const { medicineId, medicineName, dosage, manufacturer, storageRequirement, sideEffects, alertMessage, alertType } = this.state;

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Update Medicine</h2>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="medicineId">Medicine ID:</label>
            <input
              type="text"
              id="medicineId"
              name="medicineId"
              value={medicineId}
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
              value={medicineName}
              onChange={this.handleChange}
              placeholder="Enter new name if you want to update"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="dosage">Dosage:</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={dosage}
              onChange={this.handleChange}
              placeholder="Enter new dosage if you want to update"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="manufacturer">Manufacturer:</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={manufacturer}
              onChange={this.handleChange}
              placeholder="Enter new manufacturer if you want to update"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="storageRequirement">Storage Requirement:</label>
            <input
              type="text"
              id="storageRequirement"
              name="storageRequirement"
              value={storageRequirement}
              onChange={this.handleChange}
              placeholder="Enter new storage requirement if you want to update"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="sideEffects">Side Effects:</label>
            <input
              type="text"
              id="sideEffects"
              name="sideEffects"
              value={sideEffects}
              onChange={this.handleChange}
              placeholder="Enter new side effects if you want to update"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: 'lightblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Update Medicine
            </button>
            <button type="button" onClick={this.handleReset} style={{ flex: 1, padding: '10px', backgroundColor: 'lightcoral', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </form>
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

export default UpdateMedicine;


