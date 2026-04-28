"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Villa", href: "/dashboard/villa" },
    { name: "Booking", href: "/dashboard/booking" },
  ];

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">

      {}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b p-3 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-semibold"
        >
          ☰ Menu
        </button>
      </div>

      {}
      <aside
        className={`
          fixed md:static z-40 bg-gray-100 border-r border-gray-200 p-5 space-y-4
          w-64 h-full md:h-auto transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Villa Admin
        </h1>

        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-gray-300 font-semibold text-black"
                      : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden z-30"
        />
      )}

      {}
      <main className="flex-1 bg-gray-50 p-4 md:p-6 pt-16 md:pt-6 md:ml-0 w-full min-w-0">
        {children}
      </main>

    </div>
  );
}