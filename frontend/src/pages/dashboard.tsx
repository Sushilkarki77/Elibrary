import React from 'react';
import Sidebar from '../components/sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">
            Welcome to dashboard
      </div>
    </div>

  );
};

export default Dashboard;
