// src/app/reset-password/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would verify the token and update the password
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, password }),
      // });
      
      // For demo purposes
      setMessage("Password updated successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setMessage("Failed to reset password. The link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center z-10">
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 md:w-10 md:h-10 relative">
            <Image
              src="/forecast-analytics.png"
              alt="Forecast Logo"
              width={35}
              height={35}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold">Forecast</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Set New Password</h1>
            <p className="text-gray-600">Create a new password for your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`text-sm text-center p-2 rounded-md ${
                message.includes("success") 
                  ? "text-green-600 bg-green-100" 
                  : "text-red-600 bg-red-100"
              }`}>
                {message}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
                minLength={8}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-br from-gray-900 to-black text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
            <div className="text-center pt-2">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </div>

          </form>
        </div>
        
      </div>
    </div>
  );
}