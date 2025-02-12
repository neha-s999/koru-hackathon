"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { StudentProfile } from "@/app/types/dashboard";
import { AchievementsList } from "./AchievementsList";
import { LessonViewer } from "./LessonViewer";
import { mockLessons } from "@/mocks/data";

interface ProfileCardProps {
  profile: StudentProfile;
  levels: Array<{
    level: number;
    multiplier: number;
    isUnlocked: boolean;
  }>;
}

export function StudentDashboard({ profile, levels }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"lessons" | "achievements">(
    "lessons"
  );

  const [showCompatibilityMessage, setShowCompatibilityMessage] =
    useState(false);
  const [selectedLesson, setSelectedLesson] = useState<
    (typeof mockLessons)[0] | null
  >(null);

  const handlePlayGame = (lessonId: string) => {
    // Check if running on iOS Safari or Android Chrome
    const isCompatibleBrowser = () => {
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      const isAndroid = /Android/.test(ua);
      const isChrome = /Chrome/.test(ua);
      const isSafari = /Safari/.test(ua);

      return (isIOS && isSafari) || (isAndroid && isChrome);
    };

    if (isCompatibleBrowser()) {
      window.open("https://pelumiabiola.8thwall.app/force-lesson/", "_blank");
    } else {
      setShowCompatibilityMessage(true);
    }
  };

  return (
    <div className="space-y-4">
      {!selectedLesson ? (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <code className="text-sm text-muted-foreground">
                {profile.code}
              </code>
              <div className="mt-2">
                <span className="text-sm font-medium">
                  Level {profile.level}
                </span>
                <div className="h-2 mt-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  x{levels[profile.level - 1]?.multiplier}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex justify-between mb-6">
              <StatsItem
                icon="⚡"
                value={profile.stats.dayStreak}
                label="Day Streak"
              />
              <StatsItem
                icon="🏆"
                value={profile.stats.topFinishes}
                label="Top 3 Finishes"
              />
              <StatsItem icon="💎" value={profile.stats.gems} label="Gems" />
            </div>

            <div className="border-b">
              <div className="flex">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "lessons"
                      ? "border-b-2 border-purple-600"
                      : ""
                  }`}
                  onClick={() => setActiveTab("lessons")}
                >
                  Lessons
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "achievements"
                      ? "border-b-2 border-purple-600"
                      : ""
                  }`}
                  onClick={() => setActiveTab("achievements")}
                >
                  Achievements
                </button>
              </div>
            </div>

            <div className="mt-4">
              {activeTab === "lessons" && (
                <div className="space-y-3">
                  {mockLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                    >
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <h3 className="font-medium">
                          Lesson {lesson.id}: {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {lesson.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlayGame(lesson.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-purple-600 text-white hover:bg-purple-700"
                      >
                        <PlayCircle size={14} />
                        Play game
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "achievements" && (
                <AchievementsList achievements={profile.achievements} />
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Lesson Viewer */}
          <div className="w-full">
            <LessonViewer
              lesson={selectedLesson}
              onClose={() => setSelectedLesson(null)}
              isStudent={true}
            />
          </div>

          {/* Chat Interface */}
        </div>
      )}

      {/* Compatibility Message Modal */}
      {showCompatibilityMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">
              Browser Compatibility
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              For the best AR experience, please use:
              <ul className="list-disc ml-4 mt-2">
                <li>Safari on iOS devices</li>
                <li>Chrome on Android devices</li>
              </ul>
            </p>
            <button
              onClick={() => setShowCompatibilityMessage(false)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsItem({
  icon,
  value,
  label,
}: {
  icon: string;
  value: number;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">
        {icon} {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
