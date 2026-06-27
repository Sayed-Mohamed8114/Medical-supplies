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
        <BtnAddNew content="Add New Supplier" link="/supplier/new" />
      </div>

      <section className="relative pb-25">
        <TableSection
          headers={[
            { id: "name", name: "Name" },
            { id: "email", name: "Email" },
            { id: "items", name: "Items" },
            { id: "status", name: "Status" },
            { id: "actions", name: "Actions" },
          ]}
          bodyData={[
            {
              id: "1",
              name: "BioMed Solutions Inc.",
              email: "orders@biomed.com",
              items: "48 items",
              status: "Active",
            },
            {
              id: "2",
              name: "BioMed Solutions Inc.",
              email: "orders@biomed.com",
              items: "48 items",
              status: "Active",
            },
            {
              id: "3",
              name: "BioMed Solutions Inc.",
              email: "orders@biomed.com",
              items: "48 items",
              status: "Active",
            },
            {
              id: "4",
              name: "BioMed Solutions Inc.",
              email: "orders@biomed.com",
              items: "48 items",
              status: "Active",
            },
            {
              id: "5",
              name: "BioMed Solutions Inc.",
              email: "orders@biomed.com",
              items: "48 items",
              status: "Active",
            },
          ]}
        />
        <BtnAddNewSm link="/supplier/new" />
      </section>
    </DashboardLayout>
  );
};

export default SuppliersPage;
