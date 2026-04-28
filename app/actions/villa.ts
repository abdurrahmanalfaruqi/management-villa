"use server";

import { createVilla } from "@/services/villa.service";
import { revalidatePath } from "next/cache";
import { deleteVilla } from "@/services/villa.service";
import { updateVilla } from "@/services/villa.service";



export const createVillaAction = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get("name")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      price: Number(formData.get("price") || 0),
      capacity: Number(formData.get("capacity") || 0),
    };

    console.log("DATA MASUK:", data);

    const result = await createVilla(data);

    console.log("BERHASIL SIMPAN:", result);

    revalidatePath("/dashboard/villa");
  } catch (err) {
    console.error("ERROR CREATE:", err);
    throw err;
  }
};
export const deleteVillaAction = async (id: number) => {
  console.log("DELETE ID:", id);

  await deleteVilla(id);

  revalidatePath("/dashboard/villa");
};
export const updateVillaAction = async (id: number, formData: FormData) => {
  await updateVilla(id, {
    name: formData.get("name") as string,
    location: formData.get("location") as string,
    price: Number(formData.get("price")),
    capacity: Number(formData.get("capacity")),
  });

  revalidatePath("/dashboard/villa");
};