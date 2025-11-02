"use client";

import { useState } from "react";
import { BarChart3, Users, BookOpen, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <BarChart3 />, label: "Dashboard", href: "/dashboard" },
    { icon: <Users />, label: "User", href: "/user" },
    { icon: <BookOpen />, label: "Course", href: "/courses" },
  ];

  const settingsItem = {
    icon: <Settings />,
    label: "Settings",
    href: "/settings",
  };

  return (
    <>
      {/*  MOBILE TOPBAR  */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow fixed top-0 left-0 right-0 z-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-700/50 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-widest">Coursera</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/*  SIDEBAR  */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 bg-white border-r border-gray-300/50 w-64 min-h-screen px-4 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-16 md:mt-0">
          <div className="p-6 text-4xl font-bold bg-gradient-to-r from-blue-700/50 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-widest md:block hidden">
            Coursera
          </div>

          <nav className="mt-4 flex flex-col space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname.startsWith(item.href)}
                onClick={() => setIsOpen(false)} // tutup menu saat mobile
              />
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-300/50 space-y-2">
          <SidebarItem
            icon={settingsItem.icon}
            label={settingsItem.label}
            href={settingsItem.href}
            active={pathname.startsWith(settingsItem.href)}
            onClick={() => setIsOpen(false)}
          />
        </div>
      </aside>

      {/* Overlay di mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
        />
      )}
    </>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({
  icon,
  label,
  href,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
          active
            ? "bg-blue-700/50 text-white font-medium shadow-md"
            : "text-gray-700 hover:bg-blue-700/50 hover:text-white"
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}
