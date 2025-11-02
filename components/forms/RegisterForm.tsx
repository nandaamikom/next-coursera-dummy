"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Semua field harus diisi.");
      return;
    }

    setError("");
    console.log("Register data:", formData);
    router.push("/login");
  };

  return (
    <div className="relative z-10 w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 sm:px-8 md:px-10 py-10 shadow-[0_0_40px_rgba(255,255,255,0.1)] text-white mx-auto">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ffffff1a] to-transparent rounded-2xl blur-2xl" />

      <h2 className="text-4xl font-semibold mb-1 bg-gradient-to-r from-blue-700/50 via-pink-500 to-red-500 bg-clip-text text-transparent mb-12">
        Coursera
      </h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm mb-1 block">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md text-white placeholder-gray-400 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            placeholder="username@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md text-white placeholder-gray-400 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md text-white placeholder-gray-400 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-2 w-full py-2 rounded-md bg-[#D21F3C] hover:bg-[#b81b33] transition font-semibold shadow-[0_0_20px_rgba(210,31,60,0.5)]"
        >
          Register
        </button>
      </form>

      <div className="my-4 text-center text-sm text-gray-300">
        or continue with
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button className="bg-white w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-800 font-medium text-sm hover:bg-gray-300 transition">
          <FcGoogle width={18} height={18} />
          Google
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-300">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-white font-semibold hover:underline cursor-pointer">
            Login here
          </span>
        </Link>
      </p>
    </div>
  );
}
