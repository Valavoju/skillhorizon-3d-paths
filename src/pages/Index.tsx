
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import QuizSection from "@/components/learning/QuizSection";
import AiSection from "@/components/ai/AiSection";

const Index = () => {
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  useEffect(() => {
    // Delay loading 3D components to ensure proper initialization
    const timer = setTimeout(() => {
      setIs3DLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {is3DLoaded ? (
          <>
            <Hero />
            <Features />
            <QuizSection />
            <AiSection />
          </>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-pulse text-xl">Loading experience...</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
