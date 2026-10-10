"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import CourseCard from "@/components/ui/CourseCard";
import { Course } from "@/types";
import { fallbackCourses } from "@/constants";

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchCourses() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("courses")
          .select("id, title, slug, description, subject, grade, track, price, thumbnail_url")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (!isMounted) return;

        if (error) {
          console.warn("Supabase fetch notice:", error.message);
        } else if (data && data.length > 0) {
          setCourses(data as Course[]);
        } else {
          setCourses(fallbackCourses);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.warn("Supabase fetch exception:", err);
        }
      }
    }

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

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

  return (
    <section
      id="courses"
      dir="rtl"
      className="relative py-12 sm:py-18 lg:py-24 bg-[#0B101B] text-[#F0FDF4] overflow-hidden select-none"
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
          className="max-w-3xl mb-10 sm:mb-14 flex flex-col items-start gap-4 text-right"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-right">
            اختار الكورس <span className="text-primary inline-block">اللي يناسبك.</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl text-right">
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {courses.map((course, idx) => (
            <CourseCard key={course.id || idx} course={course} idx={idx} />
          ))}
        </div>

        {/* Global Action Button */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
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
              className="rotate-90 invert"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
