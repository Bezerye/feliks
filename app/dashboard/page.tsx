import { getFoodList } from "@/actions/dashboardActions";
import { columns } from "@/components/Columns";
import { DataTable } from "@/components/Data-table";

export default async function Dashboard() {
  const data = await getFoodList();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
