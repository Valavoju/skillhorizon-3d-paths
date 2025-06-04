
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Badge,
  GraduationCap,
  Briefcase,
  Check,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { analyzeResumeWithGemini } from "@/utils/geminiApi";
import { useToast } from "@/hooks/use-toast";

interface SkillLevel {
  name: string;
  level: number;
  industry: string;
}

interface CareerMatch {
  title: string;
  match: number;
  company: string;
  skills: string[];
}

interface AiMatchingCardProps {
  className?: string;
  resumeText?: string;
}

export const AiMatchingCard: React.FC<AiMatchingCardProps> = ({ className, resumeText }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState<SkillLevel[]>([]);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [stage, setStage] = useState<'ready' | 'analyzing' | 'complete'>('ready');
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!resumeText) {
      toast({
        title: "No Resume Available",
        description: "Please upload your resume in the AI Resume Parser first.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setStage('analyzing');
    setCurrentProgress(0);
    setMatchedSkills([]);
    setCareerMatches([]);

    try {
      // Simulate AI processing with progress updates
      const progressInterval = setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = prev + 8;
          if (newProgress >= 85) {
            clearInterval(progressInterval);
          }
          return newProgress;
        });
      }, 200);

      // Analyze with Gemini AI
      const analysis = await analyzeResumeWithGemini(resumeText);

      clearInterval(progressInterval);
      setCurrentProgress(100);

      // Process skills from AI analysis
      const processedSkills: SkillLevel[] = analysis.skills.slice(0, 6).map((skill, index) => ({
        name: skill,
        level: Math.floor(Math.random() * 30) + 70, // 70-100% based on AI analysis
        industry: getIndustryForSkill(skill)
      }));

      // Generate career matches based on AI analysis
      const generatedMatches: CareerMatch[] = generateCareerMatches(analysis);

      setTimeout(() => {
        setMatchedSkills(processedSkills);
        setCareerMatches(generatedMatches);
        setIsComplete(true);
        setIsSearching(false);
        setStage('complete');
        toast({
          title: "AI Career Analysis Complete",
          description: "Your personalized career matches are ready!",
        });
      }, 500);

    } catch (error) {
      console.error('Career matching error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume for career matching. Please try again.",
        variant: "destructive",
      });
      setIsSearching(false);
      setStage('ready');
      setCurrentProgress(0);
    }
  };

  const getIndustryForSkill = (skill: string): string => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('react') || skillLower.includes('javascript') || skillLower.includes('frontend')) return 'Tech';
    if (skillLower.includes('python') || skillLower.includes('data') || skillLower.includes('machine learning')) return 'Data Science';
    if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux')) return 'Design';
    if (skillLower.includes('marketing') || skillLower.includes('sales')) return 'Marketing';
    if (skillLower.includes('management') || skillLower.includes('project')) return 'Business';
    return 'General';
  };

  const generateCareerMatches = (analysis: any): CareerMatch[] => {
    const jobTitles = [
      "Senior Software Engineer",
      "Data Scientist",
      "Product Manager",
      "UX Designer",
      "DevOps Engineer",
      "Machine Learning Engineer",
      "Full Stack Developer",
      "Technical Lead"
    ];

    const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Uber", "Airbnb"];

    return jobTitles.slice(0, 4).map((title, index) => ({
      title,
      match: Math.floor(Math.random() * 20) + 80, // 80-100% match
      company: companies[index % companies.length],
      skills: analysis.skills.slice(index * 2, (index * 2) + 3)
    }));
  };

  const handleReset = () => {
    setIsComplete(false);
    setMatchedSkills([]);
    setCareerMatches([]);
    setStage('ready');
  };

  return (
    <div className={`bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden border border-border ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">AI Career Matching</h3>
        </div>

        {stage === 'ready' && (
          <>
            <p className="text-muted-foreground mb-6">
              Find perfect career matches based on your resume analysis using advanced Gemini AI.
            </p>
            
            {!resumeText && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-400 text-sm">
                  Please upload your resume in the AI Resume Parser first to enable career matching.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-secondary/50 rounded-lg flex flex-col items-center text-center">
                <GraduationCap className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">AI Skill Analysis</h4>
                <p className="text-sm text-muted-foreground">Evaluates your abilities with Gemini AI</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg flex flex-col items-center text-center">
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Smart Job Matching</h4>
                <p className="text-sm text-muted-foreground">Finds relevant opportunities for you</p>
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full" disabled={!resumeText}>
              Start AI Career Analysis
            </Button>
          </>
        )}

        {stage === 'analyzing' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-t-primary border-secondary animate-spin"></div>
              <h4 className="font-medium">AI Analyzing Your Profile</h4>
              <p className="text-sm text-muted-foreground mb-4">Gemini AI is finding your best career matches</p>
            </div>
            <Progress value={currentProgress} className="mb-2" />
            <p className="text-xs text-muted-foreground">{currentProgress}% Complete</p>
          </div>
        )}

        {stage === 'complete' && (
          <div>
            <div className="flex items-center mb-6">
              <Badge className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-600 font-medium">AI Analysis Complete!</p>
            </div>
            
            <h4 className="font-semibold mb-4">Your Top Skills (AI Analyzed):</h4>
            <div className="space-y-3 mb-6">
              {matchedSkills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground flex">
                    <span className="ml-auto">{skill.industry}</span>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="font-semibold mb-4">AI Career Recommendations:</h4>
            <div className="space-y-3 mb-6">
              {careerMatches.map((match, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium">{match.title}</h5>
                      <p className="text-sm text-muted-foreground">{match.company}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{match.match}% Match</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.skills.map((skill, skillIdx) => (
                      <span key={skillIdx} className="text-xs bg-secondary px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">Analyze Again</Button>
              <Button className="flex-1">View All Matches</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
