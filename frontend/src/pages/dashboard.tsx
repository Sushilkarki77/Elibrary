import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <ul className="mt-6">
          <li className="text-lg mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded">Home</a>
          </li>
          <li className="text-lg mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded">Profile</a>
          </li>
          <li className="text-lg mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded">Settings</a>
          </li>
          <li className="text-lg mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded">Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">
          This is your dashboard. Here you can manage your account, settings, and other features.
        </p>

        {/* Main Section (content blocks or data) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">User Statistics</h3>
            <p className="mt-2 text-gray-600">Overview of your user stats here...</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
            <p className="mt-2 text-gray-600">Recent activities in your account...</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
            <p className="mt-2 text-gray-600">View your latest notifications...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
