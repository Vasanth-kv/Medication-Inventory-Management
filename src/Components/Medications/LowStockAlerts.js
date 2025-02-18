import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LowStockAlerts = () => {
  const [lowStockMedicines, setLowStockMedicines] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const response = await axios.get('/api/medicines/low-stock');
        setLowStockMedicines(response.data);
        if (response.data.length > 0) {
          toast.warn('Some medicines are running low on stock!');
        }
      } catch (error) {
        toast.error('Error fetching low stock medicines');
      }
    };
  
    fetchLowStock();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Low Stock Medicines</h2>
      <div className="row justify-content-center">
        {lowStockMedicines.length === 0 ? (
          <p className="text-center">No medicines are running low on stock.</p>
        ) : (
          <table className="table table-striped table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {lowStockMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LowStockAlerts;
