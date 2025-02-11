export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  code: string;
  stats: {
    dayStreak: number;
    topFinishes: number;
    gems: number;
  };
  achievements: {
    id: string;
    name: string;
    isUnlocked: boolean;
    remainingCount?: number;
  }[];
}

export interface LevelProgress {
  level: number;
  multiplier: number;
  isUnlocked: boolean;
}
