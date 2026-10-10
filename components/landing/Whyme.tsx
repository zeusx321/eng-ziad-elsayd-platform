"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cardsData } from "@/constants";

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  position: "left" | "right";
}

export default function Whyme() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Motion variants for right text content
  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Motion variants for timeline container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative py-12 sm:py-18 lg:py-24 bg-[#0B101B] text-[#F0FDF4] overflow-hidden select-none">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#2ECE95]/10 blur-[130px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#2ECE95]/5 blur-[100px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-26 items-center">
          {/* Right Side: Header & Paragraphs (RTL Layout) */}
          <motion.div
            className="lg:col-span-5 text-right flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}

          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.25]">
              ليه تتعلم <span className="text-primary inline-block">معايا؟</span>
            </h2>

            <div className="flex flex-col gap-5 text-white/70 text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                البرمجة مش حفظ أكواد وخلاص، البرمجة طريقة تفكير. عشان كده هتتعلم
                معايا بأسلوب بسيط وعملي، نفهم الفكرة الأول، نطبقها بإيدينا، ونحل
                مشاكل حقيقية خطوة بخطوة — لحد ما تقدر تكتب الكود وأنت فاهم كل سطر
                فيه.
              </p>

              <p className="text-white/70">
                كل درس هنا معمول عشان يوصلك من &quot;مش فاهم&quot; لـ &quot;أنا عرفت أعملها بنفسي&quot;.
              </p>
            </div>
          </motion.div>

          {/* Left Side: Interactive Staggered Cards & Timeline */}
          <motion.div
            className="lg:col-span-7 relative min-h-[520px] sm:min-h-[560px] flex items-center justify-center pt-6 pb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Cards and Timeline Dots */}
            <div className="w-full flex flex-col gap-10 sm:gap-14 relative z-10">
              {/* Central Vertical Green Line (Timeline axis) starting from 1st dot to last dot */}
              <motion.div
                className="absolute top-[68px] bottom-[68px] left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/40 via-primary to-primary/40 rounded-full shadow-[0_0_15px_rgba(46,206,149,0.5)] z-0 hidden sm:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ originY: 0 }}
              />

              {/* Mobile Line fallback */}
              <motion.div
                className="absolute top-[68px] bottom-[68px] right-6 w-1 bg-primary rounded-full z-0 block sm:hidden"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ originY: 0 }}
              />
              {cardsData.map((card, idx) => {
                const isHovered = hoveredId === card.id;

                return (
                  <div
                    key={card.id}
                    className="relative w-full flex items-center justify-start sm:justify-center"
                  >
                    {/* Circle / Dot on the timeline */}
                    <motion.div
                      onMouseEnter={() => setHoveredId(card.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`absolute z-30 cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center
                        ${
                          /* Desktop position: center of timeline */ ""
                        } sm:left-1/2 sm:-translate-x-1/2
                        ${
                          /* Mobile position: right aligned along mobile line */ ""
                        } right-4 sm:right-auto
                        ${
                          isHovered
                            ? "w-7 h-7 bg-primary ring-4 ring-primary/40 shadow-[0_0_25px_#2ECE95] scale-125"
                            : "w-5 h-5 bg-primary ring-2 ring-background shadow-[0_0_12px_#2ECE95]"
                        }
                      `}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: idx * 0.2,
                      }}
                      aria-label={`نقطة ${card.title}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-background" />
                    </motion.div>

                    {/* Card container with staggered left/right positioning */}
                    <motion.div
                      onMouseEnter={() => setHoveredId(card.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      initial={{
                        opacity: 0,
                        x: card.position === "left" ? -70 : 70,
                        scale: 0.92,
                      }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.2,
                        ease: "easeOut",
                      }}
                      className={`w-full sm:w-[50%] max-w-[310px] sm:max-w-[340px] cursor-pointer transition-all duration-300
                        ${
                          /* On desktop, alternate card position left or right of timeline */ ""
                        }
                        ${
                          card.position === "left"
                            ? "sm:mr-auto sm:pl-0 sm:pr-8 pr-12 sm:text-right"
                            : "sm:ml-auto sm:pr-0 sm:pl-8 pr-12 sm:text-right"
                        }
                      `}
                    >
                      <div
                        className={`relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all duration-300 text-right
                          ${
                            isHovered
                              ? "bg-[#131B2E] border-primary shadow-[0_15px_35px_rgba(46,206,149,0.25)] -translate-y-1.5 scale-[1.03]"
                              : "bg-[#111727]/90 border-white/10 shadow-xl hover:border-white/20"
                          }
                        `}
                      >
                        {/* 3D Icon / Emoji Badge at top right of card */}
                        <div
                          className={`absolute -top-5 -right-3 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-transform duration-300
                            ${
                              isHovered
                                ? "scale-115 rotate-6"
                                : ""
                            }
                          `}
                        >
                          {card.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 pt-1">
                          {card.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                          {card.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}