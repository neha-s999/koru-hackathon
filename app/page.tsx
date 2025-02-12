"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { login } from "./actions/auth";

interface StudentInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const StudentEngagementPlatform = () => {
  const [formData, setFormData] = useState<StudentInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (response.success) {
      console.log("Redirecting to:", response.redirect);
      router.push(response.redirect || "/dashboard");
    } else {
      setError(response.error || "An error occurred");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please enter your details to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={loading}>
              Log In
            </Button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentEngagementPlatform;
