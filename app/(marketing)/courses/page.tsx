import React from "react";
import { createClient } from "@/lib/supabase/server";
import { fallbackCourses } from "@/constants";
import { Course } from "@/types";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CoursesPageClient from "@/components/courses/CoursesPageClient";

export const metadata = {
  title: "الكورسات | م. زياد السيد",
  description: "استكشف جميع كورسات البرمجة للثانوية العامة مع م. زياد السيد. دروس عملية وتمارين تفاعلية مناسبة لكل المستويات.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  let courses: Course[] = fallbackCourses as Course[];
  let fetchError: string | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, slug, description, subject, grade, track, price, thumbnail_url")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[CoursesPage] Supabase error:", error.message);
      fetchError = error.message;
    } else if (data && data.length > 0) {
      courses = data as Course[];
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("[CoursesPage] Fetch exception:", message);
    fetchError = message;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B101B] text-[#F0FDF4] font-sans">
      <Navbar />
      <main>
        <CoursesPageClient initialCourses={courses} fetchError={fetchError} />
      </main>
      <Footer />
    </div>
  );
}