"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqQuestions } from "@/constants";

export default function QA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      dir="rtl"
      className="relative py-12 sm:py-18 lg:py-24 bg-[#0B101B] text-[#F0FDF4] overflow-hidden select-none"
    >
      {/* Background ambient glows */}
      <div
        className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-primary/5 blur-[160px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-primary/5 blur-[140px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5">
        {/* Header Section (Right-aligned) */}
        <motion.div
          className="w-full max-w-5xl mb-8 sm:mb-10 flex flex-col items-start gap-3 text-right"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] xl:text-6xl font-extrabold text-white tracking-tight leading-tight text-right">
            قسم <span className="text-primary">الأسئلة.</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-right mt-1">
            جمعنالك أهم الأسئلة اللي ممكن تيجي في بالك قبل ما تبدأ رحلتك في تعلم البرمجة.
          </p>
        </motion.div>

        {/* Accordion Questions List (Centered container) */}
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
          {faqQuestions.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className={`w-full rounded-2xl sm:rounded-[22px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#111727] border-primary/50 shadow-[0_0_25px_rgba(46,206,149,0.12)]"
                    : "bg-[#111727]/70 border-white/10 hover:border-white/25 hover:bg-[#111727]"
                }`}
              >
                {/* Accordion Header / Question Bar */}
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 text-right cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {item.question}
                  </span>

                  {/* Arrow Indicator */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-90 bg-primary/20 text-primary"
                        : "bg-white/5 text-white/70 group-hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content / Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-7 text-white/75 text-base sm:text-lg leading-relaxed text-right border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
