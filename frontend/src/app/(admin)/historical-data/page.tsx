"use client";
import { useState } from "react";
import { Download, Upload, X } from "lucide-react";
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
import { Toaster } from "@/components/ui/sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export default function HistoricalDataPage() {
  const [location, setLocation] = useState("");
  const [provider, setProvider] = useState("");
  const [year, setYear] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample data
  const [tableData, setTableData] = useState([
    { id: 1, month: "January", headcount: 320, fte: 280, attrition: "5%" },
    { id: 2, month: "February", headcount: 325, fte: 285, attrition: "4%" },
    { id: 3, month: "March", headcount: 330, fte: 290, attrition: "6%" },
    { id: 4, month: "April", headcount: 328, fte: 292, attrition: "5%" },
    { id: 5, month: "May", headcount: 333, fte: 298, attrition: "4%" },
    { id: 6, month: "June", headcount: 335, fte: 300, attrition: "3%" },
    { id: 7, month: "July", headcount: 340, fte: 305, attrition: "4%" },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      // Show loading state
      const toastId = toast.loading("Uploading file...");
      
      // Simulate upload
      setTimeout(() => {
        toast.success(`${selectedFile.name} uploaded successfully`, {
          id: toastId,
        });
        setSelectedFile(null);
        setIsDialogOpen(false);
      }, 1000);
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const handleDownload = () => {
    try {
      toast.promise(
        new Promise((resolve) => {
          const templateData = [
            ["Month", "Headcount", "FTE", "Attrition Rate"],
            ...tableData.map(item => [item.month, item.headcount, item.fte, item.attrition])
          ];
          
          const csvContent = templateData.map(row => row.join(",")).join("\n");
          const blob = new Blob([csvContent], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "historical_data_template.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setTimeout(resolve, 1000);
        }),
        {
          loading: "Preparing download...",
          success: "Download successfully",
          error: "Failed to generate template",
        }
      );
    } catch (error) {
      toast.error("Failed to generate template");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 relative">
      <h1 className="text-2xl font-bold mb-6">Historical Data</h1>

      {/* Filters and Actions Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Location Dropdown */}
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Locations</option>
            <option value="north">North Dakota</option>
            <option value="south">South Dakota</option>
            <option value="minnesota">Minnesota</option>
          </select>
        </div>

        {/* Provider Dropdown */}
        <div className="flex-1">
          <label htmlFor="provider" className="block text-sm font-medium mb-1">
            Provider
          </label>
          <select
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Providers</option>
            <option value="healthcare">Health Care Advis</option>
            <option value="medical">Medical Solutions</option>
            <option value="nursing">Nursing Professionals</option>
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="flex-1">
          <label htmlFor="year" className="block text-sm font-medium mb-1">
            Year
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white"
                variant="outline"
              >
                <Upload className="h-4 w-4" />
                Upload Historical Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-black">
              <DialogHeader>
                <DialogTitle>Upload Historical Data</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Select Excel File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="submit" 
                    disabled={!selectedFile}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Upload
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:text-white"
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Download Template
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-200 text-lg">
              <TableRow>
                <TableHead className="w-[100px]">Month</TableHead>
                <TableHead>Headcount</TableHead>
                <TableHead>FTE</TableHead>
                <TableHead>Attrition Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell>{row.headcount}</TableCell>
                  <TableCell>{row.fte}</TableCell>
                  <TableCell>{row.attrition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Empty State */}
      {tableData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No historical data found for the selected filters</p>
        </div>
      )}

      {/* Sonner Toaster */}
      <Toaster position="bottom-right" />
    </div>
  );
}