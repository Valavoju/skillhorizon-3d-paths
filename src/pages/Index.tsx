
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import QuizSection from "@/components/learning/QuizSection";
import AiSection from "@/components/ai/AiSection";
import UserProfile from "@/components/profile/UserProfile";

const Index = () => {
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Delay loading 3D components to ensure proper initialization
    const timer = setTimeout(() => {
      setIs3DLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Check if we should show profile based on URL hash
  const showProfile = window.location.hash === '#profile' && isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {showProfile ? (
          <div className="pt-20">
            <UserProfile />
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
