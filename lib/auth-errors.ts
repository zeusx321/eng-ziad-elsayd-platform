export function getFriendlyErrorMessage(message?: string): string {
  if (!message) return "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.";
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
  }
  if (lower.includes("email not confirmed")) {
    return "يرجى تأكيد بريدك الإلكتروني من خلال الرابط المرسل إليك أولاً.";
  }
  if (
    lower.includes("user already registered") ||
    lower.includes("already registered") ||
    lower.includes("already in use")
  ) {
    return "هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول.";
  }
  if (lower.includes("password should be at least")) {
    return "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.";
  }
  if (lower.includes("rate limit") || lower.includes("too many requests")) {
    return "تم تجاوز عدد المحاولات المسموح بها، يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.";
  }
  if (
    lower.includes("failed to fetch") ||
    lower.includes("network") ||
    lower.includes("timeout") ||
    lower.includes("abort")
  ) {
    return "تعذر الاتصال بالخادم، يرجى التأكد من اتصالك بالإنترنت والمحاولة مجدداً.";
  }
  if (lower.includes("invalid email")) {
    return "صيغة البريد الإلكتروني غير صحيحة.";
  }
  if (lower.includes("signup disabled") || lower.includes("signups not allowed")) {
    return "التسجيل معطل حالياً، يرجى مراجعة إدارة المنصة.";
  }

  return message;
}
