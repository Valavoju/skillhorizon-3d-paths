
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CareerPath from "@/components/3d/CareerPath";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your <span className="gradient-text">Future Career</span> With AI-Powered Guidance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              SkillHorizon uses advanced AI to personalize your career development journey, 
              helping you acquire the right skills at the right time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`h-10 w-10 rounded-full border-2 border-background bg-skill-${i % 2 === 0 ? 'purple' : 'blue'}/20 flex items-center justify-center`}
                  >
                    <span className="text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold">1,000+</span> career paths analyzed by our AI
              </div>
            </div>
          </div>
          
          <div className="perspective">
            <div className="preserve-3d animate-float">
              <CareerPath className="w-full h-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
