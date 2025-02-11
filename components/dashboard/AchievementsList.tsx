interface Achievement {
  id: string;
  name: string;
  isUnlocked: boolean;
  remainingCount?: number;
}

interface AchievementsListProps {
  achievements: Achievement[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg"
        >
          <div
            className={`text-2xl ${
              achievement.isUnlocked ? "opacity-100" : "opacity-50"
            }`}
          >
            🏆
          </div>
          <div>
            <div className="font-medium">{achievement.name}</div>
            {achievement.remainingCount && (
              <div className="text-sm text-gray-500">
                {achievement.remainingCount} remaining
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
