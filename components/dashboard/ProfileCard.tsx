"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { UserProfile, LevelProgress } from "@/app/types/dashboard";
import { LevelGrid } from "./LevelGrid";
import { AchievementsList } from "./AchievementsList";
import { GameFlow } from "@/components/game/GameFlow";

interface ProfileCardProps {
  profile: UserProfile;
  levels: LevelProgress[];
}

export function ProfileCard({ profile, levels }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "achievements" | "game">(
    "stats"
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
                activeTab === "stats" ? "border-b-2 border-purple-600" : ""
              }`}
              onClick={() => setActiveTab("stats")}
            >
              My Stats
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
            <button
              className={`px-4 py-2 ${
                activeTab === "game" ? "border-b-2 border-purple-600" : ""
              }`}
              onClick={() => setActiveTab("game")}
            >
              Game
            </button>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === "stats" && (
            <LevelGrid levels={levels} currentLevel={profile.level} />
          )}
          {activeTab === "achievements" && (
            <AchievementsList achievements={profile.achievements} />
          )}
          {activeTab === "game" && <GameFlow />}
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
