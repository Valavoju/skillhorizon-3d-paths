
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import QuizSection from "@/components/learning/QuizSection";
import AiSection from "@/components/ai/AiSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <QuizSection />
        <AiSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
