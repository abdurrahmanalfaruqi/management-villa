import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bookingSchema = z.object({
  villaId: z.number().int().positive(),
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
}).refine(
  (data) => data.checkIn < data.checkOut,
  {
    message: "Check-out harus setelah check-in",
    path: ["checkOut"],
  }
);

type BookingInput = z.infer<typeof bookingSchema>;

export const createBooking = async (input: BookingInput) => {
  const { villaId, name, email, checkIn, checkOut } =
    bookingSchema.parse(input);

  const overlapping = await prisma.reservation.findFirst({
    where: {
      villaId,
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } },
      ],
    },
  });

  if (overlapping) {
    throw new Error("Tanggal sudah dibooking");
  }

  return prisma.reservation.create({
    data: {
      villaId,
      name,
      email,
      checkIn,
      checkOut,
    },
  });
};