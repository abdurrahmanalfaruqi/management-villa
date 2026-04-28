"use client";

import { useState } from "react";
import { createVillaAction } from "@/app/actions/villa";

export default function CreateVillaForm() {
  const [errors, setErrors] = useState<any>({});
  const [priceDisplay, setPriceDisplay] = useState("");
  const [success, setSuccess] = useState("");

  // 👉 FORMAT RUPIAH
  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, "");
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  };

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const capacity = formData.get("capacity")?.toString();
    const price = formData.get("price")?.toString();

    const newErrors: any = {};

    if (!name) newErrors.name = "Nama wajib diisi";
    if (!location) newErrors.location = "Lokasi wajib diisi";
    if (!price) newErrors.price = "Harga wajib diisi";
    if (!capacity) newErrors.capacity = "Kapasitas wajib diisi";

    if (price && Number(price) <= 0) {
      newErrors.price = "Harga harus lebih dari 0";
    }

    if (capacity && Number(capacity) <= 0) {
      newErrors.capacity = "Kapasitas harus lebih dari 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccess("");

    await createVillaAction(formData);

    // 🎉 SUCCESS POPUP
    setSuccess("Villa berhasil ditambahkan!");

    // reset form
    setPriceDisplay("");
    (document.getElementById("villa-form") as HTMLFormElement)?.reset();

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div>
      {}
      {success && (
        <div className="mb-3 bg-green-100 border border-green-400 text-green-700 p-3 rounded">
          ✅ {success}
        </div>
      )}

      <form
        id="villa-form"
        action={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
      >
        <h2 className="text-lg font-semibold">Tambah Villa</h2>

        {}
        <div>
          <input
            name="name"
            placeholder="Nama Villa"
            className={`input ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {}
        <div>
          <input
            name="location"
            placeholder="Lokasi"
            className={`input ${errors.location ? "border-red-500" : ""}`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        {}
        <div>
          <input
            value={priceDisplay}
            onChange={(e) =>
              setPriceDisplay(formatRupiah(e.target.value))
            }
            placeholder="Rp 0"
            className={`input ${errors.price ? "border-red-500" : ""}`}
          />

          {}
          <input
            type="hidden"
            name="price"
            value={priceDisplay.replace(/\D/g, "")}
          />

          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>

        {}
        <div>
          <input
            name="capacity"
            type="number"
            placeholder="Kapasitas"
            className={`input ${errors.capacity ? "border-red-500" : ""}`}
          />
          {errors.capacity && (
            <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
          )}
        </div>

        <button className="bg-black text-white py-2 rounded-xl w-full">
          + Tambah Villa
        </button>
      </form>
    </div>
  );
}