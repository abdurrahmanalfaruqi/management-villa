"use client";

import { useState } from "react";
import { deleteVillaAction, updateVillaAction } from "@/app/actions/villa";
import { formatRupiah } from "@/src/utils/format";

export default function VillaTable({ villas }: { villas: any[] }) {
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
  });

  // 👉 PAGINATION STATE
  const [page, setPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil(villas.length / perPage);

  const paginatedVillas = villas.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const startEdit = (villa: any) => {
    setEditId(villa.id);
    setForm({
      name: villa.name,
      location: villa.location,
      price: String(villa.price),
    });
  };

  const handleSave = async (id: number) => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("price", form.price);

    await updateVillaAction(id, formData);
    setEditId(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Daftar Villa</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[600px] w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 px-2">Nama</th>
              <th className="px-2">Lokasi</th>
              <th className="px-2">Harga</th>
              <th className="px-2 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedVillas.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Belum ada data villa
                </td>
              </tr>
            ) : (
              paginatedVillas.map((villa) => (
                <tr
                  key={villa.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {}
                  <td className="py-3 px-2 font-semibold text-black">
                    {editId === villa.id ? (
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="input"
                      />
                    ) : (
                      villa.name
                    )}
                  </td>

                  {}
                  <td className="px-2 text-gray-700">
                    {editId === villa.id ? (
                      <input
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        className="input"
                      />
                    ) : (
                      villa.location
                    )}
                  </td>

                  {}
                  <td className="px-2 font-medium text-gray-900">
                    {editId === villa.id ? (
                      <input
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                        className="input"
                      />
                    ) : (
                      `Rp ${formatRupiah(villa.price)}`
                    )}
                  </td>

                  {}
                  <td className="px-2 text-right space-x-2">
                    {editId === villa.id ? (
                      <>
                        <button
                          onClick={() => handleSave(villa.id)}
                          className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-400 text-white px-4 py-1.5 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(villa)}
                          className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <form
                          action={deleteVillaAction.bind(null, villa.id)}
                          className="inline"
                        >
                          <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs hover:bg-red-600 transition">
                            Hapus
                          </button>
                        </form>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}