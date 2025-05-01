
import { QuizCard } from "@/components/ui/quiz/QuizCard";
import SkillModel from "@/components/3d/SkillModel";

const QuizSection = () => {
  // Sample quiz data
  const quizData = {
    title: "Career Development Fundamentals",
    questions: [
      {
        id: "q1",
        question: "Which of the following is most important when identifying your career goals?",
        options: [
          { id: "q1a", text: "Following the highest paying path", isCorrect: false },
          { id: "q1b", text: "Aligning with your personal values and interests", isCorrect: true },
          { id: "q1c", text: "Choosing what your friends are doing", isCorrect: false },
          { id: "q1d", text: "Selecting the easiest career path", isCorrect: false },
        ],
        explanation: "Career satisfaction is highest when your career aligns with your personal values, strengths, and interests. This alignment leads to greater motivation and fulfillment."
      },
      {
        id: "q2",
        question: "What is the best approach to skill development?",
        options: [
          { id: "q2a", text: "Focus only on technical skills", isCorrect: false },
          { id: "q2b", text: "Develop only soft skills", isCorrect: false },
          { id: "q2c", text: "Balance both technical and soft skills development", isCorrect: true },
          { id: "q2d", text: "Learn as many skills as possible simultaneously", isCorrect: false },
        ],
        explanation: "A balanced approach to skill development that includes both technical and soft skills creates a well-rounded professional profile that's attractive to employers across industries."
      },
      {
        id: "q3",
        question: "How often should you reassess your career development plan?",
        options: [
          { id: "q3a", text: "Once in your career", isCorrect: false },
          { id: "q3b", text: "Every 5-10 years", isCorrect: false },
          { id: "q3c", text: "Regularly, at least annually", isCorrect: true },
          { id: "q3d", text: "Only when forced to change jobs", isCorrect: false },
        ],
        explanation: "Regular reassessment of your career plan, at least annually, allows you to adapt to changing industry trends, personal circumstances, and growing self-awareness."
      },
    ]
  };

  return (
    <section id="learning" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Interactive Learning Experience</h2>
          <p className="text-muted-foreground">
            Engage with our gamified quizzes and interactive learning modules to accelerate your skill development and track your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="perspective">
            <div className="lg:h-[500px] relative">
              <div className="absolute inset-0 preserve-3d">
                <SkillModel className="h-full" />
              </div>
            </div>
          </div>
          
          <div>
            <QuizCard 
              title={quizData.title} 
              questions={quizData.questions} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
