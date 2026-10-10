"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section
      className="relative min-h-screen bg-cover bg-[position:25%_top] sm:[background-position:calc(50%+80px)_center] xl:bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-[420px] sm:h-[450px] lg:h-80 xl:hidden bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5 min-h-screen flex items-end xl:items-center justify-start pt-24 sm:pt-28 xl:pt-0 pb-8 sm:pb-16 lg:pb-20 xl:pb-0">
        <div className="w-full max-w-xl lg:max-w-2xl text-right flex flex-col items-start gap-3.5 sm:gap-5">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[62px] font-extrabold text-white tracking-tight leading-[1.22] sm:leading-[1.18] xl:leading-[1.2]">
            ابدأ رحلتك في البرمجة
            <span className="block text-primary mt-1 sm:mt-2">من هنا.</span>
          </h1>

          <p className="text-white/85 text-sm sm:text-lg md:text-xl lg:text-[22px] xl:text-xl font-normal leading-relaxed max-w-xl xl:max-w-lg mt-0.5 sm:mt-1">
            من أول سطر كود... لحد ما تبني أول مشروع
            ليك. ابدأ رحلتك في البرمجة بطريقة بسيطة وعملية.
          </p>

          <div className="flex items-center gap-2.5 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-3">
            <Link
              href="/register"
              className="flex-1 sm:flex-initial text-center justify-center px-4 sm:px-9 py-3 sm:py-4 xl:px-8 xl:py-3.5 rounded-full bg-primary hover:bg-primary/90 text-background font-bold text-sm sm:text-lg xl:text-base transition-all duration-300 shadow-xl shadow-[#2ECE95]/25 hover:shadow-[#2ECE95]/40 hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
            >
              ابدأ الآن
            </Link>
            <Link
              href="#courses"
              className="flex-1 sm:flex-initial text-center justify-center px-4 sm:px-9 py-3 sm:py-4 xl:px-8 xl:py-3.5 rounded-full hover:bg-white/10 border border-white/30 text-white font-medium text-sm sm:text-lg xl:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
            >
              استكشف الكورسات
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}
