"use client";
import { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function HealthSystemDashboard() {
  // Dropdown states
  const [location, setLocation] = useState('north-dakota');
  const [provider, setProvider] = useState('health-care-advis');

  // Metrics data
  const metrics = [
    { name: 'Filled Headcount', value: '333', change: '+5%', trend: 'up' },
    { name: 'Filled Position', value: '245', change: '-2%', trend: 'down' },
    { name: 'Filled FTE', value: '298', change: '+3%', trend: 'up' },
    { name: 'Attrition Rate', value: '8.5%', change: '-1.2%', trend: 'down' },
    { name: 'Recruitment Rate', value: '12.3%', change: '+2.1%', trend: 'up' },
    { name: 'Vacancy Rate', value: '15.7%', change: '-0.5%', trend: 'down' },
  ];

  // Line chart data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Headcount',
        data: [320, 325, 330, 328, 333, 335, 340],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'FTE',
        data: [280, 285, 290, 292, 298, 300, 305],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: ['Nurses', 'Doctors', 'Admin', 'Technicians', 'Other'],
    datasets: [
      {
        data: [45, 20, 15, 12, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data
  const barChartData = {
    labels: ['Nursing', 'ER', 'Surgery', 'Pediatrics', 'ICU'],
    datasets: [
      {
        label: 'Current Staff',
        data: [120, 45, 60, 30, 40],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Vacancies',
        data: [15, 8, 12, 5, 7],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
    ],
  };

  // Table data
  const tableData = [
    { department: 'Nursing', headcount: 120, fte: 110, vacancies: 15, attrition: '8%' },
    { department: 'ER', headcount: 45, fte: 42, vacancies: 8, attrition: '12%' },
    { department: 'Surgery', headcount: 60, fte: 55, vacancies: 12, attrition: '6%' },
    { department: 'Pediatrics', headcount: 30, fte: 28, vacancies: 5, attrition: '5%' },
    { department: 'ICU', headcount: 40, fte: 38, vacancies: 7, attrition: '10%' },
    { department: 'Cardiology', headcount: 35, fte: 32, vacancies: 6, attrition: '7%' },
    { department: 'Oncology', headcount: 25, fte: 23, vacancies: 4, attrition: '9%' },
  ];

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Headcount & FTE Trends (Last 7 Months)',
      },
    },
    maintainAspectRatio: false,
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Staff Distribution by Category',
      },
    },
    maintainAspectRatio: false,
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Department Staffing Overview',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-auto container mx-auto px-4 py-8">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>

          {/* Dropdown Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-44 text-black">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north-dakota">North Dakota</SelectItem>
                  <SelectItem value="south-dakota">South Dakota</SelectItem>
                  <SelectItem value="minnesota">Minnesota</SelectItem>
                  <SelectItem value="montana">Montana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-52 text-black">
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health-care-advis">Health Care Advis</SelectItem>
                  <SelectItem value="medical-solutions">Medical Solutions</SelectItem>
                  <SelectItem value="nursing-professionals">Nursing Professionals</SelectItem>
                  <SelectItem value="staffing-plus">Staffing Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <div className={`flex items-center text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                  {metric.trend === 'up' ? (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-80">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-80">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Table */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 lg:col-span-2 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Department Staffing Details</h2>
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Headcount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FTE</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Vacancies</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attrition Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.headcount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.fte}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.vacancies}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.attrition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="h-96">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ********************

// "use client";
// import { useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function HealthSystemDashboard() {
//   const [checkedItems, setCheckedItems] = useState({
//     nurseRegistration: false,
//     areaRegistration: false,
//     targetedNurse: false,
//     notifyCare: false,
//     knowledgeTherapy: false,
//     provideDistribution: false,
//   });

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = event.target;
//     setCheckedItems(prev => ({
//       ...prev,
//       [name]: checked
//     }));
//   };

//   // Chart data
//   const workforceData = {
//     labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//     datasets: [
//       {
//         label: 'Headcount',
//         data: [144.0, 333.0, 455.0, 674.0],
//         backgroundColor: 'rgba(54, 162, 235, 0.5)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Positions',
//         data: [0.0, 0.0, 0.0, 0.0],
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Trends in Workforce Metrics',
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">North Dakota Health Systems</h1>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-gray-600 mt-2">
//             <p>Location 2</p>
//             <p className="hidden md:block">•</p>
//             <p>Health Care Advis</p>
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <MetricCard title="Effect Headcount" values={['333.0', '0.0', '0.0', '0.0']} />
//           <MetricCard title="Effect Position" values={['0.0', '0.0', '0.0']} />
//           <MetricCard title="Effect Rate" values={['0.0%', '0.0%']} />
//           <MetricCard title="Assessment Rate" values={['0.0%', '0.0%']} />
//           <MetricCard title="Vacancy Rate" values={['0.0%', '0.0%']} />
//         </div>

//         {/* Fixed Headcount Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Fixed Headcount</h2>
//           <div className="space-y-3">
//             <CheckboxItem
//               name="nurseRegistration"
//               label="Insert Our Area Registered Nurse Registration Therapist"
//               checked={checkedItems.nurseRegistration}
//               onChange={handleCheckboxChange}
//             />
//             <CheckboxItem
//               name="areaRegistration"
//               label="Register our Area Registered Nurse Registration Therapist"
//               checked={checkedItems.areaRegistration}
//               onChange={handleCheckboxChange}
//             />
//           </div>
//         </div>

//         {/* Questions Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Question: @ Twelve @ FTE</h2>
//             {/* Add content here if needed */}
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Question: Trends in Workforce Metrics</h2>
//             <div className="h-64">
//               <Bar data={workforceData} options={options} />
//             </div>
//           </div>
//         </div>

//         {/* Product Distribution */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Distribution</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <CheckboxItem
//               name="targetedNurse"
//               label="Targeted Nurse"
//               checked={checkedItems.targetedNurse}
//               onChange={handleCheckboxChange}
//             />
//             <CheckboxItem
//               name="notifyCare"
//               label="Notify Care Advis"
//               checked={checkedItems.notifyCare}
//               onChange={handleCheckboxChange}
//             />
//             <CheckboxItem
//               name="knowledgeTherapy"
//               label="Knowledge Therapy"
//               checked={checkedItems.knowledgeTherapy}
//               onChange={handleCheckboxChange}
//             />
//             <CheckboxItem
//               name="provideDistribution"
//               label="Provide Distribution"
//               checked={checkedItems.provideDistribution}
//               onChange={handleCheckboxChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable Metric Card Component
// function MetricCard({ title, values }: { title: string; values: string[] }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>
//       <div className="space-y-2">
//         {values.map((value, index) => (
//           <p key={index} className="text-gray-600">{value}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Reusable Checkbox Component
// function CheckboxItem({
//   name,
//   label,
//   checked,
//   onChange,
// }: {
//   name: string;
//   label: string;
//   checked: boolean;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }) {
//   return (
//     <label className="flex items-center space-x-3 cursor-pointer">
//       <input
//         type="checkbox"
//         name={name}
//         checked={checked}
//         onChange={onChange}
//         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//       />
//       <span className="text-gray-700">{label}</span>
//     </label>
//   );
// }





// *********************************


// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="bg-gray-800 border-gray-700">
//           <CardHeader>
//             <CardTitle className="text-lg  text-white">Total Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold  text-green-500">1,234</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-gray-800 border-gray-700">
//           <CardHeader>
//             <CardTitle className="text-lg text-white">Forecasts Generated</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold text-green-500">5,678</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-gray-800 border-gray-700">
//           <CardHeader>
//             <CardTitle className="text-lg text-white">System Health</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold text-green-500">Optimal</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-gray-800 border-gray-700">
//           <CardHeader>
//             <CardTitle className="text-lg text-white">Data Points</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold text-green-500">12.5M</p>
//           </CardContent>
//         </Card>
//       </div>
//       <Card className="bg-gray-800 border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-2xl text-white">Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="border-b border-gray-700 pb-4">
//               <p className="text-white">New forecast generated by Admin</p>
//               <p className="text-sm text-gray-400">2 hours ago</p>
//             </div>
//             <div className="border-b border-gray-700 pb-4">
//               <p className="text-white">System maintenance completed</p>
//               <p className="text-sm text-gray-400">1 day ago</p>
//             </div>
//             <div>
//               <p className="text-white">New user registered</p>
//               <p className="text-sm text-gray-400">2 days ago</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }