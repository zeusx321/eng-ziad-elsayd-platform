export const cardsData = [
  {
    id: 1,
    title: "شرح بسيط",
    subtitle: "نفهم الفكرة الأول، وبعدها نكتب الكود.",
    icon: "🎯",
    position: "left",
  },
  {
    id: 2,
    title: "تطبيق عملي",
    subtitle: "كل مفهوم هتتعلمه هتطبقه بإيدك.",
    icon: "💻",
    position: "right",
  },
  {
    id: 3,
    title: "حل المشكلات",
    subtitle: "هدفنا تعرف تفكر وتحل.",
    icon: "🧠",
    position: "left",
  },
];

export const phrases = ["بكالوريا", "تانية ثانوي", "أولى ثانوي", "برمجة"];

export const gradeLabels = {
  grade_1: "1 ثانوي",
  grade_2: "2 ثانوي",
  grade_3: "3 ثانوي",
};

export const trackLabels = {
  general: "عام عربي",
  languages: "لغات",
};

export const fallbackCourses = [
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

export const quizQuestions = [
  {
    id: 1,
    label: "السؤال الأول",
    title: "ما المقصود بالبرمجة؟",
    options: [
      { key: "A", text: "تصميم الصور فقط" },
      { key: "B", text: "كتابة أوامر للكمبيوتر لتنفيذ مهام معينة" },
      { key: "C", text: "تصفح الإنترنت" },
      { key: "D", text: "تشغيل الألعاب فقط" },
    ],
    correctKey: "B",
  },
  {
    id: 2,
    label: "السؤال الثاني",
    title: "ما وظيفة المتغير (Variable) في البرمجة؟",
    options: [
      { key: "A", text: "تخزين البيانات" },
      { key: "B", text: "حذف البرامج" },
      { key: "C", text: "زيادة سرعة الإنترنت" },
      { key: "D", text: "إيقاف الكمبيوتر" },
    ],
    correctKey: "A",
  },
  {
    id: 3,
    label: "السؤال الثالث",
    title: "ماذا تعني كلمة Input في البرمجة؟",
    options: [
      { key: "A", text: "إخراج البيانات" },
      { key: "B", text: "إدخال البيانات" },
      { key: "C", text: "حذف البيانات" },
      { key: "D", text: "إغلاق البرنامج" },
    ],
    correctKey: "B",
  },
  {
    id: 4,
    label: "السؤال الرابع",
    title: "ما المقصود بالخوارزمية (Algorithm)؟",
    options: [
      { key: "A", text: "مجموعة خطوات مرتبة لحل مشكلة" },
      { key: "B", text: "جهاز لتخزين البيانات" },
      { key: "C", text: "نوع من أنواع الكمبيوتر" },
      { key: "D", text: "برنامج لتصميم الصور" },
    ],
    correctKey: "A",
  },
  {
    id: 5,
    label: "السؤال الخامس",
    title: "أيٌّ من التالي يُعتبر لغة برمجة؟",
    options: [
      { key: "A", text: "HTML" },
      { key: "B", text: "CSS" },
      { key: "C", text: "JavaScript" },
      { key: "D", text: "Photoshop" },
    ],
    correctKey: "C",
  },
];

export const faqQuestions = [
  {
    id: 1,
    question: "هل الكورسات مناسبة للمبتدئين؟",
    answer:
      "أيوه، الكورسات مناسبة جدًا للمبتدئين، وهنبدأ معاك من الأساسيات خطوة بخطوة، لحد ما تفهم المنهج وتقدر تحل الأسئلة بنفسك.",
  },
  {
    id: 2,
    question: "هل محتاج خبرة سابقة في البرمجة؟",
    answer:
      "لأ، مش محتاج أي خبرة سابقة. كل اللي محتاجه إنك تكون مستعد تتعلم وتطبّق معانا، وإحنا هنشرحلك كل حاجة من البداية.",
  },
  {
    id: 3,
    question: "هقدر أشوف الدروس في أي وقت؟",
    answer:
      "أيوه، تقدر تشوف الدروس المسجلة في أي وقت يناسبك، وتعيد أي درس أكتر من مرة علشان تراجع وتفهم كويس.",
  },
  {
    id: 4,
    question: "هل فيه تدريبات بعد كل درس؟",
    answer:
      "أيوه، هتلاقي تدريبات وأسئلة بعد الدروس علشان تختبر فهمك وتطبّق على اللي اتعلمته، وتستعد بشكل أفضل للامتحانات.",
  },
  {
    id: 5,
    question: "إزاي أشترك في الكورس؟",
    answer:
      "اختار الكورس المناسب ليك من المنصة، واتبع خطوات الاشتراك الموضحة. وبعد إتمام الاشتراك وتأكيد الدفع، هتقدر توصل للمحتوى الخاص بالكورس.",
  },
  {
    id: 6,
    question: "هل أقدر أتابع تقدمي في الكورس؟",
    answer:
      "أيوه، تقدر تتابع الدروس اللي خلصتها وتعرف وصلت لفين في الكورس، علشان تنظم مذاكرتك وتكمل خطتك بسهولة.",
  },
];

