"use client";

import { useState } from "react";
import { createBookingAction } from "@/app/actions/booking";

export default function BookingForm({ villas }: { villas: any[] }) {
  const [errors, setErrors] = useState<any>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const villaId = formData.get("villaId")?.toString();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const checkIn = formData.get("checkIn")?.toString();
    const checkOut = formData.get("checkOut")?.toString();

    const newErrors: any = {};

    if (!villaId) newErrors.villaId = "Villa wajib dipilih";
    if (!name) newErrors.name = "Nama wajib diisi";
    if (!email) newErrors.email = "Email wajib diisi";
    if (!checkIn) newErrors.checkIn = "Check-in wajib diisi";
    if (!checkOut) newErrors.checkOut = "Check-out wajib diisi";

    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      newErrors.date = "Check-out harus setelah check-in";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setSuccess("");

    const res = await createBookingAction(formData);

    if (!res.success) {
      setServerError(res.message);
      return;
    }

    // 🎉 SUCCESS POPUP (SAMA KAYAK VILLA)
    setSuccess("Booking berhasil ditambahkan!");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow w-full">

      <h2 className="text-lg font-semibold mb-4">Form Booking</h2>

      {}
      {success && (
        <div className="mb-3 bg-green-100 border border-green-400 text-green-700 p-3 rounded">
          ✅ {success}
        </div>
      )}

      {}
      {serverError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-3">
          {serverError}
        </div>
      )}

      <form action={handleSubmit} className="space-y-3">

        <select name="villaId" className="input w-full">
          <option value="">Pilih Villa</option>
          {villas.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} - {v.location}
            </option>
          ))}
        </select>

        <input name="name" placeholder="Nama" className="input w-full" />
        <input name="email" placeholder="Email" className="input w-full" />
        <input name="checkIn" type="date" className="input w-full" />
        <input name="checkOut" type="date" className="input w-full" />

        {errors.date && (
          <p className="text-red-500 text-xs">{errors.date}</p>
        )}

        <button className="bg-black text-white px-4 py-2 rounded-xl w-full">
          Booking
        </button>
      </form>
    </div>
  );
}