// Shared types
interface BaseProfile {
  name: string;
  avatar: string;
  code: string;
}

// Student specific types
export interface StudentProfile extends BaseProfile {
  role: "student";
  level: number;
  stats: {
    dayStreak: number;
    topFinishes: number;
    gems: number;
  };
  achievements: Achievement[];
}

// Teacher specific types
export interface TeacherProfile extends BaseProfile {
  role: "teacher";
  subject: string;
  students: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;

  subject: string;
}

export interface TeacherLesson extends Lesson {
  studentResponses?: number;
  lastUpdated: Date;
}

export type UserProfile = StudentProfile | TeacherProfile;

export interface LevelProgress {
  level: number;
  multiplier: number;
  isUnlocked: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  isUnlocked: boolean;
  remainingCount?: number;
}
