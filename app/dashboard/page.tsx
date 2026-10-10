import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Always use getUser() on the server to securely fetch the user session 
  // directly from the Supabase API, ensuring the token is valid and not spoofed.
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const user = data.user
  
  // Extract the full name from the user metadata we provided during signup
  const fullName = user.user_metadata?.full_name || 'طالب'

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow p-8 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          مرحباً، {fullName}! 👋
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          أهلاً بك في لوحة تحكم الطالب الخاصة بك. سيتم عرض مقرراتك الدراسية هنا قريباً.
        </p>
      </div>
    </div>
  )
}
