
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, Check, AlertTriangle } from "lucide-react";
import { analyzeResumeWithGemini, extractTextFromFile } from "@/utils/geminiApi";
import { useToast } from "@/hooks/use-toast";

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

interface AiResumeParserProps {
  className?: string;
}

export const AiResumeParser: React.FC<AiResumeParserProps> = ({ className }) => {
  const [stage, setStage] = useState<'upload' | 'analyzing' | 'complete'>('upload');
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setStage('analyzing');
    setProgress(0);
    
    try {
      // Simulate progress while processing
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
          }
          return newProgress;
        });
      }, 300);
      
      // Extract text from file
      const resumeText = await extractTextFromFile(file);
      
      // Analyze with Gemini API
      const result = await analyzeResumeWithGemini(resumeText);
      
      clearInterval(progressInterval);
      setProgress(100);
      setAnalysis(result);
      
      setTimeout(() => {
        setStage('complete');
        toast({
          title: "Resume Analysis Complete",
          description: "Your resume has been successfully analyzed with AI.",
        });
      }, 500);
      
    } catch (error) {
      console.error('Resume analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
      setStage('upload');
      setProgress(0);
    }
  };
  
  const handleReset = () => {
    setStage('upload');
    setFile(null);
    setAnalysis(null);
    setProgress(0);
  };
  
  return (
    <div className={`bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden border border-border ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">AI Resume Parser</h3>
        </div>
        
        {stage === 'upload' && (
          <form onSubmit={handleSubmit}>
            <p className="text-muted-foreground mb-6">
              Upload your resume and our AI will automatically extract your skills and experiences using advanced Gemini AI technology.
            </p>
            
            <div className="border-2 border-dashed border-muted rounded-lg p-6 mb-6 text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-upload" className="cursor-pointer block">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">Drag and drop or click to upload</p>
                <p className="text-sm text-muted-foreground mb-2">Supports PDF, DOC, DOCX, TXT</p>
                {file && (
                  <div className="mt-3 py-1 px-3 bg-secondary inline-flex items-center rounded text-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    {file.name}
                  </div>
                )}
              </label>
            </div>
            
            <Button type="submit" className="w-full" disabled={!file}>
              Analyze Resume with AI
            </Button>
          </form>
        )}
        
        {stage === 'analyzing' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-t-primary border-secondary animate-spin"></div>
              <h4 className="font-medium">Analyzing Your Resume</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our Gemini AI is extracting skills and experience from your document
              </p>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-xs text-muted-foreground">{progress}% Complete</p>
          </div>
        )}
        
        {stage === 'complete' && analysis && (
          <div>
            <div className="flex items-center mb-6">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-600 font-medium">AI Analysis Complete!</p>
            </div>
            
            <div className="space-y-6 mb-6">
              <div>
                <h4 className="font-semibold mb-2">Professional Summary</h4>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-sm">{analysis.summary}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Extracted Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="py-1 px-3 bg-secondary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Education</h4>
                <div className="space-y-2">
                  {analysis.education.map((edu, idx) => (
                    <div key={idx} className="bg-secondary/50 p-3 rounded-lg">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm">{edu.institution}, {edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Experience</h4>
                <div className="space-y-3">
                  {analysis.experience.map((exp, idx) => (
                    <div key={idx} className="bg-secondary/50 p-3 rounded-lg">
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-sm">{exp.company}, {exp.period}</p>
                      {exp.description && <p className="text-xs text-muted-foreground mt-1">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Career Recommendations</h4>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 flex">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
              <p className="text-sm text-amber-800 dark:text-amber-400">
                AI analysis provided by Gemini. Please review and verify the extracted information for accuracy.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">Upload New</Button>
              <Button className="flex-1">Update Profile</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
