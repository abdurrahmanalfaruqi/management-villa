"use client";

import { useState } from "react";
import { deleteBookingAction } from "@/app/actions/booking";

export default function BookingTable({ bookings }: { bookings: any[] }) {
    const [page, setPage] = useState(1);
    const perPage = 10;

    const totalPages = Math.ceil(bookings.length / perPage);

    const data = bookings.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm overflow-x-auto">

            <h2 className="text-lg font-semibold mb-4">Daftar Booking</h2>

            <table className="min-w-[800px] w-full text-sm">
                <thead>
                    <tr className="text-left border-b text-gray-600">
                        <th className="py-3 px-2">Villa</th>
                        <th className="px-2">Nama</th>
                        <th className="px-2">Email</th>
                        <th className="px-2">Check In</th>
                        <th className="px-2">Check Out</th>
                        <th className="px-2 text-right">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-6 text-gray-400">
                                Belum ada booking
                            </td>
                        </tr>
                    ) : (
                        data.map((b) => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">

                                <td className="py-3 px-2 font-semibold">
                                    {b.villa?.name}
                                </td>

                                <td className="px-2">{b.name}</td>
                                <td className="px-2 text-gray-600">{b.email}</td>

                                <td className="px-2">
                                    {new Date(b.checkIn).toISOString().split("T")[0]}                </td>

                                <td className="px-2">
                                    {new Date(b.checkOut).toISOString().split("T")[0]}

                                </td>

                                <td className="px-2 text-right">
                                    <form action={deleteBookingAction.bind(null, b.id)}>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600">
                                            Hapus
                                        </button>
                                    </form>
                                </td>

                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* PAGINATION */}
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