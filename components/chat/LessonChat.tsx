"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { sampleQuestions } from "@/mocks/data";
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function LessonChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (question: string) => {
    // Simulate API delay
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Sample responses based on keywords
    let response = "";
    if (question.toLowerCase().includes("solar system")) {
      response =
        "The solar system consists of the Sun, eight planets, dwarf planets, moons, asteroids, and comets. The planets in order from the Sun are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.";
    } else if (question.toLowerCase().includes("gravity")) {
      response =
        "Gravity is a force that attracts objects toward each other. The more mass an object has, the stronger its gravitational pull. Earth's gravity is what keeps us on the ground and makes objects fall when dropped.";
    } else if (question.toLowerCase().includes("force")) {
      response =
        "A force is a push or pull that acts upon an object. Forces can cause objects to start moving, stop moving, or change direction. Examples include gravity, friction, and magnetism.";
    } else {
      response =
        "That's an interesting question! Let me help you understand this topic better. Could you be more specific about what you'd like to know?";
    }

    setIsLoading(false);
    return response;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await generateResponse(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      role: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="flex flex-col h-[400px] bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">Lesson Assistant</h3>
        <p className="text-sm text-gray-500">Ask questions about the lesson</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Suggested questions:</p>
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="block text-sm text-purple-600 hover:text-purple-700"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
