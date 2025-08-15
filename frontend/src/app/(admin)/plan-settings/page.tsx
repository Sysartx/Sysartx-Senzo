// "use client";
// import { useState, useEffect } from "react";
// import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, Download, Upload, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { format } from 'date-fns';
// import { Toaster } from "@/components/ui/sonner";

// type Category = "information" | "locations" | "providers" | "types" | "categories";

// type DataItem = {
//   id: string;
//   name: string;
//   description?: string;
//   status?: "Active" | "Inactive" | "Approved" | "Pending" | "Rejected";
//   createdAt?: string;
//   updatedAt?: string;
// };

// export default function PlanSettingsPage() {
//   const [activeCategory, setActiveCategory] = useState<Category>("information");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [itemToDelete, setItemToDelete] = useState<string | null>(null);
//   const [itemToEdit, setItemToEdit] = useState<DataItem | null>(null);
//   const [newItem, setNewItem] = useState({ name: "", description: "", status: "Active" as const });
//   const [editItem, setEditItem] = useState({ name: "", description: "", status: "Active" as const });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [isMobile, setIsMobile] = useState(false);

//   // Sample data with more fields
//   const [data, setData] = useState<Record<Category, DataItem[]>>({
//     information: [
//       { id: "1", name: "Plan Overview", description: "General plan information", status: "Active", createdAt: "2023-01-15", updatedAt: "2023-01-15" },
//       { id: "2", name: "Budget Details", description: "Financial information", status: "Active", createdAt: "2023-01-16", updatedAt: "2023-02-20" },
//       { id: "3", name: "Timeline", description: "Project schedule", status: "Inactive", createdAt: "2023-01-17", updatedAt: "2023-03-10" },
//       { id: "4", name: "Risk Assessment", description: "Potential risks and mitigation", status: "Active", createdAt: "2023-02-01", updatedAt: "2023-02-01" },
//       { id: "5", name: "Stakeholders", description: "Key stakeholders list", status: "Active", createdAt: "2023-02-05", updatedAt: "2023-02-05" },
//     ],
//     locations: [
//       { id: "1", name: "North Region", status: "Active", createdAt: "2023-01-10", updatedAt: "2023-01-10" },
//       { id: "2", name: "South Region", status: "Active", createdAt: "2023-01-11", updatedAt: "2023-01-11" },
//       { id: "3", name: "East Wing", status: "Inactive", createdAt: "2023-01-12", updatedAt: "2023-03-15" },
//       { id: "4", name: "West Wing", status: "Active", createdAt: "2023-02-01", updatedAt: "2023-02-01" },
//       { id: "5", name: "Central Hub", status: "Pending", createdAt: "2023-02-10", updatedAt: "2023-02-10" },
//     ],
//     providers: [
//       { id: "1", name: "HealthCare Inc", status: "Approved", createdAt: "2023-01-05", updatedAt: "2023-01-05" },
//       { id: "2", name: "MediSolutions", status: "Pending", createdAt: "2023-01-06", updatedAt: "2023-01-06" },
//       { id: "3", name: "Nursing Pros", status: "Approved", createdAt: "2023-01-07", updatedAt: "2023-02-18" },
//       { id: "4", name: "Surgical Associates", status: "Rejected", createdAt: "2023-02-01", updatedAt: "2023-02-15" },
//       { id: "5", name: "PharmaCare", status: "Approved", createdAt: "2023-02-05", updatedAt: "2023-02-05" },
//     ],
//     types: [
//       { id: "1", name: "Full-Time", description: "40 hours/week", status: "Active", createdAt: "2023-01-08", updatedAt: "2023-01-08" },
//       { id: "2", name: "Part-Time", description: "20 hours/week", status: "Active", createdAt: "2023-01-09", updatedAt: "2023-01-09" },
//       { id: "3", name: "Contract", description: "Project-based", status: "Active", createdAt: "2023-01-10", updatedAt: "2023-03-12" },
//       { id: "4", name: "Temporary", description: "Seasonal work", status: "Inactive", createdAt: "2023-02-01", updatedAt: "2023-02-01" },
//       { id: "5", name: "Internship", description: "Training position", status: "Active", createdAt: "2023-02-05", updatedAt: "2023-02-05" },
//     ],
//     categories: [
//       { id: "1", name: "Clinical", description: "Medical staff", status: "Active", createdAt: "2023-01-12", updatedAt: "2023-01-12" },
//       { id: "2", name: "Administrative", description: "Support staff", status: "Active", createdAt: "2023-01-13", updatedAt: "2023-01-13" },
//       { id: "3", name: "Technical", description: "IT staff", status: "Active", createdAt: "2023-01-14", updatedAt: "2023-02-20" },
//       { id: "4", name: "Research", description: "R&D personnel", status: "Pending", createdAt: "2023-02-01", updatedAt: "2023-02-01" },
//       { id: "5", name: "Maintenance", description: "Facilities team", status: "Active", createdAt: "2023-02-05", updatedAt: "2023-02-05" },
//     ],
//   });

