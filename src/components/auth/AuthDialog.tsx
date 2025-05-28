
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'signin' | 'signup';
}

const AuthDialog = ({ open, onOpenChange, defaultTab = 'signin' }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'signin') {
      const success = login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        onOpenChange(false);
        // Reset form
        setEmail('');
        setPassword('');
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Try: avinashvalavoju@gmail.com / 12345",
          variant: "destructive",
        });
      }
    } else {
      const success = signup(email, password, name);
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to SkillHorizon!",
        });
        onOpenChange(false);
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === 'signin' ? 'default' : 'outline'}
            onClick={() => setActiveTab('signin')}
            className="flex-1"
          >
            Sign In
          </Button>
          <Button
            variant={activeTab === 'signup' ? 'default' : 'outline'}
            onClick={() => setActiveTab('signup')}
            className="flex-1"
          >
            Sign Up
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {activeTab === 'signin' && (
            <div className="text-sm text-muted-foreground">
              Demo credentials: avinashvalavoju@gmail.com / 12345
            </div>
          )}

          <Button type="submit" className="w-full">
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
