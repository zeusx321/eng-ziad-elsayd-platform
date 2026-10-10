"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/x66scfH_qO8?autoplay=1&rel=0";

  return (
    <section
      id="demo-video"
      dir="rtl"
      className="relative py-12 sm:py-18 lg:py-24 bg-[#0B101B] text-[#F0FDF4] overflow-hidden select-none"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5">
        {/* Header Section (Right-aligned) */}
        <motion.div
          className="w-full max-w-5xl mb-10 sm:mb-14 flex flex-col items-start gap-3 text-right"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] xl:text-6xl font-extrabold text-white tracking-tight leading-tight text-right">
            مش مجرد فيديوهات <span className="text-primary">تتفرج عليها.</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-right mt-1">
            كل درس بيقودك من الشرح للتطبيق، وبعدها للحل والتحدي، عشان تخرج من الدرس وأنت فعلاً عرفت تعمل حاجة بإيدك.
          </p>
        </motion.div>

        {/* Video Container / Thumbnail Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-5xl mx-auto rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#111727] aspect-video flex items-center justify-center group"
        >
          {isPlaying ? (
            /* YouTube Embedded Video Player */
            <iframe
              src={videoUrl}
              title="فيديو تعريفي"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0 rounded-[32px] sm:rounded-[40px]"
            />
          ) : (
            /* Interactive Thumbnail view */
            <div
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full flex items-center justify-center cursor-pointer select-none overflow-hidden"
            >
              {/* Background ambient code backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B101B] via-[#152338] to-[#0A261D] opacity-95" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2ECE95_1px,transparent_1px)] [background-size:18px_18px]" />

              {/* Code window mock graphic (bottom right overlay) */}
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-10 hidden sm:flex flex-col gap-2 p-4 rounded-xl bg-[#0F172A]/85 border border-white/10 backdrop-blur-md shadow-2xl max-w-[280px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-[10px] text-white/50 font-mono mr-2">app.js</span>
                </div>
                <code className="text-xs font-mono text-emerald-400 leading-relaxed">
                  const future = &quot;Developer&quot;;<br />
                  console.log(&apos;Becoming a $&#123;future&#125;&apos;);
                </code>
              </div>

              {/* Code window mock graphic (top left overlay) */}
              <div className="absolute top-8 left-8 z-10 hidden sm:flex flex-col gap-2 p-4 rounded-xl bg-[#0F172A]/85 border border-white/10 backdrop-blur-md shadow-2xl max-w-[260px]">
                <code className="text-xs font-mono text-gray-300 leading-relaxed">
                  <span className="text-primary">function</span> startLearning() &#123;<br />
                  &nbsp;&nbsp;<span className="text-emerald-400">return</span> &quot;Let&apos;s code&quot;;<br />
                  &#125;
                </code>
              </div>

              {/* Instructor Photo */}
              <div className="relative z-10 w-full h-full flex items-end justify-center sm:justify-start sm:pr-24 pt-4">
                <Image
                  src="/images/.png"
                  alt="م. زياد السيد"
                  width={340}
                  height={280}
                  style={{ width: "auto", height: "90%" }}
                  className="object-cover object-top drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-primary/80 group-hover:bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(46,206,149,0.6)] group-hover:scale-110 transition-all duration-300 backdrop-blur-md">
                  <Image
                    src="/images/Polygon.png"
                    alt="تشغيل الفيديو"
                    width={28}
                    height={28}
                    className="mr-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Global Action Button */}
        <motion.div
          className="mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="https://www.youtube.com/@eng-ziad-elsayd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-background font-bold text-base sm:text-lg shadow-lg shadow-[#2ECE95]/20 hover:shadow-[#2ECE95]/35 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>شاهد أكثر</span>
            <Image
              src="/images/chevron.png"
              alt="أسهم"
              width={18}
              height={18}
              className="rotate-90"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}