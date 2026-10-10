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

export interface CourseCardProps {
  course: Course;
  idx?: number;
}

export interface QuestionOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuizQuestion {
  id: number;
  label: string;
  title: string;
  options: QuestionOption[];
  correctKey: "A" | "B" | "C" | "D";
}

export interface QuizSavedResult {
  answers: Record<number, "A" | "B" | "C" | "D">;
  score: number;
  completed: boolean;
}
