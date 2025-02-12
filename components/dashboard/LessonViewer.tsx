"use client";

import { useState } from "react";
import { File, PlayCircle, X, Menu } from "lucide-react";
import { TeacherLesson } from "@/app/types/dashboard";

interface LessonViewerProps {
  lesson: TeacherLesson;
  onClose: () => void;
}

interface TopicSection {
  id: string;
  title: string;
  content: string;
  pageNumber: number;
}

// Mock topics for demonstration
const mockTopics: TopicSection[] = [
  {
    id: "1",
    title: "Introduction to Solar System",
    content: "Overview of planets and celestial bodies",
    pageNumber: 1,
  },
  {
    id: "2",
    title: "The Sun",
    content: "Central star of our solar system",
    pageNumber: 2,
  },
  {
    id: "3",
    title: "Inner Planets",
    content: "Mercury, Venus, Earth, and Mars",
    pageNumber: 3,
  },
];

export function LessonViewer({ lesson, onClose }: LessonViewerProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicSection | null>(null);
  const [showARGenerator, setShowARGenerator] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden h-14 border-b flex items-center justify-between px-4">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu size={24} />
        </button>
        <span className="font-medium">{lesson.title}</span>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Left Sidebar - Topics */}
      <div
        className={`
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        transform transition-transform
        fixed md:static
        w-full md:w-64 
        h-[calc(100%-3.5rem)] md:h-full
        bg-gray-50 
        border-r 
        z-50 
        md:translate-x-0
      `}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Topics</h2>
            <button onClick={() => setShowSidebar(false)} className="md:hidden">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-2">
            {mockTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setShowSidebar(false);
                }}
                className={`w-full text-left p-2 rounded ${
                  selectedTopic?.id === topic.id
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{topic.title}</div>
                <div className="text-sm text-gray-500">
                  Page {topic.pageNumber}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <div className="hidden md:flex h-14 border-b items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <File size={20} />
            <span className="font-medium">{lesson.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {selectedTopic && (
              <button
                onClick={() => setShowARGenerator(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                <PlayCircle size={16} />
                <span className="hidden sm:inline">Generate AR for</span>{" "}
                {selectedTopic.title}
              </button>
            )}
            <button onClick={onClose} className="p-2">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          <div className="bg-white rounded-lg h-full p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {selectedTopic?.title || lesson.title}
            </h2>
            <p className="text-sm md:text-base">
              {selectedTopic?.content || "Select a topic from the sidebar"}
            </p>
          </div>
        </div>

        {/* Mobile Generate AR Button */}
        {selectedTopic && (
          <div className="md:hidden fixed bottom-4 right-4">
            <button
              onClick={() => setShowARGenerator(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 shadow-lg"
            >
              <PlayCircle size={20} />
              Generate AR
            </button>
          </div>
        )}
      </div>

      {/* AR Generator Dialog */}
      {showARGenerator && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Generate AR for {selectedTopic.title}
            </h3>
            <textarea
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Describe specific AR requirements for this topic..."
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowARGenerator(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
