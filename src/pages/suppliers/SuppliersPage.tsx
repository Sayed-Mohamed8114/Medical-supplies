import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";
import TableSection from "@/components/ui/Table";
import BtnAddNew from "@/components/ui/BtnAddNew";
import BtnAddNewSm from "@/components/ui/BtnAddNewSm";

const SuppliersPage = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center w-full">
        <MainHeading
          title="Suppliers Management"
          description="Manage your suppliers efficiently and effectively"
        />
        <BtnAddNew />
      </div>

      <section className="relative pb-[100px]">
        <TableSection />
        <BtnAddNewSm />
      </section>
    </DashboardLayout>
  );
};

export default SuppliersPage;