//   // Check for mobile view
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   const filteredData = data[activeCategory].filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())))
//     .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime());

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const currentData = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleAddItem = () => {
//     if (!newItem.name.trim()) {
//       toast.error("Name is required");
//       return;
//     }

//     const newId = (data[activeCategory].length + 1).toString();
//     const newItemWithId = {
//       id: newId,
//       name: newItem.name,
//       ...(activeCategory === "information" || activeCategory === "types" || activeCategory === "categories"
//         ? { description: newItem.description }
//         : {}),
//       ...(activeCategory === "locations" || activeCategory === "providers"
//         ? { status: newItem.status }
//         : { status: "Active" }),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };

//     setData(prev => ({
//       ...prev,
//       [activeCategory]: [...prev[activeCategory], newItemWithId]
//     }));

//     toast.success(`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} added successfully`);
//     setIsAddModalOpen(false);
//     setNewItem({ name: "", description: "", status: "Active" });
//   };

//   const handleEditClick = (id: string) => {
//     const item = data[activeCategory].find(item => item.id === id);
//     if (!item) {
//       toast.error("Item not found");
//       return;
//     }

//     setItemToEdit(item);
//     setEditItem({
//       name: item.name,
//       description: item.description || "",
//       status: item.status || "Active"
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateItem = () => {
//     if (!editItem.name.trim()) {
//       toast.error("Name is required");
//       return;
//     }

//     if (!itemToEdit) return;

//     setData(prev => ({
//       ...prev,
//       [activeCategory]: prev[activeCategory].map(item =>
//         item.id === itemToEdit.id
//           ? {
//             ...item,
//             name: editItem.name,
//             ...(activeCategory === "information" || activeCategory === "types" || activeCategory === "categories"
//               ? { description: editItem.description }
//               : {}),
//             ...(activeCategory === "locations" || activeCategory === "providers"
//               ? { status: editItem.status }
//               : {}),
//             updatedAt: new Date().toISOString()
//           }
//           : item
//       )
//     }));

//     toast.success("Item updated successfully");
//     setIsEditModalOpen(false);
//     setItemToEdit(null);
//   };

//   const handleDeleteClick = (id: string) => {
//     setItemToDelete(id);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (!itemToDelete) return;

//     const itemName = data[activeCategory].find(item => item.id === itemToDelete)?.name || "Item";

//     setData(prev => ({
//       ...prev,
//       [activeCategory]: prev[activeCategory].filter(item => item.id !== itemToDelete)
//     }));

//     toast.success(`${itemName} deleted successfully`);
//     setIsDeleteDialogOpen(false);
//     setItemToDelete(null);
//     setCurrentPage(1); // Reset to first page after deletion
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
      
//       // Basic validation
//       if (!file.name.match(/\.(csv|json)$/)) {
//         toast.error("Please upload a CSV or JSON file");
//         return;
//       }
      
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         toast.error("File size should be less than 5MB");
//         return;
//       }
      
//       setSelectedFile(file);
//     }
//   };

//   const handleImportSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       toast.error("Please select a file to upload");
//       return;
//     }

//     const toastId = toast.loading("Importing data...");

//     try {
//       // Simulate file processing
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // In a real app, you would parse the file and validate data here
//       // Then update the data state with the new data
      
//       toast.success(`${selectedFile.name} imported successfully`, {
//         id: toastId,
//         action: {
//           label: "View Changes",
//           onClick: () => {
//             toast.info("Showing changes from imported data");
//           },
//         },
//       });
      
//       setSelectedFile(null);
//       setIsImportDialogOpen(false);
//     } catch (error) {
//       toast.error("Failed to import file", {
//         id: toastId,
//         description: "Please check the file format and try again",
//       });
//     }
//   };

//   const handleExport = (format: 'csv' | 'json' = 'json') => {
//     try {
//       toast.promise(
//         new Promise((resolve) => {
//           if (format === 'csv') {
//             const headers = ["ID", "Name", "Description", "Status", "Created At", "Updated At"];
//             const csvContent = [
//               headers.join(","),
//               ...filteredData.map(item => [
//                 item.id,
//                 `"${item.name.replace(/"/g, '""')}"`,
//                 item.description ? `"${item.description.replace(/"/g, '""')}"` : '',
//                 item.status || '',
//                 item.createdAt || '',
//                 item.updatedAt || ''
//               ].join(","))
//             ].join("\n");

//             const blob = new Blob([csvContent], { type: "text/csv" });
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement("a");
//             link.href = url;
//             // link.setAttribute("download", `${activeCategory}_${format(new Date(), 'yyyyMMdd')}.csv`);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//           } else {
//             // JSON download
//             const dataStr = JSON.stringify(filteredData, null, 2);
//             const blob = new Blob([dataStr], { type: "application/json" });
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement("a");
//             link.href = url;
//             // link.setAttribute("download", `${activeCategory}_${format(new Date(), 'yyyyMMdd')}.json`);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//           }

//           setTimeout(resolve, 1000);
//         }),
//         {
//           loading: "Preparing export...",
//           success: `Data exported as ${format.toUpperCase()} successfully`,
//           error: "Failed to generate export file",
//         }
//       );
//     } catch (error) {
//       toast.error("Failed to generate export file");
//     }
//   };

//   const getStatusBadge = (status?: string) => {
//     if (!status) return null;
    
//     const variantMap = {
//       Active: "default",
//       Approved: "success",
//       Pending: "warning",
//       Inactive: "secondary",
//       Rejected: "destructive"
//     };

//     return (
//       <Badge variant={variantMap[status as keyof typeof variantMap] || "default"}>
//         {status}
//       </Badge>
//     );
//   };

//   return (
//     <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 text-gray-800">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Plan Settings</h1>

//       {/* Category Selector */}
//       <div className="mb-6 sm:mb-8 w-full">
//         <Tabs value={activeCategory} className="w-full">
//           <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-auto p-2 w-full">
//             {(["information", "locations", "providers", "types", "categories"] as Category[]).map((category) => (
//               <TabsTrigger
//                 key={category}
//                 value={category}
//                 onClick={() => {
//                   setActiveCategory(category);
//                   setCurrentPage(1); // Reset to first page when changing category
//                   setSearchTerm(""); // Clear search when changing category
//                 }}
//                 className={`py-2 flex flex-col cursor-pointer items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-transparent"}`}
//               >
//                 <span className="text-sm sm:text-base">
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </span>
//               </TabsTrigger>
//             ))}
//           </TabsList>
//         </Tabs>
//       </div>

//       {/* Search and Action Buttons */}
//       <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
//         <div className="relative w-full sm:w-64">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//           <Input
//             placeholder={`Search ${activeCategory}...`}
//             className="pl-10 text-sm sm:text-base"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1); // Reset to first page when searching
//             }}
//           />
//         </div>
//         <div className="flex gap-2 sm:gap-3">
//           <div className="relative group">
//             <Button 
//               onClick={() => handleExport('json')} 
//               variant="outline" 
//               size={isMobile ? "sm" : "default"}
//               className="gap-2"
//             >
//               <Download className="h-4 w-4" />
//               <span className="hidden sm:inline">Export</span>
//             </Button>
//             <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md z-10 hidden group-hover:block">
//               <button
//                 onClick={() => handleExport('csv')}
//                 className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//               >
//                 Export as CSV
//               </button>
//               <button
//                 onClick={() => handleExport('json')}
//                 className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//               >
//                 Export as JSON
//               </button>
//             </div>
//           </div>
//           <Button 
//             onClick={() => setIsImportDialogOpen(true)} 
//             variant="outline" 
//             size={isMobile ? "sm" : "default"}
//             className="gap-2"
//           >
//             <Upload className="h-4 w-4" />
//             <span className="hidden sm:inline">Import</span>
//           </Button>
//           <Button 
//             onClick={() => setIsAddModalOpen(true)} 
//             size={isMobile ? "sm" : "default"}
//             className="gap-2"
//           >
//             <Plus className="h-4 w-4" />
//             <span className="hidden sm:inline">Add</span>
//             <span className="sm:hidden">Add {activeCategory.slice(0, 3)}</span>
//           </Button>
//         </div>
//       </div>

//       {/* Data Table */}
//       <div className="rounded-md border overflow-hidden bg-white">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 {["information", "types", "categories"].includes(activeCategory) && (
//                   <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Description
//                   </th>
//                 )}
//                 {["locations", "providers"].includes(activeCategory) && (
//                   <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 )}
//                 {!isMobile && (
//                   <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Last Updated
//                   </th>
//                 )}
//                 <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentData.length > 0 ? (
//                 currentData.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {item.name}
//                     </td>
//                     {["information", "types", "categories"].includes(activeCategory) && (
//                       <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
//                         {item.description || "-"}
//                       </td>
//                     )}
//                     {["locations", "providers"].includes(activeCategory) && (
//                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {getStatusBadge(item.status)}
//                       </td>
//                     )}
//                     {!isMobile && (
//                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.updatedAt ? format(new Date(item.updatedAt), 'MMM d, yyyy') : 
//                          item.createdAt ? format(new Date(item.createdAt), 'MMM d, yyyy') : '-'}
//                       </td>
//                     )}
//                     <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex space-x-1 sm:space-x-2">
//                         <Button
//                           variant="ghost"
//                           size={isMobile ? "sm" : "icon"}
//                           onClick={() => handleEditClick(item.id)}
//                           className="text-gray-800 hover:text-gray-600"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size={isMobile ? "sm" : "icon"}
//                           onClick={() => handleDeleteClick(item.id)}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={
//                       ["information", "types", "categories"].includes(activeCategory) ? 
//                         (isMobile ? 3 : 4) : 
//                         ["locations", "providers"].includes(activeCategory) ? 
//                           (isMobile ? 3 : 4) : 
//                           (isMobile ? 2 : 3)
//                     }
//                     className="px-6 py-4 text-center text-sm text-gray-500"
//                   >
//                     No {activeCategory} found matching your search.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > 0 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 sm:gap-0">
//           <div className="text-xs sm:text-sm text-gray-500">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
//             {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
//             {filteredData.length} entries
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="h-4 w-4" />
//               <span className="sr-only">Previous</span>
//             </Button>
//             <div className="flex items-center justify-center px-3 text-xs sm:text-sm">
//               Page {currentPage} of {totalPages}
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//             >
//               <ChevronRight className="h-4 w-4" />
//               <span className="sr-only">Next</span>
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Add Modal */}
//       <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>
//               Add New {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Name *
//               </Label>
//               <Input
//                 id="name"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 className="col-span-3"
//                 placeholder={`Enter ${activeCategory} name`}
//               />
//             </div>
//             {["information", "types", "categories"].includes(activeCategory) && (
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="description" className="text-right">
//                   Description
//                 </Label>
//                 <Input
//                   id="description"
//                   value={newItem.description}
//                   onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//                   className="col-span-3"
//                   placeholder="Enter description (optional)"
//                 />
//               </div>
//             )}
//             {["locations", "providers"].includes(activeCategory) && (
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="status" className="text-right">
//                   Status
//                 </Label>
//                 <Select
//                   value={newItem.status}
//                   onValueChange={(value) => setNewItem({ ...newItem, status: value as any })}
//                 >
//                   <SelectTrigger className="col-span-3">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Active">Active</SelectItem>
//                     <SelectItem value="Pending">Pending</SelectItem>
//                     {activeCategory === "providers" && (
//                       <SelectItem value="Approved">Approved</SelectItem>
//                     )}
//                     <SelectItem value="Inactive">Inactive</SelectItem>
//                     {activeCategory === "providers" && (
//                       <SelectItem value="Rejected">Rejected</SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddItem}>
//               Add
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>
//               Edit {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-name" className="text-right">
//                 Name *
//               </Label>
//               <Input
//                 value={editItem.name}
//                 onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
//                 className="col-span-3"
//                 placeholder={`Enter ${activeCategory} name`}
//               />
//             </div>
//             {["information", "types", "categories"].includes(activeCategory) && (
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="edit-description" className="text-right">
//                   Description
//                 </Label>
//                 <Input
//                   value={editItem.description}
//                   onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
//                   className="col-span-3"
//                   placeholder="Enter description (optional)"
//                 />
//               </div>
//             )}
//             {["locations", "providers"].includes(activeCategory) && (
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="edit-status" className="text-right">
//                   Status
//                 </Label>
//                 <Select
//                   value={editItem.status}
//                   onValueChange={(value) => setEditItem({ ...editItem, status: value as any })}
//                 >
//                   <SelectTrigger className="col-span-3">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Active">Active</SelectItem>
//                     <SelectItem value="Pending">Pending</SelectItem>
//                     {activeCategory === "providers" && (
//                       <SelectItem value="Approved">Approved</SelectItem>
//                     )}
//                     <SelectItem value="Inactive">Inactive</SelectItem>
//                     {activeCategory === "providers" && (
//                       <SelectItem value="Rejected">Rejected</SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateItem}>
//               Save Changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the {activeCategory.slice(0, -1)}.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//               onClick={handleConfirmDelete}
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Import Dialog */}
//       <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Import {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleImportSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="file-import">Select Data File (CSV/JSON)</Label>
//               <Input
//                 id="file-import"
//                 type="file"
//                 accept=".csv,.json"
//                 onChange={handleFileChange}
//                 className="mt-1"
//               />
//               {selectedFile && (
//                 <div className="flex items-center justify-between mt-2 p-2 bg-gray-100 rounded">
//                   <span className="text-sm text-gray-600 truncate max-w-[180px] sm:max-w-xs">
//                     {selectedFile.name}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedFile(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">
//                 Max file size: 5MB. Supported formats: CSV, JSON
//               </p>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button
//                 type="submit"
//                 disabled={!selectedFile}
//               >
//                 Import
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={() => setIsImportDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Toaster */}
//       <Toaster position={isMobile ? "top-center" : "bottom-right"} richColors />
//     </div>
//   );
// }






