"use server";
import { createBooking } from "@/services/booking.service";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createBookingAction = async (formData: FormData) => {
  try {
    await createBooking({
      villaId: Number(formData.get("villaId")),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      checkIn: new Date(formData.get("checkIn") as string),
      checkOut: new Date(formData.get("checkOut") as string),
    });
    revalidatePath("/dashboard/booking");

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Terjadi kesalahan",
    };
  }
};

export const deleteBookingAction = async (id: number) => {
  await prisma.reservation.delete({
    where: { id },
  });

  revalidatePath("/dashboard/booking");
};