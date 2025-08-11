// src/lib/auth.ts
"use server";

interface User {
  id: string;
  email: string;
  password: string;
}

// This is a mock database - in a real app, use a proper database
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123",
  },
];

export async function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  
  if (!user || user.password !== password) {
    return { error: "Invalid credentials" };
  }
  
  return { success: true, user };
}