// src/components/auth/ForgotPasswordForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your backend here
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // For demo purposes, we'll just show a success message
      setMessage("If an account with that email exists, we've sent a password reset link.");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Reset Password</h1>
        <p className="text-gray-600">Enter your email to receive a reset link</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`text-sm text-center p-2 rounded-md ${
            message.includes("error") 
              ? "text-red-600 bg-red-100" 
              : "text-green-600 bg-green-100"
          }`}>
            {message}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-br from-gray-900 to-black text-white hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
        
        <div className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link 
            href="/login" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}