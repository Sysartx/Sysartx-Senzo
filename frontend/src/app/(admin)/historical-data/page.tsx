"use client";
import { useState, useEffect } from "react";
import { Download, Upload, X, Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Types for our data
type HistoricalData = {
  id: number;
  month: string;
  headcount: number;
  fte: number;
  attrition: string;
  location: string;
  provider: string;
  year: string;
};

type EditData = {
  id: number | null;
  month: string;
  headcount: number;
  fte: number;
  attrition: string;
};

export default function HistoricalDataPage() {
  // State for filters
  const [location, setLocation] = useState<string>("all");
  const [provider, setProvider] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // State for data handling
  const [tableData, setTableData] = useState<HistoricalData[]>([]);
  const [filteredData, setFilteredData] = useState<HistoricalData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    id: null,
    month: "",
    headcount: 0,
    fte: 0,
    attrition: "0%"
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Chart display state
  const [showChart, setShowChart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Sample data - would normally come from API
  const sampleData: HistoricalData[] = [
    { id: 1, month: "January", headcount: 320, fte: 280, attrition: "5%", location: "north", provider: "healthcare", year: "2023" },
    { id: 2, month: "February", headcount: 325, fte: 285, attrition: "4%", location: "north", provider: "healthcare", year: "2023" },
    { id: 3, month: "March", headcount: 330, fte: 290, attrition: "6%", location: "south", provider: "medical", year: "2023" },
    { id: 4, month: "April", headcount: 328, fte: 292, attrition: "5%", location: "south", provider: "medical", year: "2023" },
    { id: 5, month: "May", headcount: 333, fte: 298, attrition: "4%", location: "minnesota", provider: "nursing", year: "2023" },
    { id: 6, month: "June", headcount: 335, fte: 300, attrition: "3%", location: "minnesota", provider: "nursing", year: "2023" },
    { id: 7, month: "July", headcount: 340, fte: 305, attrition: "4%", location: "north", provider: "healthcare", year: "2023" },
    { id: 8, month: "August", headcount: 345, fte: 310, attrition: "3%", location: "south", provider: "medical", year: "2023" },
    { id: 9, month: "September", headcount: 350, fte: 315, attrition: "2%", location: "minnesota", provider: "nursing", year: "2023" },
    { id: 10, month: "October", headcount: 355, fte: 320, attrition: "3%", location: "north", provider: "healthcare", year: "2023" },
    { id: 11, month: "November", headcount: 360, fte: 325, attrition: "2%", location: "south", provider: "medical", year: "2023" },
    { id: 12, month: "December", headcount: 365, fte: 330, attrition: "1%", location: "minnesota", provider: "nursing", year: "2023" },
    // Previous year data
    { id: 13, month: "January", headcount: 300, fte: 260, attrition: "6%", location: "north", provider: "healthcare", year: "2022" },
    { id: 14, month: "February", headcount: 305, fte: 265, attrition: "5%", location: "south", provider: "medical", year: "2022" },
    { id: 15, month: "March", headcount: 310, fte: 270, attrition: "7%", location: "minnesota", provider: "nursing", year: "2022" },
  ];

  // Initialize with sample data
  useEffect(() => {
    setTableData(sampleData);
    setFilteredData(sampleData);
  }, []);

  // Filter data when filters change
  useEffect(() => {
    let result = [...tableData];
    
    // Apply location filter
    if (location !== "all") {
      result = result.filter(item => item.location === location);
    }
    
    // Apply provider filter
    if (provider !== "all") {
      result = result.filter(item => item.provider === provider);
    }
    
    // Apply year filter
    if (year !== "all") {
      result = result.filter(item => item.year === year);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.month.toLowerCase().includes(term) ||
        item.headcount.toString().includes(term) ||
        item.fte.toString().includes(term) ||
        item.attrition.includes(term)
      );
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [location, provider, year, searchTerm, tableData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.name.match(/\.(csv|xlsx|xls)$/)) {
        toast.error("Please upload a CSV or Excel file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const toastId = toast.loading("Uploading and processing file...");

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would parse the file and validate data here
      // Then update the tableData state with the new data
      
      toast.success(`${selectedFile.name} uploaded and processed successfully`, {
        id: toastId,
        action: {
          label: "View Changes",
          onClick: () => {
            // You could show a diff of changes here
            toast.info("Showing changes from uploaded data");
          },
        },
      });
      
      setSelectedFile(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to process file", {
        id: toastId,
        description: "Please check the file format and try again",
      });
    }
  };

  const handleDownload = (format: 'csv' | 'json' = 'csv') => {
    try {
      toast.promise(
        new Promise((resolve) => {
          if (format === 'csv') {
            const headers = ["Month", "Headcount", "FTE", "Attrition Rate", "Location", "Provider", "Year"];
            const csvContent = [
              headers.join(","),
              ...filteredData.map(item => [
                item.month,
                item.headcount,
                item.fte,
                item.attrition,
                item.location,
                item.provider,
                item.year
              ].join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `historical_data_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            // JSON download
            const dataStr = JSON.stringify(filteredData, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `historical_data_${new Date().toISOString().slice(0, 10)}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

          setTimeout(resolve, 1000);
        }),
        {
          loading: "Preparing download...",
          success: `Data exported as ${format.toUpperCase()} successfully`,
          error: "Failed to generate export file",
        }
      );
    } catch (error) {
      toast.error("Failed to generate export file");
    }
  };

  const handleEdit = (data: HistoricalData) => {
    setEditData({
      id: data.id,
      month: data.month,
      headcount: data.headcount,
      fte: data.fte,
      attrition: data.attrition
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editData.id) return;
    
    setTableData(prevData =>
      prevData.map(item =>
        item.id === editData.id
          ? {
              ...item,
              headcount: editData.headcount,
              fte: editData.fte,
              attrition: editData.attrition
            }
          : item
      )
    );
    
    toast.success("Data updated successfully");
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setTableData(prevData => prevData.filter(item => item.id !== id));
    toast.success("Record deleted successfully");
  };

  // Prepare data for chart
  const chartData = filteredData.map(item => ({
    month: item.month,
    headcount: item.headcount,
    fte: item.fte,
    attrition: parseFloat(item.attrition.replace('%', ''))
  }));
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 text-gray-800 relative">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
        Historical Workforce Data
      </h1>

      {/* Filters and Actions Row */}
      <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Search and Chart Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search historical data..."
              className="pl-10 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowChart(!showChart)}
              variant="outline"
              className="flex items-center gap-2 text-sm sm:text-base"
              size={isMobile ? "sm" : "default"}
            >
              {showChart ? "Hide Chart" : "Show Chart"}
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Location Dropdown */}
          <div>
            <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm sm:text-base">All Locations</SelectItem>
                <SelectItem value="north" className="text-sm sm:text-base">North Dakota</SelectItem>
                <SelectItem value="south" className="text-sm sm:text-base">South Dakota</SelectItem>
                <SelectItem value="minnesota" className="text-sm sm:text-base">Minnesota</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Provider Dropdown */}
          <div>
            <Label htmlFor="provider" className="text-sm sm:text-base">Provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="All Providers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm sm:text-base">All Providers</SelectItem>
                <SelectItem value="healthcare" className="text-sm sm:text-base">Health Care Advis</SelectItem>
                <SelectItem value="medical" className="text-sm sm:text-base">Medical Solutions</SelectItem>
                <SelectItem value="nursing" className="text-sm sm:text-base">Nursing Professionals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Year Dropdown */}
          <div>
            <Label htmlFor="year" className="text-sm sm:text-base">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm sm:text-base">All Years</SelectItem>
                <SelectItem value="2023" className="text-sm sm:text-base">2023</SelectItem>
                <SelectItem value="2022" className="text-sm sm:text-base">2022</SelectItem>
                <SelectItem value="2021" className="text-sm sm:text-base">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons - Adjusted for better responsiveness */}
          <div className="flex flex-col sm:flex-row gap-2 my-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white w-full sm:w-auto"
                  variant="outline"
                  size={isMobile ? "sm" : "default"}
                >
                  <Upload className="h-4 w-4" />
                  <span className="truncate">{isMobile ? "Upload" : "Upload Data"}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 font-bold">Upload Historical Data</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">Select Data File (CSV/Excel)</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                    {selectedFile && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-100 rounded">
                        <span className="text-sm text-gray-600 truncate max-w-[180px] sm:max-w-xs">
                          {selectedFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 5MB. Supported formats: CSV, XLSX, XLS
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="submit"
                      disabled={!selectedFile}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Upload & Process
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" className="text-gray-900">Cancel</Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <div className="relative w-full">
              <Button
                onClick={() => handleDownload('csv')}
                className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white w-full sm:w-auto"
                variant="outline"
                size={isMobile ? "sm" : "default"}
              >
                <Download className="h-4 w-4" />
                <span className="truncate">Export</span>
              </Button>
              <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md z-10 hidden group-hover:block">
                <button
                  onClick={() => handleDownload('csv')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleDownload('json')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Export as JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      {showChart && filteredData.length > 0 && (
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">Workforce Data Visualization</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={isMobile ? -45 : 0} textAnchor={isMobile ? "end" : "middle"} height={isMobile ? 60 : 30} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="headcount" fill="#8884d8" name="Headcount" />
                <Bar dataKey="fte" fill="#82ca9d" name="FTE" />
                <Bar dataKey="attrition" fill="#ffc658" name="Attrition (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="rounded-md border border-gray-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="min-w-[100px] sm:min-w-[120px]">Month</TableHead>
                <TableHead>Headcount</TableHead>
                <TableHead>FTE</TableHead>
                <TableHead>Attrition</TableHead>
                {!isMobile && (
                  <>
                    <TableHead>Location</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Year</TableHead>
                  </>
                )}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell>{row.headcount}</TableCell>
                    <TableCell>{row.fte}</TableCell>
                    <TableCell>{row.attrition}</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>
                          {row.location === 'north' ? 'North Dakota' : 
                          row.location === 'south' ? 'South Dakota' : 'Minnesota'}
                        </TableCell>
                        <TableCell>
                          {row.provider === 'healthcare' ? 'Health Care Advis' : 
                          row.provider === 'medical' ? 'Medical Solutions' : 'Nursing Professionals'}
                        </TableCell>
                        <TableCell>{row.year}</TableCell>
                      </>
                    )}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size={isMobile ? "sm" : "icon"}
                          onClick={() => handleEdit(row)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size={isMobile ? "sm" : "icon"}
                          onClick={() => handleDelete(row.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isMobile ? 5 : 8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-500 mb-2">No historical data found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your filters or upload new data
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
            {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <div className="flex items-center justify-center px-3 text-xs sm:text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] text-black">
          <DialogHeader>
            <DialogTitle>Edit Historical Data</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="month" className="text-right">
                  Month
                </Label>
                <Input
                  id="month"
                  value={editData.month}
                  disabled
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="headcount" className="text-right">
                  Headcount
                </Label>
                <Input
                  id="headcount"
                  type="number"
                  value={editData.headcount}
                  onChange={(e) =>
                    setEditData({...editData, headcount: parseInt(e.target.value) || 0})
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fte" className="text-right">
                  FTE
                </Label>
                <Input
                  id="fte"
                  type="number"
                  value={editData.fte}
                  onChange={(e) =>
                    setEditData({...editData, fte: parseInt(e.target.value) || 0})
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attrition" className="text-right">
                  Attrition Rate
                </Label>
                <Input
                  id="attrition"
                  value={editData.attrition}
                  onChange={(e) =>
                    setEditData({...editData, attrition: e.target.value})
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">Save Changes</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sonner Toaster */}
      <Toaster position={isMobile ? "top-center" : "bottom-right"} richColors />
    </div>
  );
}