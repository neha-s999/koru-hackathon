import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";
import { ChatInterface } from "@/components/chat/ChatInterface";
import student from "@/public/student.png";
import teacher from "@/public/teacher.png";
import { SettingsButton } from "@/components/dashboard/SettingsButton";

const mockStudentProfile = {
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

const mockTeacherProfile = {
  name: "Ms. Smith",
  avatar: teacher.src,
  code: "TCHR1",
  role: "teacher" as const,
  subject: "Science",
  students: 25,
};

const mockTeacherLessons = [
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

const levels = [
  { level: 1, multiplier: 2, isUnlocked: true },
  { level: 2, multiplier: 4, isUnlocked: true },
  { level: 3, multiplier: 6, isUnlocked: true },
  { level: 4, multiplier: 8, isUnlocked: false },
  { level: 5, multiplier: 10, isUnlocked: false },
  { level: 6, multiplier: 1, isUnlocked: false },
];

export default function DashboardPage() {
  // In a real app, you'd verify the session/token and get user role
  const userRole = cookies().get("user_role")?.value;

  // Redirect to login if no role is found
  if (!userRole) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <SettingsButton />
      </div>

      <div className="flex-1 container mx-auto p-4 pb-24">
        {userRole === "teacher" ? (
          <TeacherDashboard
            profile={mockTeacherProfile}
            lessons={mockTeacherLessons}
          />
        ) : (
          <StudentDashboard profile={mockStudentProfile} levels={levels} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <ChatInterface />
      </div>
    </div>
  );
}
