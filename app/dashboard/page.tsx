import { getVillas } from "@/services/villa.service";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const villas = await getVillas();

  const totalBooking = await prisma.reservation.count();

  const revenueData = await prisma.reservation.findMany({
    include: {
      villa: true,
    },
  });

  const revenue = revenueData.reduce((acc, curr) => {
    return acc + (curr.villa?.price || 0);
  }, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TOTAL VILLA */}
        <div className="p-4 bg-white rounded-2xl shadow">
          <p className="text-gray-500">Total Villa</p>
          <h2 className="text-2xl font-bold">{villas.length}</h2>
        </div>

        {/* TOTAL BOOKING */}
        <div className="p-4 bg-white rounded-2xl shadow">
          <p className="text-gray-500">Total Booking</p>
          <h2 className="text-2xl font-bold">{totalBooking}</h2>
        </div>

        {/* REVENUE */}
        <div className="p-4 bg-white rounded-2xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold">
            Rp {revenue.toLocaleString()}
          </h2>
        </div>

      </div>
    </div>
  );
}