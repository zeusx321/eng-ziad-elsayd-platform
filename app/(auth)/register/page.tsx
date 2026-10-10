"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    studentPhone: '',
    parentPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()

  const validateEgyptianPhone = (phone: string) => {
    return /^01[0125][0-9]{8}$/.test(phone)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return

    setError(null)
    setSuccess(false)

    // Validation
    if (!formData.fullName || !formData.studentPhone || !formData.parentPhone || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('جميع الحقول مطلوبة')
      return
    }

    if (!validateEgyptianPhone(formData.studentPhone)) {
      setError('رقم الطالب غير صالح. يجب أن يكون رقم هاتف مصري صحيح.')
      return
    }

    if (!validateEgyptianPhone(formData.parentPhone)) {
      setError('رقم ولي الأمر غير صالح. يجب أن يكون رقم هاتف مصري صحيح.')
      return
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تتكون من 6 أحرف على الأقل')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.studentPhone,
            parent_phone: formData.parentPhone,
          },
          // Adjust email redirect to your appropriate URL if necessary
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4" dir="rtl">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-zinc-50">إنشاء حساب جديد</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-center">
            <h2 className="font-bold text-lg mb-2">تم التسجيل بنجاح!</h2>
            <p className="text-sm">يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">الاسم بالكامل</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">رقم الطالب</label>
              <input
                type="tel"
                name="studentPhone"
                value={formData.studentPhone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                className="w-full px-3 py-2 border rounded-lg text-left dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right rtl:text-right dir-ltr"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">رقم ولي الأمر</label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-zinc-500 mt-1">
                سيتم استخدامه للتواصل مع ولي الأمر بخصوص الاشتراك والتقدم الدراسي.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">تأكيد كلمة المرور</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
