import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeBanner from "@/components/landing/MarqueeBanner";
import Whyme from "@/components/landing/Whyme";
import CoursesSection from "@/components/landing/Coursessection";
import LandingQuestions from "@/components/landing/LandingQuestions";
import DemoVideo from "@/components/landing/DemoVideo";
import WhoIam from "@/components/landing/WhoIam";
import QA from "@/components/landing/QA";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#0B101B] text-[#F0FDF4] font-sans selection:bg-[#2ECE95] selection:text-[#0B101B]">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBanner />
        <Whyme />
        <CoursesSection />
        <LandingQuestions />
        <DemoVideo />
        <WhoIam />
        <QA />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
