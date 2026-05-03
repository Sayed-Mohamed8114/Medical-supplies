import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";

const StockOutPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Stock Out"
        description="Track and manage your stock outs"
      />
    </DashboardLayout>
  );
};

export default StockOutPage;
