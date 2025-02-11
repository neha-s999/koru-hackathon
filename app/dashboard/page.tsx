import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { LevelProgress, UserProfile } from "@/app/types/dashboard";
import { ChatInterface } from "@/components/chat/ChatInterface";

const mockProfile: UserProfile = {
  name: "Marilyn",
  avatar: "/avatar.png",
  level: 3,
  code: "YKNKH",
  stats: {
    dayStreak: 3,
    topFinishes: 0,
    gems: 6,
  },
  achievements: [
    { id: "1", name: "Explainee", isUnlocked: false, remainingCount: 5 },
    { id: "2", name: "Tap, Tap", isUnlocked: false },
    { id: "3", name: "Third Day", isUnlocked: false },
  ],
};

const levels: LevelProgress[] = [
  { level: 1, multiplier: 2, isUnlocked: true },
  { level: 2, multiplier: 4, isUnlocked: true },
  { level: 3, multiplier: 6, isUnlocked: true },
  { level: 4, multiplier: 8, isUnlocked: false },
  { level: 5, multiplier: 10, isUnlocked: false },
  { level: 6, multiplier: 1, isUnlocked: false },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content area */}
      <div className="flex-1 container mx-auto p-4 pb-24">
        {" "}
        {/* Added padding bottom for chat */}
        <ProfileCard profile={mockProfile} levels={levels} />
      </div>

      {/* Fixed chat interface at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <ChatInterface />
      </div>
    </div>
  );
}
