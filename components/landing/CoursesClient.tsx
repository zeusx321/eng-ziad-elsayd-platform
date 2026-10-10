"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  subject?: string;
  grade: string;
  track: string;
  price: number | string;
  thumbnail_url?: string | null;
  lessons_count?: number;
}

interface CoursesClientProps {
  courses: Course[] | null;
  error?: string | null;
}

const gradeLabels: Record<string, string> = {
  grade_1: "1 ثانوي",
  grade_2: "2 ثانوي",
  grade_3: "3 ثانوي",
};

const trackLabels: Record<string, string> = {
  general: "عام عربي",
  languages: "لغات",
};

// Fallback demo courses matching the user's screenshot if Supabase array is empty or during preview
const fallbackCourses: Course[] = [
  {
    id: "demo-1",
    title: "كورس الشهر الأول",
    slug: "first-month-course-general",
    description: "شرح شامل ومبسط للمنهج مع تدريبات واختبارات تفاعلية.",
    grade: "grade_2",
    track: "general",
    price: 160,
    thumbnail_url: null,
    lessons_count: 12,
  },
  {
    id: "demo-2",
    title: "كورس الشهر الأول",
    slug: "first-month-course-languages",
    description: "شرح شامل ومبسط للمنهج باللغات مع تدريبات تفاعلية.",
    grade: "grade_2",
    track: "languages",
    price: 160,
    thumbnail_url: null,
    lessons_count: 12,
  },
  {
    id: "demo-3",
    title: "الكورس الشامل",
    slug: "comprehensive-course",
    description: "تطبيق عملي ومشاريع متكاملة للتمكن من المادة بثقة.",
    grade: "grade_2",
    track: "general",
    price: 370,
    thumbnail_url: null,
    lessons_count: 44,
  },
];

export default function CoursesClient({ courses, error }: CoursesClientProps) {
  const displayCourses = courses && courses.length > 0 ? courses : fallbackCourses;

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="courses"
      dir="rtl"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#0B101B] text-[#F0FDF4] overflow-hidden select-none"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 flex flex-col items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            اختار الكورس <span className="text-primary inline-block">اللي يناسبك.</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
            ابدأ من مستواك، واتعلم خطوة بخطوة من خلال دروس عملية وتمارين تساعدك تثبت اللي اتعلمته.
          </p>
        </motion.div>

        {/* Error message fallback */}
        {error && (
          <div className="max-w-md mx-auto mb-10 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-center text-sm">
            حصلت مشكلة أثناء تحميل الكورسات. جاري عرض المعاينة الحالية.
          </div>
        )}

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {displayCourses.map((course, idx) => {
            const gradeText = gradeLabels[course.grade] || course.grade || "2 ثانوي";
            const trackText = trackLabels[course.track] || course.track || "عام عربي";
            const priceText = typeof course.price === "number" ? course.price.toLocaleString("ar-EG") : course.price;
            const lessons = course.lessons_count || (idx === 2 ? 44 : 12);

            return (
              <motion.article
                key={course.id || idx}
                whileHover={{ y: -8 }}
                className="group flex flex-col justify-between rounded-3xl bg-[#111727] border border-white/10 hover:border-primary/50 shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-b from-[#182338] to-[#0F1626]">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* Default design thumbnail matching the screenshot */
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      {/* Ambient background code backdrop */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0B101B] via-[#152338] to-[#0A261D] opacity-90" />
                      
                      {/* Code pattern grid graphic overlay */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2ECE95_1px,transparent_1px)] [background-size:16px_16px]" />

                      {/* Instructor Photo / Hero Graphic */}
                      <div className="relative z-10 w-full h-full flex items-end justify-center pt-2">
                        <Image
                          src="/images/instructor-1.png"
                          alt="م. زياد السيد"
                          width={260}
                          height={200}
                          className="object-cover object-top h-full w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-20 pointer-events-none">
                    {/* Track Badge (Top Right) */}
                    <span className="rounded-full px-3.5 py-1 text-xs sm:text-sm font-semibold bg-[#111727]/80 text-white border border-white/15 backdrop-blur-md">
                      {trackText}
                    </span>

                    {/* Grade Badge (Top Left) */}
                    <span className="rounded-full px-3.5 py-1 text-xs sm:text-sm font-semibold bg-primary text-background shadow-md">
                      {gradeText}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1 justify-between">
                  {/* Title & Price */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white text-right leading-snug group-hover:text-primary transition-colors duration-300">
                      {course.title}
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
          })}
        </motion.div>

        {/* Global Action Button */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-background font-bold text-base sm:text-lg shadow-lg shadow-[#2ECE95]/20 hover:shadow-[#2ECE95]/35 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>كل الكورسات</span>
            <Image
              src="/images/chevron.png"
              alt="أسهم"
              width={18}
              height={18}
              className="rotate-90 invert brightness-0"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
