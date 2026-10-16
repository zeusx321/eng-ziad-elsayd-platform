"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Course } from "@/types";
import { gradeLabels, trackLabels } from "@/constants";

export interface CourseCardProps {
  course: Course;
  idx?: number;
  layout?: boolean;
  className?: string;
}

export default function CourseCard({
  course,
  idx = 0,
  layout = false,
  className = "",
}: CourseCardProps) {
  const gradeText =
    (gradeLabels as Record<string, string>)[course.grade] ||
    course.grade ||
    "2 ثانوي";
  const trackText =
    (trackLabels as Record<string, string>)[course.track] ||
    course.track ||
    "عام عربي";
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
      layout={layout}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`group flex flex-col justify-between rounded-3xl bg-[#111727] border border-white/10 hover:border-primary/50 shadow-xl transition-all duration-300 overflow-hidden ${className}`}
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
          /* Default design thumbnail matching the landing page */
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B101B] via-[#152338] to-[#0A261D] opacity-90" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2ECE95_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 w-full h-full flex items-end justify-center pt-2">
            </div>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between z-20 pointer-events-none">
          {/* Track Badge (Top Right) */}
          <span className="rounded-full px-4 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-[#111727]/80 text-white border border-white/15 backdrop-blur-md">
            {trackText}
          </span>

          {/* Grade Badge (Top Left) */}
          <span className="rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-primary text-background shadow-md">
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
            <div className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
              <span>{lessons} حصة</span>
              <Image
                src="/images/clock.png"
                alt="مدة الحصص"
                width={16}
                height={16}
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

