import { getFoodList } from "@/actions/dashboardActions";
import { columns } from "@/components/Columns";
import { DataTable } from "@/components/Data-table";
import { Suspense } from "react";

export default async function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Suspense fallback={<DataTable columns={columns} data={[]} loading />}>
        <FoodTable />
      </Suspense>
    </div>
  );
}

async function FoodTable() {
  const data = await getFoodList();
  return <DataTable columns={columns} data={data || []} />;
}
