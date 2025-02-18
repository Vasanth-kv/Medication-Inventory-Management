import React, { Component } from 'react';

class FindMedicineById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicineId: '',
      medicineData: null,
      error: null,
      alertMessage: null,
      alertType: '', // 'success' or 'error'
    };
  }

  handleChange = (e) => {
    this.setState({ medicineId: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.medicineId.trim() !== '') {
      await this.findMedicineById(this.state.medicineId);
    } else {
      alert('Please enter a valid Medicine ID.');
    }
  };

  findMedicineById = async (medicineId) => {
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
      const response = await fetch(`http://localhost:8080/api/medicines/findMedicineById?medicineId=${medicineId}`, {
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
        const errorBody = await response.text(); // Log error details
        console.error('Error fetching medicines:', errorBody);
        throw new Error(`HTTP error! status: ${response.status}. ${errorBody}`);
      }

      const responseData = await response.json();
      console.log('Medicine Fetched successfully:', responseData);

      if (responseData.successMessage) {
        this.setState({
          medicineData: responseData.data,
          showMedicines: true,
          error: null,
          alertMessage: responseData.successMessage,
          alertType: 'success',
        });
      } else {
        this.setState({
          error: responseData.failureMessage || 'Unknown error occurred.',
          showMedicines: false,
          alertMessage: null,
          alertType: 'error',
        });
      }
      alert('Medicine Fetched successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching medicine');
      this.setState({
        error: error.message,
        alertMessage: 'Error fetching medicine',
        alertType: 'error',
      });
    }
  };

  handleReset = () => {
    this.setState({
      medicineId: '',
      medicineData: null,
      error: null,
      alertMessage: null,
      alertType: '',
    });
  };

  render() {
    const { medicineData, error, alertMessage, alertType } = this.state;
    console.log('Medicine Fetched successfully:', medicineData);
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Find Medicine by ID</h2>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label htmlFor="medicineId">Medicine ID:</label>
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: 'lightblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Find Medicine
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
        {medicineData && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ textAlign: 'center', color: '#333' }}>Medicine Details</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Medicine Id:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.medicineId}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Medicine Name:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.medicineName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Dosage:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.dosage}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Manufacturer:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.manufacturer}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>SideEffects:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.sideEffects}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>StorageRequirement:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.storageRequirement}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>CreatedAt:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.createdAt}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>UpdatedAt:</strong></td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{medicineData.updatedAt}</td>
                </tr>
                {/* Display other medication details here */}
              </tbody>
            </table>
          </div>
        )}
        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      </div>
    );
  }
}

export default FindMedicineById;
