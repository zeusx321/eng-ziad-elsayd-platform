"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getFriendlyErrorMessage } from "@/lib/auth-errors";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    studentPhone: "",
    parentPhone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const supabase = createClient();

  const validateEgyptianPhone = (phone: string) => {
    return /^01[0125][0-9]{8}$/.test(phone.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setError(null);
    setSuccess(false);

    // Validation
    if (
      !formData.fullName ||
      !formData.studentPhone ||
      !formData.parentPhone ||
      !formData.email ||
      !formData.password
    ) {
      setError("جميع الحقول مطلوبة");
      return;
    }

    if (!validateEgyptianPhone(formData.studentPhone)) {
      setError("رقم الطالب غير صالح. يجب أن يكون رقم هاتف مصري صحيح (مثال: 01012345678).");
      return;
    }

    if (!validateEgyptianPhone(formData.parentPhone)) {
      setError("رقم ولي الأمر غير صالح. يجب أن يكون رقم هاتف مصري صحيح (مثال: 01012345678).");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل");
      return;
    }

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

      const signUpPromise = supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            phone: formData.studentPhone.trim(),
            parent_phone: formData.parentPhone.trim(),
          },
          emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
        },
      });

      const result = await Promise.race([signUpPromise, timeoutPromise]);
      const { data, error: signUpError } = result;

      // 1. في حال رجوع خطأ من الباك إند
      if (signUpError) {
        setError(getFriendlyErrorMessage(signUpError.message));
        setLoading(false);
        return;
      }

      // 2. في حال لم يرجع الباك إند أي بيانات
      if (!data || (!data.user && !data.session)) {
        setError("لم يتم استلام أي استجابة من الخادم، يرجى المحاولة لاحقاً.");
        setLoading(false);
        return;
      }

      // 3. التحقق إذا كان البريد مسجلاً مسبقاً (سوبابيز يرجع مصفوفة identities فارغة)
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        setError("هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول بدلاً من ذلك.");
        setLoading(false);
        return;
      }

      // النجاح: إذا تم إنشاء الجلسة فوراً، الانتقال للوحة التحكم وإبقاء التحميل
      if (data?.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // إذا كان يلزم تأكيد البريد الإلكتروني
      setSuccess(true);
      setLoading(false);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? getFriendlyErrorMessage(err.message)
          : "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً"
      );
      setLoading(false);
    }
  };

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#070A11] text-[#F0FDF4] flex items-stretch overflow-x-hidden selection:bg-[#2ECE95]/30 selection:text-white"
    >
      {/* Left Form Area */}
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

        {/* Center: Form Container */}
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
                <span className="text-white">إنشاء </span>
                <span className="text-[#2ECE95]">حساب.</span>
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

            {/* Success Message */}
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="p-6 bg-[#0E1524] border border-[#2ECE95]/30 rounded-2xl text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#2ECE95]/15 flex items-center justify-center text-[#2ECE95]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">تم التسجيل بنجاح!</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك، ثم تسجيل الدخول للبدء.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setRedirecting(true);
                      router.push("/login");
                      router.refresh();
                    }}
                    disabled={redirecting}
                    className="w-full py-3.5 px-4 bg-[#2ECE95] hover:bg-[#28b885] active:scale-[0.99] text-[#070A11] font-bold text-base rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(46,206,149,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {redirecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#070A11]" />
                        <span>جاري الانتقال...</span>
                      </>
                    ) : (
                      <span>الانتقال لتسجيل الدخول</span>
                    )}
                  </button>
                </motion.div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-zinc-200 mb-1.5 text-right">
                      الاسم بالكامل
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="ادخل اسمك"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
                      required
                    />
                  </motion.div>

                  {/* Student Phone */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-zinc-200 mb-1.5 text-right">
                      رقم الطالب
                    </label>
                    <input
                      type="tel"
                      name="studentPhone"
                      value={formData.studentPhone}
                      onChange={handleChange}
                      placeholder="ادخل رقمك"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
                      required
                    />
                  </motion.div>

                  {/* Parent Phone */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-zinc-200 mb-1.5 text-right">
                      رقم ولي الأمر
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      placeholder="ادخل ولي أمرك"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
                      required
                    />
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1.5 text-right leading-relaxed">
                      سيتم استخدامه للتواصل مع ولي الأمر بخصوص الاشتراك والتقدم الدراسي.
                    </p>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-zinc-200 mb-1.5 text-right">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ادخل بريدك الإلكتروني"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
                      required
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-zinc-200 mb-1.5 text-right">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="ادخل كلمة المرور"
                        className="w-full px-4 py-3 pl-11 rounded-xl bg-[#0D121D] border border-[#1A2333] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#2ECE95] focus:ring-1 focus:ring-[#2ECE95]/40 transition-all duration-200"
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
                          <span>جاري إنشاء الحساب...</span>
                        </>
                      ) : (
                        <span>إنشاء حساب</span>
                      )}
                    </button>
                  </motion.div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom subtle link (login prompt) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-zinc-500 mt-4"
        >
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="text-[#2ECE95] hover:underline font-medium"
          >
            تسجيل الدخول
          </Link>
        </motion.div>
      </div>

      {/* Right Hero Image Card (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 p-4 lg:p-5 relative items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full min-h-[640px] max-h-[calc(100vh-2.5rem)] rounded-[28px] overflow-hidden border border-white/5 shadow-2xl bg-[#0F1420]"
        >
          {/* Main Visual Image */}
          <Image
            src="/images/auth-student.jpg"
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
    </div>
  );
}

