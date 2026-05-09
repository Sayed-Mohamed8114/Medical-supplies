import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";
import SelectItems from "../../components/ui/select";
const ItemsPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Items Management"
        description="Manage your items efficiently and effectively across all clinical departments"
      />
      <div
        className="w-full 
      bg-sky-50/10 backdrop-blur-md border border-white/10 p-6 rounded-md ring-1 ring-black/5
      flex items-center justify-between"
      >
        <SelectItems content={"filter by category"}/>
        <SelectItems content={"filter by suppliers"}/>
      </div>
    </DashboardLayout>
  );
};

export default ItemsPage;
