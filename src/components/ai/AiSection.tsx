
import { useState } from "react";
import { AiMatchingCard } from "@/components/ui/ai-skills/AiMatchingCard";
import { AiResumeParser } from "@/components/ui/ai-skills/AiResumeParser";

interface ResumeAnalysis {
  skills: string[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description?: string;
  }[];
  summary: string;
  recommendations: string[];
}

const AiSection = () => {
  const [resumeText, setResumeText] = useState<string>("");
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleResumeAnalyzed = (text: string, analysis: ResumeAnalysis) => {
    setResumeText(text);
    setResumeAnalysis(analysis);
  };

  const handleResumeReset = () => {
    setResumeText("");
    setResumeAnalysis(null);
  };

  return (
    <section id="ai-match" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Career Development</h2>
          <p className="text-muted-foreground">
            Our advanced AI technology analyzes your skills and background to provide personalized career guidance and job matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AiMatchingCard 
            resumeText={resumeText} 
            resumeAnalysis={resumeAnalysis}
          />
          <AiResumeParser 
            onResumeAnalyzed={handleResumeAnalyzed}
            onResumeReset={handleResumeReset}
          />
        </div>
      </div>
    </section>
  );
};

export default AiSection;
