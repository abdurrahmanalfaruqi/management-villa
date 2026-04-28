import { getVillas } from "@/services/villa.service";
import VillaTable from "./villa-table";
import CreateVillaForm from "./create-villa-form";

export default async function VillaPage() {
  const villas = await getVillas();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Villa Management</h1>

      <CreateVillaForm />
      <VillaTable villas={villas} />
    </div>
  );
}