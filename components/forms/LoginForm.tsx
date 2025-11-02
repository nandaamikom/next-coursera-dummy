"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "admin@admin.com",
    password: "admin123",
  });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email dan Password harus diisi.");
      return;
    }

    setError("");
    console.log("Login data:", formData);
    router.push("/dashboard");
  };

  return (
    <div className="relative z-10 w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 sm:px-8 md:px-10 py-10 shadow-[0_0_40px_rgba(255,255,255,0.1)] text-white mx-auto">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ffffff1a] to-transparent rounded-2xl blur-2xl" />

      <h2 className="text-4xl font-semibold mb-1 bg-gradient-to-r from-blue-700/50 via-pink-500 to-red-500 bg-clip-text text-transparent mb-12">
        Coursera
      </h2>

      <div className="flex flex-row items-center justify-center gap-2 mb-4">
        <button
          onClick={() => {
            setIsAdmin(true);
            setFormData({ email: "admin@gmail.com", password: "admin123" });
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            isAdmin
              ? "bg-[#D21F3C] text-white"
              : "bg-white/20 text-gray-300 hover:bg-white/30"
          }`}
        >
          Admin Login
        </button>
        <button
          onClick={() => {
            setIsAdmin(false);
            setFormData({ email: "", password: "" });
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            !isAdmin
              ? "bg-[#D21F3C] text-white"
              : "bg-white/20 text-gray-300 hover:bg-white/30"
          }`}
        >
          User Login
        </button>
      </div>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm mb-1 block">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md text-white placeholder-gray-400 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Mail
              className="absolute right-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div>
          <label className="text-sm mb-1 block">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md text-white placeholder-gray-400 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock
              className="absolute right-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-right text-xs text-gray-300 cursor-pointer hover:underline">
          Forgot Password?
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-2 rounded-md bg-[#D21F3C] hover:bg-[#b81b33] transition font-semibold shadow-[0_0_20px_rgba(210,31,60,0.5)]"
        >
          Sign in
        </button>
      </form>

      {!isAdmin && (
        <>
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
            Don’t have an account yet?{" "}
            <Link href="/register">
              <span className="text-white font-semibold hover:underline cursor-pointer">
                Register for free
              </span>
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
