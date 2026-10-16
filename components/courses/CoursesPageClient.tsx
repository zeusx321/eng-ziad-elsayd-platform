"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Course } from "@/types";
import { gradeLabels, trackLabels } from "@/constants";
import CourseCard from "@/components/ui/CourseCard";

type DurationBucket = "short" | "medium" | "long";

function getDurationBucket(lessons: number): DurationBucket {
  if (lessons <= 15) return "short";
  if (lessons <= 30) return "medium";
  return "long";
}

const durationLabels: Record<DurationBucket, string> = {
  short: "قصير (أقل من 15 حصة)",
  medium: "متوسط (16 - 30 حصة)",
  long: "مكثف (أكثر من 30 حصة)",
};

interface Filters {
  grades: string[];
  tracks: string[];
  durations: DurationBucket[];
}

const heroVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};



const sidebarVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.15 },
  },
};

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer select-none ${
        active
          ? "bg-primary text-[#0B101B] border-primary font-bold shadow-[0_2px_12px_rgba(46,206,149,0.3)]"
          : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10 hover:border-white/25 hover:text-white"
      }`}
    >
      <span>{label}</span>
    </button>
  );
}



function FilterGroup({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        <h3 className="text-sm font-bold text-white/90 tracking-wide">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </div>
  );
}

interface Props {
  initialCourses: Course[];
  fetchError: string | null;
}

export default function CoursesPageClient({ initialCourses, fetchError }: Props) {
  const [filters, setFilters] = useState<Filters>({ grades: [], tracks: [], durations: [] });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleGrade = useCallback((grade: string) => {
    setFilters((f) => ({ ...f, grades: f.grades.includes(grade) ? f.grades.filter((g) => g !== grade) : [...f.grades, grade] }));
  }, []);

  const toggleTrack = useCallback((track: string) => {
    setFilters((f) => ({ ...f, tracks: f.tracks.includes(track) ? f.tracks.filter((t) => t !== track) : [...f.tracks, track] }));
  }, []);

  const toggleDuration = useCallback((dur: DurationBucket) => {
    setFilters((f) => ({ ...f, durations: f.durations.includes(dur) ? f.durations.filter((d) => d !== dur) : [...f.durations, dur] }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ grades: [], tracks: [], durations: [] });
  }, []);

  const hasActiveFilters = filters.grades.length > 0 || filters.tracks.length > 0 || filters.durations.length > 0;

  const filtered = useMemo(() => {
    let list = initialCourses;
    if (filters.grades.length > 0) list = list.filter((c) => filters.grades.includes(c.grade));
    if (filters.tracks.length > 0) list = list.filter((c) => filters.tracks.includes(c.track));
    if (filters.durations.length > 0) list = list.filter((c) => filters.durations.includes(getDurationBucket(c.lessons_count ?? 12)));
    return list;
  }, [initialCourses, filters]);

  const sidebarContent = (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-[20px] font-extrabold text-white tracking-tight">تصفية الكورسات</h2>
        {hasActiveFilters && (
          <button type="button" onClick={clearFilters} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2">مسح الكل</button>
        )}
      </div>

      <div className="w-full h-px bg-white/10" />

      <FilterGroup title="السنة الدراسية">
        {Object.entries(gradeLabels).map(([key, label]) => (
          <FilterChip key={key} label={label} active={filters.grades.includes(key)} onClick={() => toggleGrade(key)} />
        ))}
      </FilterGroup>

      <div className="w-full h-px bg-white/10" />

      <FilterGroup title="المسار الدراسي">
        {Object.entries(trackLabels).map(([key, label]) => (
          <FilterChip key={key} label={label} active={filters.tracks.includes(key)} onClick={() => toggleTrack(key)} />
        ))}
      </FilterGroup>

      <div className="w-full h-px bg-white/10" />

      <FilterGroup title="مدة الكورس">
        {(Object.keys(durationLabels) as DurationBucket[]).map((key) => (
          <FilterChip key={key} label={durationLabels[key]} active={filters.durations.includes(key)} onClick={() => toggleDuration(key)} />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B101B] text-[#F0FDF4] overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary/4 blur-[140px] rounded-full z-0" />

      <section className="relative z-10 pt-32 sm:pt-36 pb-14 sm:pb-16 px-5 sm:px-8 lg:px-7 max-w-7xl mx-auto">
        <motion.div className="flex flex-col items-start text-right gap-5 max-w-3xl" variants={heroVariants} initial="hidden" animate="visible">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-right">
            اختار الكورس{" "}
            <span className="text-primary relative inline-block">
              اللي يناسبك.
              <span aria-hidden="true" className="absolute -bottom-1 right-0 left-0 h-0.5 bg-gradient-to-l from-primary/0 via-primary to-primary/0 rounded-full" />
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl text-right">
            استكشف الكورسات المصممة لطلاب الثانوية العامة. ابدأ من مستواك واتعلم خطوة بخطوة من خلال دروس عملية وتمارين تساعدك تثبت اللي اتعلمته.
          </p>
          
        </motion.div>
      </section>

      {fetchError && (
        <div className="relative z-10 max-w-3xl mx-auto px-5 mb-8">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
            <span className="text-lg">⚠️</span>
            <span>حصلت مشكلة أثناء تحميل الكورسات من الخادم. جاري عرض الكورسات المتاحة.</span>
          </div>
        </div>
      )}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-7 pb-24">
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <p className="text-white/60 text-sm">{filtered.length} كورس</p>
          <button type="button" onClick={() => setSidebarOpen((v) => !v)} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:border-primary/50 text-white text-sm font-medium transition-all duration-200 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
            </svg>
            التصفية
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
          </button>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden overflow-hidden mb-8">
              <div className="p-5 rounded-2xl bg-[#111727] border border-white/10">{sidebarContent}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-8 lg:gap-8 items-stretch">
          {/* Desktop sidebar */}
          <motion.aside variants={sidebarVariants} initial="hidden" animate="visible" className="hidden lg:block w-64 xl:w-72 shrink-0">
            <div className="sticky top-28 bg-transparent p-0">{sidebarContent}</div>
          </motion.aside>

          {/* Vertical divider line separating the sidebar from courses along full height of courses */}
          <div aria-hidden="true" className="hidden lg:block w-px bg-white/10 self-stretch shrink-0" />

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center justify-center py-24 text-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl">🔍</div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white">مفيش كورسات بالفلتر ده</h3>
                    <p className="text-white/50 text-sm max-w-xs">جرب تغير الفلتر أو امسحه عشان تشوف كل الكورسات المتاحة.</p>
                  </div>
                  <button type="button" onClick={clearFilters} className="px-6 py-2.5 rounded-full border border-primary/50 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200">مسح الفلاتر</button>
                </motion.div>
              ) : (
                <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8 items-stretch" variants={gridVariants} initial="hidden" animate="visible">
                  {filtered.map((course, idx) => (
                    <CourseCard key={course.id} course={course} idx={idx} layout={true} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}