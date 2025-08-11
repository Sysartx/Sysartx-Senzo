module.exports = {

"[project]/.next-internal/server/app/(admin)/dashboard/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(admin)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(admin)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(admin)/dashboard/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
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
}}),
"[project]/src/app/(admin)/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(admin)/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__d16d3e57._.js.map