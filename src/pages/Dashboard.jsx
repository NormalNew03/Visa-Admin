import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Assuming backend runs on port 5000
        const response = await axios.get('https://my-drop-backend.onrender.com/api/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch applications');
        setLoading(false);
        console.error(err);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading applications...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Submitted Applications</h1>
      
      <div className="bg-white shadow overflow-hidden rounded-md border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {applications.length === 0 ? (
             <li className="px-6 py-4 text-gray-500">No applications found.</li>
          ) : (
            applications.map((app) => (
              <li key={app._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <Link to={`/application/${app._id}`} className="block px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-600 truncate">
                        {app.firstName} {app.middleName} {app.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.email} • {app.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
