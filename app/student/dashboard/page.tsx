import StatsGrid from "./_components/StatsGrid";
import QuickActions from "./_components/QuickActions";
import RecentSessions from "./_components/RecentSessions";
import FreeClasses from "./_components/FreeClasses";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-12">

      <StatsGrid />

      <QuickActions />

      <RecentSessions />

      <FreeClasses />

    </div>
  );
}