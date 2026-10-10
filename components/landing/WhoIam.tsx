"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhoIam() {
  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.15 },
    },
  };

  return (
    <section
      id="who-i-am"
      dir="rtl"
      className="relative py-12 sm:py-18 lg:py-24 bg-[#F0FDF4] text-[#0B101B] overflow-hidden select-none"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-primary/10 blur-[140px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content (Right Column in RTL) - Placed 1st in DOM */}
          <motion.div
            className="lg:col-span-6 text-right flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] xl:text-6xl font-extrabold text-[#0B101B] tracking-tight leading-tight">
              مين هيكون معاك <span className="text-primary inline-block">في الرحلة؟</span>
            </h2>

            <div className="flex flex-col gap-5 text-[#0B101B]/80 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
              <p>
                أنا زياد، مطور Front-End ومدرّس برمجة، بحب أبسّط البرمجة وأخلي تعلمها عملي وممتع. عندي خبرة في تدريس أساسيات البرمجة وحل المشكلات، وشاركت في تدريب طلاب ICPC ومساعدتهم على بناء أساس قوي في البرمجة والتفكير المنطقي.
              </p>

              <p>
                أنشأت المنصة دي عشان أوفّر تجربة تعليمية بسيطة وعملية تساعدك تتعلم البرمجة خطوة بخطوة، وتنتقل من فهم الأساسيات لكتابة الكود بنفسك.
              </p>
            </div>
          </motion.div>

          {/* Photo Composition (Left Column in RTL) - Placed 2nd in DOM */}
          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[490px] w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={photoVariants}
          >
            <div className="relative w-full max-w-[540px] h-[400px] sm:h-[470px] flex items-center justify-center">
              {/* Photo 1: Graduation photo (Background photo, tilted left) */}
              <div className="absolute right-0 sm:right-4 top-0 w-[240px] sm:w-[300px] h-[340px] sm:h-[430px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl shadow-[#0B101B]/15 bg-white -rotate-4 hover:rotate-0 transition-transform duration-500 z-10 border border-[#0B101B]/10">
                <Image
                  src="/images/instructor-1.png"
                  alt="م. زياد السيد"
                  fill
                  sizes="(max-width: 640px) 240px, 300px"
                  className="object-cover object-top opacity-95"
                />
              </div>

              {/* Photo 2: Teaching at screen (Foreground photo, tilted right - ON TOP) */}
              <div className="absolute left-0 sm:left-6 top-4 w-[250px] sm:w-[320px] h-[350px] sm:h-[440px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl shadow-[#0B101B]/25 bg-white rotate-6 hover:rotate-3 transition-transform duration-500 z-20 border border-[#0B101B]/10">
                <Image
                  src="/images/instructor-2.png"
                  alt="م. زياد السيد أثناء التدريس"
                  fill
                  sizes="(max-width: 640px) 250px, 320px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}