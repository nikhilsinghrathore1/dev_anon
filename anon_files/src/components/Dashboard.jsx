import React from 'react';
import { Calendar, Users, Clock, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');

  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Tasks',
        data: [70, 30],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Calendar className="mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold">Today</h3>
        </div>
        <p>{formattedDate}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Users className="mr-2 text-green-400" />
          <h3 className="text-lg font-semibold">Team Members</h3>
        </div>
        <p>12 Members</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Clock className="mr-2 text-yellow-400" />
          <h3 className="text-lg font-semibold">Overdue Tasks</h3>
        </div>
        <p>3 Tasks</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
        <div className="flex items-center mb-2">
          <Check className="mr-2 text-purple-400" />
          <h3 className="text-lg font-semibold">Task Completion</h3>
        </div>
        <div style={{ height: '200px' }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Announcements</h3>
        <ul className="list-disc list-inside">
          <li>New feature released!</li>
          <li>Maintenance scheduled for Sunday.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
