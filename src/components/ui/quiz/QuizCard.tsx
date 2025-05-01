
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

interface QuizCardProps {
  title: string;
  questions: QuizQuestion[];
  className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ title, questions, className }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    setIsAnswered(true);
    const isCorrect = questions[currentQuestion].options.find(
      opt => opt.id === selectedOption
    )?.isCorrect;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Correct!",
        description: "Great job! You got it right.",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Keep learning and try again.",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={cn("skill-card p-6 flex flex-col items-center", className)}>
        <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-muted flex items-center justify-center">
            <span className="text-2xl font-bold">{percentage}%</span>
          </div>
          <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeDasharray={`${percentage * 2.83} 283`} 
              className="text-primary transition-all duration-1000 ease-out"
            />
          </svg>
        </div>
        <p className="text-lg mb-2">Your score: {score} out of {questions.length}</p>
        <p className="text-muted-foreground mb-6 text-center">
          {percentage >= 80 ? "Excellent work! You've mastered this topic." :
           percentage >= 60 ? "Good job! You're getting there." :
           "Keep practicing to improve your score."}
        </p>
        <div className="flex gap-3">
          <Button onClick={handleRestart}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("skill-card p-6", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
      
      <Progress value={progress} className="mb-6" />
      
      <div className="mb-8">
        <h4 className="text-lg mb-4">{questions[currentQuestion].question}</h4>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={cn(
                "w-full py-3 px-4 text-left rounded-md border transition-all duration-200",
                selectedOption === option.id ? "border-primary" : "border-muted",
                isAnswered && selectedOption === option.id && option.isCorrect && "bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-500",
                isAnswered && selectedOption === option.id && !option.isCorrect && "bg-red-100 border-red-500 dark:bg-red-900/20 dark:border-red-500"
              )}
            >
              <div className="flex justify-between items-center">
                <span>{option.text}</span>
                {isAnswered && selectedOption === option.id && (
                  option.isCorrect ? 
                    <Check className="h-5 w-5 text-green-600" /> : 
                    <X className="h-5 w-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {isAnswered && (
        <div className="bg-secondary p-4 rounded-md mb-6">
          <p className="text-sm">{questions[currentQuestion].explanation}</p>
        </div>
      )}
      
      <div className="flex justify-end gap-3">
        {!isAnswered ? (
          <Button 
            onClick={handleCheckAnswer}
            disabled={!selectedOption}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        )}
      </div>
    </div>
  );
};
