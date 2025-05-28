
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Briefcase, Star, Code, Brain, Target } from 'lucide-react';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const skills = [
    { name: 'React', level: 'Advanced', category: 'Frontend' },
    { name: 'TypeScript', level: 'Intermediate', category: 'Language' },
    { name: 'Node.js', level: 'Intermediate', category: 'Backend' },
    { name: 'Python', level: 'Advanced', category: 'Language' },
    { name: 'AWS', level: 'Beginner', category: 'Cloud' },
    { name: 'Git', level: 'Advanced', category: 'Tools' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardHeader>
        </Card>

        {/* Resume Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Resume Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-primary">{user.resumeScore}</div>
              <div className="text-sm text-muted-foreground">
                <p>Your resume score is above average!</p>
                <p>Keep improving to reach 90+</p>
              </div>
            </div>
            <div className="mt-4 w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${user.resumeScore}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-500" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <Badge className={`text-xs ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Recommended Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.jobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{job}</h3>
                    <p className="text-sm text-muted-foreground">
                      Match: {90 - index * 5}% • Remote Available
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      New
                    </Badge>
                    <Button size="sm" variant="outline">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Career Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium">Senior Full Stack Developer</h3>
                <p className="text-sm text-muted-foreground">Target: 2024</p>
                <div className="mt-2 w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium">AWS Certification</h3>
                <p className="text-sm text-muted-foreground">Solutions Architect</p>
                <div className="mt-2 w-full bg-secondary rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
