"use server";

import { cookies } from "next/headers";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  // Mock credentials for development
  const mockUsers = {
    student: {
      email: "student@example.com",
      password: "student123",
      role: "student" as const,
    },
    teacher: {
      email: "teacher@example.com",
      password: "teacher123",
      role: "teacher" as const,
    },
  };

  try {
    // Simple mock authentication
    const user = Object.values(mockUsers).find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Set the cookie with user role
    cookies().set("user_role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return {
      success: true,
      role: user.role,
      redirect: "/dashboard",
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }
}
