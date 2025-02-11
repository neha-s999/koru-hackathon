export interface GameState {
  currentStep: number;
  isComplete: boolean;
  agentResponses: AgentResponse[];
}

export interface AgentResponse {
  id: string;
  type: "AR_ENGAGEMENT" | "IMPLEMENTATION_PLAN" | "CODE_GENERATION" | "QA";
  content: string;
  status: "pending" | "complete" | "error";
}

export interface LessonPlan {
  id: string;
  title: string;
  content: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  answer?: string;
}
