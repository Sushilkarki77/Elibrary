import React from 'react';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 bg-white border border-gray-300 m-4 rounded shadow-2xs p-8">
            <Outlet />
      </div>
    </div>

  );
};

export default Dashboard;
