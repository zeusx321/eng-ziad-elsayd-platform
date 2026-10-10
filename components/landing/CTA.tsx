"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="cta"
      dir="rtl"
      className="relative py-14 sm:py-20 lg:py-24 bg-[#2ECE95] text-[#0B101B] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5">
        <motion.div
          className="max-w-4xl flex flex-col items-start gap-4 sm:gap-6 text-right"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-tight flex flex-wrap items-center gap-2 sm:gap-3 text-right">
            <span>جاهز تبدأ أول خطوة؟</span>
            <span className="inline-block text-3xl sm:text-5xl lg:text-5xl">🚀</span>
          </h2>

          {/* Subtitle / Description */}
          <p className="text-white/90 text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-right max-w-3xl">
            متستناش إنك تبقى جاهز عشان تبدأ. ابدأ، اتعلم، وخلّي مستواك يتطور مع كل سطر كود.
          </p>

          {/* Action Button */}
          <div className="mt-2 sm:mt-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#15A876] hover:bg-white/95 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              ابدأ الآن
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}