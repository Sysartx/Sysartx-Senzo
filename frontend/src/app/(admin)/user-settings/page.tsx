"use client";
import { useState, useRef, ChangeEvent } from "react";
import { Camera, Upload, Check, X, Edit, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UserSettingsPage() {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "",
    avatar: "/default-avatar.jpg",
  });
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (previewAvatar) {
      setUser({ ...user, avatar: previewAvatar });
      setPreviewAvatar("");
      toast.success("Avatar updated successfully!");
    }
  };

  const handleCancelAvatar = () => {
    setPreviewAvatar("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Avatar change cancelled");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you would save to your backend here
      setTimeout(() => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }, 500);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">User Settings</CardTitle>
        </CardHeader>
        
        <Separator className="mb-6" />
        
        <CardContent>
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group mb-4">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-gray-200">
                <AvatarImage 
                  src={previewAvatar || user.avatar} 
                  alt="User Avatar"
                  className="object-cover"
                />
                <AvatarFallback className="text-xl font-medium">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors shadow-md"
              >
                <Camera className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {previewAvatar && (
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={handleSaveAvatar}
                  className="gap-1"
                >
                  <Check className="h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelAvatar}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={user.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={!isEditing}
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {!isEditing && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Password is hidden for security. Edit to change.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      toast.info("Changes discarded");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}