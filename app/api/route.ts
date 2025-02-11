import { NextResponse } from "next/server";
import OpenAI from "openai";

interface StudentInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface StudentDashboardOutput {
  dashboardData: object;
  lessonPlans: object[];
}

interface LoginRequest {
  email: string;
  password: string;
}

// Static credentials
const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "password123";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// async function generateChatResponse(userMessage: string): Promise<string> {
//   console.log("Generating chat response for user message:", userMessage);

//   const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
//     { role: "user" as const, content: userMessage },
//   ];

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: messages,
//     });

//     console.log("OpenAI API response:", JSON.stringify(response));

//     return (
//       response.choices[0].message.content ||
//       "I'm sorry, I couldn't generate a response."
//     );
//   } catch (error) {
//     console.error("Error in generateChatResponse:", error);
//     throw new Error("OpenAI API call failed");
//   }
// }

export async function processAgentRequest(req: Request) {
  // Renamed from POST
  try {
    const { step, context } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: getSystemPrompt(step),
        },
        {
          role: "user",
          content: context,
        },
      ],
    });

    return NextResponse.json({
      content: response.choices[0].message.content,
      step,
    });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json(
      { error: "Agent processing failed" },
      { status: 500 }
    );
  }
}

type StepType =
  | "AR_ENGAGEMENT"
  | "IMPLEMENTATION_PLAN"
  | "CODE_GENERATION"
  | "QA";

function getSystemPrompt(step: StepType): string {
  const prompts: Record<StepType, string> = {
    AR_ENGAGEMENT: "Create a personalized AR engagement plan...",
    IMPLEMENTATION_PLAN: "Break down the AR implementation into steps...",
    CODE_GENERATION: "Generate the implementation code...",
    QA: "Answer the following question based on the lesson...",
  };

  return prompts[step] || "Process the given input...";
}

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
