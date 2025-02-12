"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { StudentProfile } from "@/app/types/dashboard";
import { AchievementsList } from "./AchievementsList";

interface ProfileCardProps {
  profile: StudentProfile;
  levels: Array<{
    level: number;
    multiplier: number;
    isUnlocked: boolean;
  }>;
}

const mockLessons = [
  {
    id: "1",
    title: "Solar Systems",
    description: "Learn about our solar system",
  },
  {
    id: "2",
    title: "Basic Physics",
    description: "Introduction to physics concepts",
  },
  {
    id: "3",
    title: "Chemistry 101",
    description: "Fundamentals of chemistry",
  },
];

export function StudentDashboard({ profile, levels }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"lessons" | "achievements">(
    "lessons"
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.avatar} alt={profile.name} />
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <code className="text-sm text-muted-foreground">{profile.code}</code>
          <div className="mt-2">
            <span className="text-sm font-medium">Level {profile.level}</span>
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
                activeTab === "lessons" ? "border-b-2 border-purple-600" : ""
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
            {/* <button
              className={`px-4 py-2 ${
                activeTab === "game" ? "border-b-2 border-purple-600" : ""
              }`}
              onClick={() => setActiveTab("game")}
            >
              Game
            </button> */}
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
                  <div>
                    <h3 className="font-medium">
                      Lesson {lesson.id}: {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lesson.description}
                    </p>
                  </div>
                  <button
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full ${"bg-purple-400 text-white"}`}
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
          {/* {activeTab === "game" && <GameFlow />} */}
        </div>
      </CardContent>
    </Card>
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