"use client";
import { useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "information" | "locations" | "providers" | "types" | "categories";

type DataItem = {
  id: string;
  name: string;
  description?: string;
  status?: string;
};

export default function PlanSettingsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("information");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<DataItem | null>(null);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [editItem, setEditItem] = useState({ name: "", description: "" });
  const [data, setData] = useState<Record<Category, DataItem[]>>({
    information: [
      { id: "1", name: "Plan Overview", description: "General plan information" },
      { id: "2", name: "Budget Details", description: "Financial information" },
      { id: "3", name: "Timeline", description: "Project schedule" },
    ],
    locations: [
      { id: "1", name: "North Region", status: "Active" },
      { id: "2", name: "South Region", status: "Active" },
      { id: "3", name: "East Wing", status: "Inactive" },
    ],
    providers: [
      { id: "1", name: "HealthCare Inc", status: "Approved" },
      { id: "2", name: "MediSolutions", status: "Pending" },
      { id: "3", name: "Nursing Pros", status: "Approved" },
    ],
    types: [
      { id: "1", name: "Full-Time", description: "40 hours/week" },
      { id: "2", name: "Part-Time", description: "20 hours/week" },
      { id: "3", name: "Contract", description: "Project-based" },
    ],
    categories: [
      { id: "1", name: "Clinical", description: "Medical staff" },
      { id: "2", name: "Administrative", description: "Support staff" },
      { id: "3", name: "Technical", description: "IT staff" },
    ],
  });

  const filteredData = data[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const newId = (data[activeCategory].length + 1).toString();
    const newItemWithId = {
      id: newId,
      name: newItem.name,
      ...(activeCategory === "information" || activeCategory === "types" || activeCategory === "categories"
        ? { description: newItem.description }
        : {}),
      ...(activeCategory === "locations" || activeCategory === "providers"
        ? { status: "Active" }
        : {}),
    };

    setData(prev => ({
      ...prev,
      [activeCategory]: [...prev[activeCategory], newItemWithId]
    }));

    toast.success(`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} added successfully`);
    setIsAddModalOpen(false);
    setNewItem({ name: "", description: "" });
  };

  const handleEditClick = (id: string) => {
    const item = data[activeCategory].find(item => item.id === id);
    if (!item) {
      toast.error("Item not found");
      return;
    }

    setItemToEdit(item);
    setEditItem({
      name: item.name,
      description: item.description || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateItem = () => {
    if (!editItem.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!itemToEdit) return;

    setData(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(item =>
        item.id === itemToEdit.id
          ? {
            ...item,
            name: editItem.name,
            ...(activeCategory === "information" || activeCategory === "types" || activeCategory === "categories"
              ? { description: editItem.description }
              : {}),
          }
          : item
      )
    }));

    toast.success("Item updated successfully");
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    const itemName = data[activeCategory].find(item => item.id === itemToDelete)?.name || "Item";

    setData(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].filter(item => item.id !== itemToDelete)
    }));

    toast.success(`${itemName} deleted successfully`);
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-2xl font-bold mb-8">Plan Settings</h1>

      {/* Category Selector */}
      <div className="mb-8 w-full">
        <Tabs
          value={activeCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-auto p-2 w-full ">
            {(["information", "locations", "providers", "types", "categories"] as Category[]).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 flex flex-col cursor-pointer items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-transparent"
                  }`}
              >
                <span className="text-lg">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${activeCategory}...`}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </Button>
      </div>

      {/* Data Table */}
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {["information", "types", "categories"].includes(activeCategory) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                )}
                {["locations", "providers"].includes(activeCategory) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    {["information", "types", "categories"].includes(activeCategory) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.description}
                      </td>
                    )}
                    {["locations", "providers"].includes(activeCategory) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${item.status === "Active" || item.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {item.status}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(item.id)}
                          className="text-gray-800 hover:text-gray-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      ["information", "types", "categories"].includes(activeCategory) ? 3 :
                        ["locations", "providers"].includes(activeCategory) ? 3 : 2
                    }
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No {activeCategory} found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] text-black">
          <DialogHeader>
            <DialogTitle>
              Add New {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="col-span-3"
                placeholder={`enter ${activeCategory} name`}
              />
            </div>
            {["information", "types", "categories"].includes(activeCategory) && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="col-span-3"
                  placeholder="enter description"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] text-black">
          <DialogHeader>
            <DialogTitle>
              Edit {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name *
              </Label>
              <Input
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                className="col-span-3"
                placeholder={`Enter ${activeCategory} name`}
              />
            </div>
            {["information", "types", "categories"].includes(activeCategory) && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter description"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateItem}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {activeCategory.slice(0, -1)}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
