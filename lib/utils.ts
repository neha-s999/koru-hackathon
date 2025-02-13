import { mockARPrompts, mockQuestionsAndResponses } from "@/mocks/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ARPromptTopics = keyof typeof mockARPrompts;

// Helper function to get prompt based on topic
export const getARPrompt = (topicTitle: string): string => {
  const topic = Object.keys(mockARPrompts).find((key) =>
    topicTitle.toLowerCase().includes(key.toLowerCase())
  ) as ARPromptTopics | undefined;

  return topic ? mockARPrompts[topic] : mockARPrompts.default + topicTitle;
};

// Helper function to get questions and responses based on topic
export const getQuestionsAndResponses = (topicTitle: string) => {
  const topic = Object.keys(mockQuestionsAndResponses).find((key) =>
    topicTitle.toLowerCase().includes(key.toLowerCase())
  );
  return topic
    ? mockQuestionsAndResponses[topic]
    : {
        suggestedQuestions: [],
        sampleResponses: { default: "Please ask a question about the topic." },
      };
};
