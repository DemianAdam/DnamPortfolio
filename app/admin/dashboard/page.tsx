import DashboardHeader from "./_components/DashboardHeader";
import QuickActions from "./_components/QuickActions";
import RecentVideos from "./_components/RecentVideos";
import StatsGrid from "./_components/StatsGrid";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12">
      <DashboardHeader />

      <StatsGrid />

      <QuickActions />

      <RecentVideos />
    </div>
  );
}