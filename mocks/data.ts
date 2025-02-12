import { TopicSection } from "@/app/types/lesson";
import student from "@/public/student.png";
import teacher from "@/public/teacher.png";
export const mockStudentProfile = {
  name: "Marilyn",
  avatar: student.src,
  level: 3,
  code: "YKNKH",
  role: "student" as const,
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

export const mockTeacherProfile = {
  name: "Ms. Smith",
  avatar: teacher.src,
  code: "TCHR1",
  role: "teacher" as const,
  subject: "Science",
  students: 25,
};

export const mockTeacherLessons = [
  {
    id: "1",
    title: "Solar Systems",
    description: "Learn about our solar system",
    subject: "Science",
    studentResponses: 15,
    lastUpdated: new Date(),
  },
  {
    id: "2",
    title: "Basic Physics",
    description: "Introduction to physics",
    subject: "Science",
    studentResponses: 8,
    lastUpdated: new Date(),
  },
];

export const levels = [
  { level: 1, multiplier: 2, isUnlocked: true },
  { level: 2, multiplier: 4, isUnlocked: true },
  { level: 3, multiplier: 6, isUnlocked: true },
  { level: 4, multiplier: 8, isUnlocked: false },
  { level: 5, multiplier: 10, isUnlocked: false },
  { level: 6, multiplier: 1, isUnlocked: false },
];

export const sampleQuestions = [
  "What are the main components of the solar system?",
  "How does gravity work?",
  "Explain the concept of force in simple terms.",
];

// Mock topics for demonstration
export const mockTopics: TopicSection[] = [
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

export const mockLessons = [
  {
    id: "1",
    title: "Solar Systems",
    description: "Learn about our solar system",
    subject: "Science",
    lastUpdated: new Date(),
    studentResponses: 0,
    isLocked: false,
  },
  {
    id: "2",
    title: "Basic Physics",
    description: "Introduction to physics concepts",
    subject: "Science",
    lastUpdated: new Date(),
    studentResponses: 0,
    isLocked: false,
  },
  {
    id: "3",
    title: "Chemistry 101",
    description: "Fundamentals of chemistry",
    subject: "Science",
    lastUpdated: new Date(),
    studentResponses: 0,
    isLocked: true,
  },
];
