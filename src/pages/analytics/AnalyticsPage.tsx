import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Analytics Overview"
        description="Real-time analytics for your medical supplies inventory"
      />
    </DashboardLayout>
  );
};

export default AnalyticsPage;
