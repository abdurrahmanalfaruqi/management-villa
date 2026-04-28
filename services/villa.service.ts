import { prisma } from "@/lib/prisma";

export const getVillas = async () => {
  return prisma.villa.findMany();
};

export const createVilla = async (data: {
  name: string;
  location: string;
  price: number;
  capacity: number;
}) => {
      console.log("MASUK SERVICE", data); // 🔥 debug

  return prisma.villa.create({ data });
};

export const updateVilla = async (id: number, data: any) => {
  return prisma.villa.update({
    where: { id },
    data,
  });
};

export const deleteVilla = async (id: number) => {
  return prisma.villa.delete({
    where: { id },
  });
};