
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

interface SkillLevel {
  name: string;
  level: number;
  industry: string;
}

interface AiMatchingCardProps {
  className?: string;
}

export const AiMatchingCard: React.FC<AiMatchingCardProps> = ({ className }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState<SkillLevel[]>([]);

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentProgress(0);
    setMatchedSkills([]);

    // Simulate AI processing with progress updates
    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setIsSearching(false);
            setMatchedSkills([
              { name: "Data Analysis", level: 85, industry: "Tech" },
              { name: "Project Management", level: 72, industry: "Business" },
              { name: "UX Design", level: 68, industry: "Creative" },
              { name: "Marketing Strategy", level: 60, industry: "Marketing" }
            ]);
          }, 500);
        }
        return newProgress;
      });
    }, 100);
  };

  const handleReset = () => {
    setIsComplete(false);
    setMatchedSkills([]);
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

        {!isSearching && !isComplete ? (
          <>
            <p className="text-muted-foreground mb-6">
              Our AI will analyze your skills and experience to find the best career matches for you.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-secondary/50 rounded-lg flex flex-col items-center text-center">
                <GraduationCap className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Skill Analysis</h4>
                <p className="text-sm text-muted-foreground">Evaluates your current abilities</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg flex flex-col items-center text-center">
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Job Matching</h4>
                <p className="text-sm text-muted-foreground">Finds relevant opportunities</p>
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full">Start Career Analysis</Button>
          </>
        ) : isSearching ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-t-primary border-secondary animate-spin"></div>
              <h4 className="font-medium">Analyzing Your Profile</h4>
              <p className="text-sm text-muted-foreground mb-4">Our AI is finding your best career matches</p>
            </div>
            <Progress value={currentProgress} className="mb-2" />
            <p className="text-xs text-muted-foreground">{currentProgress}% Complete</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-6">
              <Badge className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-600 font-medium">Analysis Complete!</p>
            </div>
            
            <h4 className="font-semibold mb-4">Your Top Skills:</h4>
            <div className="space-y-4 mb-6">
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

            <div className="bg-secondary/50 p-4 rounded-lg mb-6">
              <h5 className="font-medium mb-2">Career Recommendations:</h5>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span>Data Analyst</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span>Project Manager</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span>UX Researcher</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">Reset</Button>
              <Button className="flex-1">View Full Report</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
