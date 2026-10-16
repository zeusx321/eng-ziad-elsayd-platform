"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getFriendlyErrorMessage } from "@/lib/auth-errors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      // حماية من تعليق الاتصال إذا لم يستجب السيرفر خلال 15 ثانية
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error("انتهت مهلة الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.")
            ),
          15000
        )
      );

      const authPromise = supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      const result = await Promise.race([authPromise, timeoutPromise]);
      const { data, error: signInError } = result;

      // 1. في حال رجوع خطأ من الباك إند
      if (signInError) {
        setError(getFriendlyErrorMessage(signInError.message));
        setLoading(false);
        return;
      }

      // 2. في حال لم يرجع الباك إند أي بيانات للجلسة أو المستخدم
      if (!data || (!data.user && !data.session)) {
        setError("لم يتم استلام بيانات الحساب من الخادم، يرجى المحاولة مرة أخرى.");
        setLoading(false);
        return;
      }

      // النجاح: الانتقال للوحة التحكم وإبقاء حالة التحميل حتى تحميل الصفحة
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? getFriendlyErrorMessage(err.message)
          : "حدث خطأ غير معروف، يرجى المحاولة لاحقاً."
      );
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#070A11] text-[#F0FDF4] flex items-stretch overflow-x-hidden selection:bg-[#2ECE95]/30 selection:text-white"
    >
      {/* Right Hero Image Card (Desktop) - 1st in RTL flow = visually on the Right */}
      <div className="hidden lg:flex lg:w-1/2 p-4 lg:p-5 relative items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full h-full min-h-[640px] max-h-[calc(100vh-2.5rem)] rounded-[28px] overflow-hidden border border-white/5 shadow-2xl bg-[#0F1420]"
        >
          {/* Main Visual Image */}
          <Image
            src="/images/auth-student2.jpg"
            alt="رحلتك في البرمجة"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center select-none"
          />

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A11]/95 via-[#070A11]/30 to-transparent pointer-events-none" />

          {/* Inner subtle glow border */}
          <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10 pointer-events-none" />

          {/* Motivational Text at Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="absolute bottom-10 right-10 left-10 z-10 text-right pointer-events-none"
          >
            <h2 className="text-3xl/15 xl:text-4xl/15 font-extrabold text-white leading-snug tracking-tight drop-shadow-md">
              رحلتك في البرمجة بتبدأ
              <br />
              <span className="inline-flex items-center gap-2">
                من هنا.
                <span className="inline-block transform hover:rotate-12 transition-transform">
                  🚀
                </span>
              </span>
            </h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Left Form Area - 2nd in RTL flow = visually on the Left */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-5 sm:p-8 lg:p-12 relative z-10">
        {/* Top Header: Back Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-start mb-6 lg:mb-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
            <span>رجوع</span>
          </Link>
        </motion.div>

        {/* Center: Card Container */}
        <div className="w-full max-w-[440px] mx-auto my-auto py-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <div className="relative w-12 h-10 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={56}
                  height={32}
                  priority
                  className="object-contain brightness-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center mb-7">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span className="text-white">تسجيل </span>
                <span className="text-[#2ECE95]">الدخول.</span>
              </h1>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-5 p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs sm:text-sm flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-xs sm:text-sm font-medium text-zinc-200 mb-1.5 text-right">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="ادخل بريدك الإلكتروني"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
                  required
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label className="block text-xs sm:text-sm font-medium text-zinc-200 mb-1.5 text-right">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 pl-11 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                    tabIndex={-1}
                    aria-label="تبديل إظهار كلمة المرور"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#2ECE95] hover:bg-[#28b885] active:scale-[0.99] text-[#070A11] font-bold text-base rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(46,206,149,0.28)] hover:shadow-[0_0_30px_rgba(46,206,149,0.45)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#070A11]" />
                      <span>جاري تسجيل الدخول...</span>
                    </>
                  ) : (
                    <span>تسجيل الدخول</span>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-zinc-500 mt-4"
        >
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="text-[#2ECE95] hover:underline font-medium"
          >
            إنشاء حساب جديد
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
