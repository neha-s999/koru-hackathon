"use client";

import { useState } from "react";
import { File, PlayCircle, X, Menu, Loader2, CheckCircle } from "lucide-react";
import { TeacherLesson } from "@/app/types/dashboard";
import { LessonChat } from "../chat/LessonChat";
import { TopicSection } from "@/app/types/lesson";
import { mockTopics } from "@/mocks/data";
interface LessonViewerProps {
  lesson: TeacherLesson;
  onClose: () => void;
  isStudent?: boolean;
}

export function LessonViewer({
  lesson,
  onClose,
  isStudent = false,
}: LessonViewerProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicSection | null>(null);
  const [showARGenerator, setShowARGenerator] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsGenerating(false);
    setShowARGenerator(false);
    setShowSuccess(true);

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

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
            {/* Only show Generate AR button for teachers */}
            {!isStudent && selectedTopic && (
              <button
                onClick={() => setShowARGenerator(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                <PlayCircle size={16} />
                <span>Generate AR for</span> {selectedTopic.title}
              </button>
            )}
            <button onClick={onClose}>
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
        {!isStudent ? (
          selectedTopic && (
            <div className="md:hidden fixed bottom-4 right-4">
              <button
                onClick={() => setShowARGenerator(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 shadow-lg"
              >
                <PlayCircle size={20} />
                Generate Game
              </button>
            </div>
          )
        ) : (
          <div className="w-full max-w-md mx-auto">
            <LessonChat />
          </div>
        )}
      </div>

      {/* AR Generator Dialog */}
      {!isStudent && showARGenerator && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Generate Game for {selectedTopic.title}
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
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              AR Game Generated Successfully!
            </h3>
            <p className="text-sm text-gray-600">
              Your AR game for "{selectedTopic?.title}" is ready to be played.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
