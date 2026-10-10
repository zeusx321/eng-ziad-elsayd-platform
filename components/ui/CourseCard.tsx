"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Course, CourseCardProps } from "@/types";
import { gradeLabels, trackLabels } from "@/constants";

export default function CourseCard({ course, idx = 0 }: CourseCardProps) {
  const gradeText = gradeLabels[course.grade] || course.grade || "2 ثانوي";
  const trackText = trackLabels[course.track] || course.track || "عام عربي";
  const priceText =
    typeof course.price === "number"
      ? course.price.toLocaleString("ar-EG")
      : course.price;
  const lessons = course.lessons_count || (idx === 2 ? 44 : 12);

  // Extract clean main title (e.g. "كورس الشهر الأول" without trailing hyphen details)
  const displayTitle = course.title
    ? course.title.split("-")[0].trim()
    : "كورس الشهر الأول";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group flex flex-col justify-between rounded-3xl bg-[#111727] border border-white/10 hover:border-primary/50 shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-b from-[#182338] to-[#0F1626]">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Default gradient tech background without image */
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0D1527]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B101B] via-[#14233A] to-[#0C2D23] opacity-95" />
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute -top-10 -left-10 w-44 h-44 bg-primary/15 blur-3xl rounded-full" />
            <div className="relative z-10 font-mono text-3xl font-extrabold text-primary/30 tracking-widest select-none">
              {"</>"}
            </div>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between z-20 pointer-events-none">
          {/* Track Badge (Top Right) - Larger & Transparent background */}
          <span className="rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-semibold backdrop-blur-md text-white border border-white/20">
            {trackText}
          </span>

          {/* Grade Badge (Top Left) - Larger */}
          <span className="rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-semibold bg-primary text-background shadow-md">
            {gradeText}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1 justify-between">
        {/* Title & Price */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-right leading-snug group-hover:text-primary transition-colors duration-300">
            {displayTitle}
          </h3>

          <div className="flex items-center justify-between text-right mt-1">
            <span className="text-lg sm:text-xl font-bold text-primary">
              {priceText} جنيه
            </span>

            {/* Lessons Count Info */}
            <div className="flex items-center gap-1.5 text-white/70 text-sm sm:text-base">
              <span>{lessons} حصة</span>
              <Image
                src="/images/clock.png"
                alt="مدة الحصص"
                width={18}
                height={18}
                className="opacity-75"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/courses/${course.slug}`}
          className="w-full text-center py-3 rounded-full border border-white/20 hover:border-primary text-white font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 text-sm sm:text-base mt-2"
        >
          شوف الكورس
        </Link>
      </div>
    </motion.article>
  );
}
