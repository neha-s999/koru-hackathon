import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";
import { SettingsButton } from "@/components/dashboard/SettingsButton";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  mockStudentProfile,
  mockTeacherProfile,
  mockTeacherLessons,
  levels,
} from "@/mocks/data";

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
      {userRole === "teacher" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <ChatInterface />
        </div>
      )}
    </div>
  );
}
