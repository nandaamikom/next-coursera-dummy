"use client";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#121631] to-[#1b1e3f] overflow-hidden px-2 sm:px-6">
      {/* Background Glows */}
      <div className="absolute -top-20 -left-20 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-[#2E3AFF]/40 blur-[90px] sm:blur-[120px] rounded-full" />
      <div className="absolute bottom-10 left-[10%] sm:left-[25%] w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] bg-[#3AFFC3]/30 blur-[100px] sm:blur-[130px] rounded-full" />
      <div className="absolute top-[25%] right-[5%] sm:right-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-[#FF2D6B]/30 blur-[100px] sm:blur-[130px] rounded-full" />

      {/* Decorative Curves */}
      <Image
        src="images/curve-red.svg"
        alt="curve red"
        width={500}
        height={500}
        className="absolute top-[5%] right-[10%] sm:top-[10%] sm:right-[25%] w-[250px] sm:w-[500px] drop-shadow-[0_0_40px_rgba(255,70,120,0.4)] opacity-70"
      />
      <Image
        src="images/curve-blue.svg"
        alt="curve blue"
        width={300}
        height={300}
        className="absolute bottom-[5%] left-[10%] sm:bottom-[10%] sm:left-[27%] w-[180px] sm:w-[300px] drop-shadow-[0_0_30px_rgba(0,200,255,0.4)] opacity-80"
      />

      {/* Login Form */}
      <LoginForm />
    </main>
  );
}
