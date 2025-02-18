import React from 'react';

function AppFooter() {
  return (
    <div style={{textAlign:'center', marginTop:'20px'}}>
      {/* Customize your footer content */}
      <p>&copy; {new Date().getFullYear()} Medication Inventory. All rights reserved.</p>
    </div>
  );
}

export default AppFooter;
