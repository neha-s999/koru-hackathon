import { NextResponse } from "next/server";

interface LoginRequest {
  email: string;
  password: string;
}

// Static credentials
const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "password123";

export async function POST(req: Request) {
  try {
    const body: LoginRequest = await req.json();
    console.log("Login request:", body);

    // Check against static credentials
    if (body.email !== VALID_EMAIL || body.password !== VALID_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const mockResponse = {
      success: true,
      user: {
        id: "123",
        firstName: "Test",
        lastName: "User",
        email: VALID_EMAIL,
        role: "student",
      },
      dashboard: {
        dashboardData: {
          welcomeMessage: "Welcome, Test User!",
          completedLessons: 5,
          totalProgress: "60%",
        },
        lessonPlans: [
          { id: 1, title: "Math 101", content: "Introduction to Algebra" },
          { id: 2, title: "History 101", content: "World History Overview" },
          { id: 3, title: "Science 101", content: "Basic Physics" },
        ],
      },
      token: "mock-jwt-token",
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(mockResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
