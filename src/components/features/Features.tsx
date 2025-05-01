
import { Card } from "@/components/ui/card";
import { Check, BarChart, Award, Users, Brain, Target } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Skill Analysis",
      description: "Our advanced AI analyzes your skills and matches them with industry requirements.",
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "Custom learning journeys designed for your specific career goals and skill gaps.",
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Visualize your growth with interactive dashboards and skill progression metrics.",
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description: "Earn recognized credentials that demonstrate your expertise to employers.",
    },
    {
      icon: Users,
      title: "Peer Learning",
      description: "Connect with others on similar career paths to share insights and resources.",
    },
    {
      icon: Check,
      title: "Job Matching",
      description: "Get matched with opportunities that align with your skills and career aspirations.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Elevate Your Career with Smart Features</h2>
          <p className="text-muted-foreground">
            SkillHorizon uses cutting-edge AI to provide a comprehensive career development
            experience that adapts to your unique journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
