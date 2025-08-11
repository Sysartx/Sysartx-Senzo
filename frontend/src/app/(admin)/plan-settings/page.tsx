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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
        {(["information", "locations", "providers", "types", "categories"] as Category[]).map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className="py-6 flex flex-col items-center"
          >
            <span className="text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </Button>
        ))}
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Active" || item.status === "Approved"
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
                          className="text-blue-600 hover:text-blue-800"
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
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Add New {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <Input
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder={`Enter ${activeCategory} name`}
                />
              </div>
              {["information", "types", "categories"].includes(activeCategory) && (
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Enter description"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && itemToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Edit {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <Input
                  value={editItem.name}
                  onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                  placeholder={`Enter ${activeCategory} name`}
                />
              </div>
              {["information", "types", "categories"].includes(activeCategory) && (
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={editItem.description}
                    onChange={(e) => setEditItem({...editItem, description: e.target.value})}
                    placeholder="Enter description"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateItem}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <AlertDialogCancel className="text-destructive text-black">Cancel</AlertDialogCancel>
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
