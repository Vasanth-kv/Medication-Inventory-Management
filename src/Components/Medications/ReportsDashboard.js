import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportsDashboard = () => {
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [nearExpiryCount, setNearExpiryCount] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports/summary'); // Backend API
        setTotalMedicines(response.data.totalMedicines);
        setLowStockCount(response.data.lowStockCount);
        setNearExpiryCount(response.data.nearExpiryCount);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports Dashboard</h2>
      <ul>
        <li>Total Medicines: {totalMedicines}</li>
        <li>Low Stock Medicines: {lowStockCount}</li>
        <li>Near Expiry Medicines: {nearExpiryCount}</li>
      </ul>
    </div>
  );
};

export default ReportsDashboard;
