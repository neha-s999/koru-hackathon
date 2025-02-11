"use client";

import { useState } from "react";
import { GameState, AgentResponse } from "@/app/types/game";

export function GameFlow() {
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 0,
    isComplete: false,
    agentResponses: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    {
      title: "Create AR Engagement",
      description: "Design personalized AR learning experience",
      action: callFirstAgent,
    },
    {
      title: "Implementation Breakdown",
      description: "Break down the AR implementation steps",
      action: callSecondAgent,
    },
    {
      title: "Generate Code",
      description: "Generate implementation code",
      action: callThirdAgent,
    },
    {
      title: "AR Implementation",
      description: "Implement AR experience",
      action: implementAR,
    },
    {
      title: "Vector Store Processing",
      description: "Process lesson plan into vector store",
      action: processVectorStore,
    },
    {
      title: "Q&A Session",
      description: "Start interactive Q&A session",
      action: startQASession,
    },
  ];

  async function callFirstAgent() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GAME",
          step: "AR_ENGAGEMENT",
          context: "Create an AR learning experience",
        }),
      });

      if (!response.ok) throw new Error("Failed to get AR engagement plan");

      const data = await response.json();
      setGameState((prev) => ({
        ...prev,
        agentResponses: [
          ...prev.agentResponses,
          {
            id: Date.now().toString(),
            type: "AR_ENGAGEMENT",
            content: data.content,
            status: "complete",
          },
        ],
        currentStep: prev.currentStep + 1,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function callSecondAgent() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GAME",
          step: "IMPLEMENTATION_PLAN",
          context: "Break down the AR implementation",
        }),
      });

      if (!response.ok) throw new Error("Failed to get implementation plan");

      const data = await response.json();
      setGameState((prev) => ({
        ...prev,
        agentResponses: [
          ...prev.agentResponses,
          {
            id: Date.now().toString(),
            type: "IMPLEMENTATION_PLAN",
            content: data.content,
            status: "complete",
          },
        ],
        currentStep: prev.currentStep + 1,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function callThirdAgent() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GAME",
          step: "CODE_GENERATION",
          context: "Generate AR implementation code",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate code");

      const data = await response.json();
      setGameState((prev) => ({
        ...prev,
        agentResponses: [
          ...prev.agentResponses,
          {
            id: Date.now().toString(),
            type: "CODE_GENERATION",
            content: data.content,
            status: "complete",
          },
        ],
        currentStep: prev.currentStep + 1,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function implementAR() {
    setLoading(true);
    setError(null);
    try {
      // Simulate AR implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGameState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    } catch (error) {
      setError("Failed to implement AR experience");
    } finally {
      setLoading(false);
    }
  }

  async function processVectorStore() {
    setLoading(true);
    setError(null);
    try {
      // Simulate vector store processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGameState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    } catch (error) {
      setError("Failed to process vector store");
    } finally {
      setLoading(false);
    }
  }

  async function startQASession() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GAME",
          step: "QA",
          context: "Start Q&A session",
        }),
      });

      if (!response.ok) throw new Error("Failed to start Q&A session");

      const data = await response.json();
      setGameState((prev) => ({
        ...prev,
        agentResponses: [
          ...prev.agentResponses,
          {
            id: Date.now().toString(),
            type: "QA",
            content: data.content,
            status: "complete",
          },
        ],
        isComplete: true,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = steps[gameState.currentStep];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">AR Learning Game</h1>

      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index <= gameState.currentStep ? "bg-purple-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Current step */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">{currentStep.title}</h2>
        <p className="text-gray-600 mb-4">{currentStep.description}</p>
        <button
          onClick={currentStep.action}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Start ${currentStep.title}`}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Response display */}
      <div className="space-y-4">
        {gameState.agentResponses.map((response) => (
          <div key={response.id} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">{response.type}</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {response.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
