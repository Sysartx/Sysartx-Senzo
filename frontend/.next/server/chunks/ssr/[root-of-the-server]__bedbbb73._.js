module.exports = {

"[project]/.next-internal/server/app/(admin)/historical-data/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(admin)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(admin)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(admin)/historical-data/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// ************************
// "use client";
// import { useState, useEffect } from "react";
// import { Download, Upload, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // Custom Toast Component
// const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);
//   return (
//     <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
//       type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//     }`}>
//       {message}
//     </div>
//   );
// };
// export default function HistoricalDataPage() {
//   const [location, setLocation] = useState("");
//   const [provider, setProvider] = useState("");
//   const [year, setYear] = useState("");
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [toast, setToast] = useState<{message: string; type: 'success' | 'error'} | null>(null);
//   // Sample data
//   const [tableData, setTableData] = useState([
//     { id: 1, month: "January", headcount: 320, fte: 280, attrition: "5%" },
//     { id: 2, month: "February", headcount: 325, fte: 285, attrition: "4%" },
//     { id: 3, month: "March", headcount: 330, fte: 290, attrition: "6%" },
//     { id: 4, month: "April", headcount: 328, fte: 292, attrition: "5%" },
//     { id: 5, month: "May", headcount: 333, fte: 298, attrition: "4%" },
//     { id: 6, month: "June", headcount: 335, fte: 300, attrition: "3%" },
//     { id: 7, month: "July", headcount: 340, fte: 305, attrition: "4%" },
//   ]);
//   const showToast = (message: string, type: 'success' | 'error') => {
//     setToast({ message, type });
//   };
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };
//   const handleUploadSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedFile) {
//       // Simulate upload
//       setTimeout(() => {
//         showToast(`${selectedFile.name} uploaded successfully.`, 'success');
//         setSelectedFile(null);
//         setIsUploadModalOpen(false);
//       }, 1000);
//     } else {
//       showToast("Please select a file to upload.", 'error');
//     }
//   };
//   const handleDownload = () => {
//     try {
//       const templateData = [
//         ["Month", "Headcount", "FTE", "Attrition Rate"],
//         ...tableData.map(item => [item.month, item.headcount, item.fte, item.attrition])
//       ];
//       const csvContent = templateData.map(row => row.join(",")).join("\n");
//       const blob = new Blob([csvContent], { type: "text/csv" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "historical_data_template.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       showToast("Template download started.", 'success');
//     } catch (error) {
//       showToast("Failed to generate template.", 'error');
//     }
//   };
//   return (
//     <div className="container mx-auto px-4 py-8 text-gray-800 relative">
//       <h1 className="text-2xl font-bold mb-6">Historical Data</h1>
//       {/* Filters and Actions Row */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         {/* Location Dropdown */}
//         <div className="flex-1">
//           <label htmlFor="location" className="block text-sm font-medium mb-1">
//             Location
//           </label>
//           <select
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//           >
//             <option value="">All Locations</option>
//             <option value="north">North Dakota</option>
//             <option value="south">South Dakota</option>
//             <option value="minnesota">Minnesota</option>
//           </select>
//         </div>
//         {/* Provider Dropdown */}
//         <div className="flex-1">
//           <label htmlFor="provider" className="block text-sm font-medium mb-1">
//             Provider
//           </label>
//           <select
//             id="provider"
//             value={provider}
//             onChange={(e) => setProvider(e.target.value)}
//             className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//           >
//             <option value="">All Providers</option>
//             <option value="healthcare">Health Care Advis</option>
//             <option value="medical">Medical Solutions</option>
//             <option value="nursing">Nursing Professionals</option>
//           </select>
//         </div>
//         {/* Year Dropdown */}
//         <div className="flex-1">
//           <label htmlFor="year" className="block text-sm font-medium mb-1">
//             Year
//           </label>
//           <select
//             id="year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//           >
//             <option value="">All Years</option>
//             <option value="2023">2023</option>
//             <option value="2022">2022</option>
//             <option value="2021">2021</option>
//           </select>
//         </div>
//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-auto">
//           <Button
//             onClick={() => setIsUploadModalOpen(true)}
//             className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white"
//             variant="outline"
//           >
//             <Upload className="h-4 w-4" />
//             Upload Historical Data
//           </Button>
//           <Button
//             onClick={handleDownload}
//             className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white"
//             variant="outline"
//           >
//             <Download className="h-4 w-4" />
//             Download Template
//           </Button>
//         </div>
//       </div>
//       {/* Data Table */}
//       <div className="rounded-md border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table className="min-w-full">
//             <TableHeader className="bg-gray-200 text-lg">
//               <TableRow>
//                 <TableHead className="w-[100px]">Month</TableHead>
//                 <TableHead>Headcount</TableHead>
//                 <TableHead>FTE</TableHead>
//                 <TableHead>Attrition Rate</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {tableData.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell className="font-medium">{row.month}</TableCell>
//                   <TableCell>{row.headcount}</TableCell>
//                   <TableCell>{row.fte}</TableCell>
//                   <TableCell>{row.attrition}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       {/* Empty State */}
//       {tableData.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No historical data found for the selected filters</p>
//         </div>
//       )}
//       {/* Transparent Upload Modal */}
//       {isUploadModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black">
//           <div 
//             className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
//             onClick={() => setIsUploadModalOpen(false)}
//           />
//           <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md z-10">
//             <div className="flex justify-between items-center border-b p-4">
//               <h2 className="text-xl font-semibold">Upload Historical Data</h2>
//               <button 
//                 onClick={() => setIsUploadModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <form onSubmit={handleUploadSubmit} className="p-4 space-y-4">
//               <div>
//                 <Label htmlFor="file-upload">Select Excel File</Label>
//                 <Input
//                   id="file-upload"
//                   type="file"
//                   accept=".xlsx,.xls,.csv"
//                   onChange={handleFileChange}
//                   className="mt-1"
//                 />
//                 {selectedFile && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     Selected file: {selectedFile.name}
//                   </p>
//                 )}
//               </div>
//               <div className="flex justify-end gap-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsUploadModalOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   disabled={!selectedFile}
//                   className="bg-black text-white hover:bg-gray-800"
//                 >
//                   Upload
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* Custom Toast Notification */}
//       {toast && (
//         <Toast 
//           message={toast.message} 
//           type={toast.type} 
//           onClose={() => setToast(null)} 
//         />
//       )}
//     </div>
//   );
// }
// **********************
// "use client";
// import { useState } from "react";
// import { Download, Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// export default function HistoricalDataPage() {
//   // State for dropdown selections
//   const [location, setLocation] = useState("");
//   const [provider, setProvider] = useState("");
//   const [year, setYear] = useState("");
//   // Sample data - replace with your actual data
//   const [tableData, setTableData] = useState([
//     { id: 1, month: "January", headcount: 320, fte: 280, attrition: "5%" },
//     { id: 2, month: "February", headcount: 325, fte: 285, attrition: "4%" },
//     { id: 3, month: "March", headcount: 330, fte: 290, attrition: "6%" },
//     { id: 4, month: "April", headcount: 328, fte: 292, attrition: "5%" },
//     { id: 5, month: "May", headcount: 333, fte: 298, attrition: "4%" },
//     { id: 6, month: "June", headcount: 335, fte: 300, attrition: "3%" },
//     { id: 7, month: "July", headcount: 340, fte: 305, attrition: "4%" },
//   ]);
//   // Handle data upload (mock function)
//   const handleUpload = () => {
//     // In a real app, this would handle file upload
//     alert("Upload functionality would go here");
//   };
//   // Handle template download (mock function)
//   const handleDownload = () => {
//     // In a real app, this would trigger file download
//     alert("Download template functionality would go here");
//   };
//   return (
//     <div className="container mx-auto px-4 py-8 text-gray-800">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold mb-6">Historical Data</h1>
//       {/* Filters and Actions Row */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         {/* Location Dropdown */}
//         <div className="flex-1">
//           <label htmlFor="location" className="block text-sm font-medium mb-1">
//             Location
//           </label>
//           <select
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
//           >
//             <option value="">All Locations</option>
//             <option value="north">North Dakota</option>
//             <option value="south">South Dakota</option>
//             <option value="minnesota">Minnesota</option>
//           </select>
//         </div>
//         {/* Provider Dropdown */}
//         <div className="flex-1">
//           <label htmlFor="provider" className="block text-sm font-medium mb-1">
//             Provider
//           </label>
//           <select
//             id="provider"
//             value={provider}
//             onChange={(e) => setProvider(e.target.value)}
//             className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
//           >
//             <option value="">All Providers</option>
//             <option value="healthcare">Health Care Advis</option>
//             <option value="medical">Medical Solutions</option>
//             <option value="nursing">Nursing Professionals</option>
//           </select>
//         </div>
//         {/* Year Dropdown */}
//         <div className="flex-1">
//           <label htmlFor="year" className="block text-sm font-medium mb-1">
//             Year
//           </label>
//           <select
//             id="year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
//           >
//             <option value="">All Years</option>
//             <option value="2023">2023</option>
//             <option value="2022">2022</option>
//             <option value="2021">2021</option>
//           </select>
//         </div>
//         {/* Buttons - stack on mobile */}
//         <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-auto">
//           <Button
//             onClick={handleUpload}
//             className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white"
//             variant="outline"
//           >
//             <Upload className="h-4 w-4" />
//             Upload Historical Data
//           </Button>
//           <Button
//             onClick={handleDownload}
//             className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white"
//             variant="outline"
//           >
//             <Download className="h-4 w-4" />
//             Download Template
//           </Button>
//         </div>
//       </div>
//       {/* Data Table */}
//       <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table className="min-w-full">
//             <TableHeader className="bg-gray-200 dark:bg-gray-800 text-lg">
//               <TableRow>
//                 <TableHead className="w-[100px]">Month</TableHead>
//                 <TableHead>Headcount</TableHead>
//                 <TableHead>FTE</TableHead>
//                 <TableHead>Attrition Rate</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {tableData.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell className="font-medium">{row.month}</TableCell>
//                   <TableCell>{row.headcount}</TableCell>
//                   <TableCell>{row.fte}</TableCell>
//                   <TableCell>{row.attrition}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       {/* Empty State - shown when no data matches filters */}
//       {tableData.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No historical data found for the selected filters</p>
//         </div>
//       )}
//     </div>
//   );
// }
}}),
"[project]/src/app/(admin)/historical-data/page.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(admin)/historical-data/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__bedbbb73._.js.map