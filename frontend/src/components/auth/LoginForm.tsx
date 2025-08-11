"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Hardcoded credentials
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Successful login - redirect to dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-2 text-gray-800">Login to Forecast</h1>
    <p className="text-gray-600">Enter your credentials to continue</p>
  </div>
  
  <form onSubmit={handleSubmit} className="space-y-6">
    {error && (
      <div className="text-red-600 text-sm text-center p-2 bg-red-100 rounded-md">
        {error}
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
      />
    </div>
    
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="password" className="text-gray-700">Password</Label>
      </div>
        
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
      <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 flex justify-end">
        Forgot password?
      </Link>
    </div>
    
    <Button type="submit" className="w-full bg-gradient-to-br from-gray-900 to-black text-white hover:bg-blue-700 hover:cursor-pointer">
      Login
    </Button>
  </form>
</div>
  );
}