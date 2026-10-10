"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <header
      dir="ltr"
      className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-3"
    >
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto relative w-[764px] h-[80px] backdrop-blur-xs max-w-[calc(100vw-24px)] rounded-full flex items-center justify-between pl-8 sm:pl-9 pr-5 sm:pr-6 select-none transition-all duration-300 "
      >
        <div className="pointer-events-none absolute inset-[5px] sm:inset-[6px] rounded-full border border-white/20" />
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.16), rgba(0, 229, 153, 0.05) 40%, transparent 75%)`,
          }}
        />

        <div className="relative z-10 flex items-center">
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 active:scale-95"
            aria-label="الرئيسية"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={32}
              priority
              style={{ width: "auto" }}
              className="h-[24px] sm:h-[28px] object-contain brightness-100 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
            />
          </Link>
        </div>

        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
          <Link
            href="/login"
            className="w-[100px] sm:w-[119px] h-[40px] sm:h-[46px] rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-white bg-transparent hover:bg-white/10 border border-white/30 hover:border-white/50 backdrop-blur-md transition-all duration-200 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          >
            تسجيل دخول
          </Link>

          <Link
            href="/register"
            className="relative overflow-hidden w-[100px] sm:w-[119px] h-[38px] sm:h-[44px] rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-all duration-200 active:scale-95 shadow-[0_4px_20px_rgba(0,229,153,0.35)] hover:shadow-[0_4px_25px_rgba(0,229,153,0.5)] group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 text-background font-bold">
              إنشاء حساب
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
