// components/Navbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";


interface NavbarProps {
  userName?: string;
  avatarUrl?: string;
}

export default function Navbar({
  userName = "Admin Course",
  avatarUrl = `https://api.dicebear.com/9.x/adventurer/png?seed=AdminCourse`
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full relative px-6 py-3 flex justify-between items-center text-white h-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/navbar.jpg"
          alt="Navbar Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <h1 className="text-xl font-semibold z-10">Reports</h1>

      <div className="relative z-10" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-white hover:text-gray-200 px-3 py-2 rounded-lg transition"
        >
          <Image
            src={avatarUrl}
            alt={`${userName} Avatar`}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span>{userName}</span>
          <ChevronDown size={16} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
            <Link href="/login">
             <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </Link>
           
          </div>
        )}
      </div>
    </header>
  );
}
