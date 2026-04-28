import { getVillas } from "@/services/villa.service";
import { prisma } from "@/lib/prisma";
import BookingForm from "./booking-form";
import BookingTable from "./booking-table";

export default async function BookingPage() {
  const villas = await getVillas();

  const bookings = await prisma.reservation.findMany({
    include: {
      villa: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Booking Management</h1>

      <BookingForm villas={villas} />
      <BookingTable bookings={bookings} />
    </div>
  );
}