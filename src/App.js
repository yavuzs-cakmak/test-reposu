
import React from 'react';
import Layout from './Linked.jsx';
import FaultRequestForm from './pages/FaultRequestForm';
import DealerMap from './pages/DealerMap.js';


function App() {
  return (
    <div className="layout-container">
      <FaultRequestForm />
      <Layout />
      <DealerMap />
    </div>
  );
}

export default App;
