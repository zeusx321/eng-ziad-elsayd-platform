"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/constants";
import { QuizQuestion, QuestionOption } from "@/types";

const LOCAL_STORAGE_KEY = "ziad_platform_quiz_results";

export default function LandingQuestions() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedAnswers) setSelectedAnswers(parsed.selectedAnswers);
        if (typeof parsed.currentIdx === "number") setCurrentIdx(parsed.currentIdx);
        if (typeof parsed.isCompleted === "boolean") setIsCompleted(parsed.isCompleted);
        if (typeof parsed.score === "number") setScore(parsed.score);
      }
    } catch (err) {
      console.warn("Could not load quiz progress from localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const dataToSave = {
        currentIdx,
        selectedAnswers,
        isCompleted,
        score,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (err) {
      console.warn("Could not save quiz progress to localStorage:", err);
    }
  }, [currentIdx, selectedAnswers, isCompleted, score, isHydrated]);

  const questionsList = quizQuestions as unknown as QuizQuestion[];
  const currentQuestion: QuizQuestion = questionsList[currentIdx] || questionsList[0];
  const selectedKey = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (key: "A" | "B" | "C" | "D") => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const calculateFinalScore = (answers: Record<number, "A" | "B" | "C" | "D">) => {
    let finalScore = 0;
    questionsList.forEach((q) => {
      if (answers[q.id] === q.correctKey) {
        finalScore += 1;
      }
    });
    return finalScore;
  };

  const handleNext = () => {
    if (!selectedKey) return;

    if (currentIdx < questionsList.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Final Question: Calculate score and show results
      const finalScore = calculateFinalScore(selectedAnswers);
      setScore(finalScore);
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setScore(0);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.warn("Could not clear localStorage:", err);
    }
  };

  const getScoreBadgeMessage = (s: number) => {
    if (s === 5) return "ممتاز جداً! أنت تمتلك خلفية برمجية ممتازة! 🚀";
    if (s >= 3) return "أحسنت! لديك أساسيات جيدة جداً ويمكنك تطويرها معنا! 💪";
    return "بداية رائعة! انضم معنا لتتعلم البرمجة من الصفر بأسلوب عملي! 🌟";
  };

  return (
    <section
      id="quiz-section"
      dir="rtl"
      className="relative py-12 sm:py-18 lg:py-24 bg-[#EFFBF3] text-[#0B101B] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5">
        {/* Header Section */}
        <motion.div
          className="max-w-3xl mb-7 sm:mb-10 flex flex-col items-start gap-3 text-right"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B101B] tracking-tight leading-tight flex items-center justify-start gap-3 text-right">
            <span>شايف إنك تعرف البرمجة؟</span>
            <span className="text-4xl sm:text-5xl">🤔</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mt-1 text-right">
            جاوب على 5 أسئلة سريعة واكتشف مستواك في أساسيات البرمجة.
          </p>
        </motion.div>

        {/* Main Quiz Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full rounded-[32px] sm:rounded-[40px] border border-[#0B101B]/15 p-6 sm:p-10 shadow-sm bg-[#EEFBF3]/90 backdrop-blur-md"
        >
          {!isCompleted ? (
            /* Quiz Questions Step View */
            <div className="flex flex-col gap-6">
              {/* Question Header: Step counter & Question Label */}
              <div className="flex items-center justify-between text-slate-700 text-sm sm:text-base font-semibold border-b border-[#0B101B]/10 pb-4">
                <span className="font-mono text-base sm:text-lg text-slate-500">
                  {currentQuestion.id}/{questionsList.length}
                </span>

                <span className="text-slate-600 font-bold">
                  {currentQuestion.label}
                </span>
              </div>

              {/* Question Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B101B] text-center sm:text-right leading-snug mt-2">
                    {currentQuestion.title}
                  </h3>

                  {/* Options Grid (2 Columns on Desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 my-2">
                    {currentQuestion.options.map((opt: QuestionOption) => {
                      const isSelected = selectedKey === opt.key;

                      return (
                        <button
                          type="button"
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          className={`w-full text-right p-4 sm:p-4.5 rounded-2xl font-bold transition-all duration-200 border-2 flex items-center justify-start gap-2.5 cursor-pointer text-sm sm:text-base ${
                            isSelected
                              ? "bg-[#C1E2CB] border-[#0B101B] text-[#0B101B] shadow-md ring-2 ring-[#0B101B]/10 scale-[1.01]"
                              : "bg-[#DCEDDF] hover:bg-[#D2E7D5] border-transparent text-[#0B101B]"
                          }`}
                        >
                          <span className="font-mono text-slate-700 font-extrabold text-base sm:text-lg">
                            {opt.key}.
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2.5 my-2">
                {questionsList.map((q, idx) => (
                  <span
                    key={q.id}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIdx
                        ? "w-3.5 h-3.5 bg-[#0B101B]"
                        : "w-3 h-3 border border-[#0B101B]/40 bg-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* Action Button: Next or Finish */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedKey}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#0B101B] text-white hover:bg-[#1A2338] font-bold text-base sm:text-lg flex items-center justify-center gap-2 mx-auto transition-all duration-300 shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {currentIdx < questionsList.length - 1 ? (
                  <>
                    <span>التالي</span>
                    <span className="text-xl leading-none">&lt;</span>
                  </>
                ) : (
                  <span>إنهاء</span>
                )}
              </button>
            </div>
          ) : (
            /* Results Screen View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 text-center"
            >
              {/* Score Badge Header */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-5xl sm:text-6xl">
                  {score >= 4 ? "🎉" : score >= 3 ? "👍" : "💡"}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B101B]">
                  نتيجتك في الاختبار: {score} من {questionsList.length}
                </h3>

                <p className="text-base sm:text-lg font-semibold text-emerald-800 bg-emerald-200/70 border border-emerald-500/30 rounded-full px-6 py-2">
                  {getScoreBadgeMessage(score)}
                </p>
              </div>

              {/* Detailed Answers Breakdown */}
              <div className="flex flex-col gap-4 text-right mt-4">
                <h4 className="font-bold text-lg text-[#0B101B]">
                  مراجعة الإجابات:
                </h4>

                {questionsList.map((q) => {
                  const userAnsKey = selectedAnswers[q.id];
                  const isCorrect = userAnsKey === q.correctKey;
                  const correctOption = q.options.find((o) => o.key === q.correctKey);
                  const userOption = q.options.find((o) => o.key === userAnsKey);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl border ${
                        isCorrect
                          ? "bg-emerald-100/80 border-emerald-500/40 text-emerald-950"
                          : "bg-red-100/80 border-red-400/40 text-red-950"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-base sm:text-lg">
                          {q.label}: {q.title}
                        </span>

                        <span className="font-bold text-sm px-3 py-1 rounded-full bg-white/70 shadow-sm">
                          {isCorrect ? "✓ إجابة صحيحة" : "✗ إجابة خاطئة"}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm flex flex-col gap-1 mt-2 font-medium">
                        <p>
                          <span>إجابتك: </span>
                          <span className="font-bold">
                            {userAnsKey}. {userOption?.text || "لم تجب"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-emerald-800">
                            <span>الإجابة الصحيحة: </span>
                            <span className="font-bold">
                              {q.correctKey}. {correctOption?.text}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Restart Button */}
              <button
                type="button"
                onClick={handleRestart}
                className="mt-6 px-9 py-3.5 rounded-full bg-[#0B101B] text-white hover:bg-[#1A2338] font-bold text-base sm:text-lg flex items-center justify-center gap-2 mx-auto transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                <span>إعادة الاختبار</span>
                <span>🔄</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}