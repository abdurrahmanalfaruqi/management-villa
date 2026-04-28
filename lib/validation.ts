import { z } from "zod";

export const villaSchema = z.object({
  name: z.string().min(1),
  location: z.string(),
  price: z.number().positive(),
  capacity: z.number().positive(),
});

export const bookingSchema = z.object({
  villaId: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
});