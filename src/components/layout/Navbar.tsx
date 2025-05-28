import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  GraduationCap, 
  LayoutDashboard,
  Menu, 
  X,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthDialog from "@/components/auth/AuthDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'signin' | 'signup'>('signin');
  const isMobile = useIsMobile();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Features", href: "#features", icon: LayoutDashboard },
    { name: "Learning", href: "#learning", icon: Book },
    { name: "AI Career Match", href: "#ai-match", icon: GraduationCap },
  ];

  const handleSignIn = () => {
    setAuthDialogTab('signin');
    setAuthDialogOpen(true);
  };

  const handleGetStarted = () => {
    setAuthDialogTab('signin');
    setAuthDialogOpen(true);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 bg-skill-purple rounded-md rotate-45"></div>
              <div className="absolute inset-1 bg-skill-blue rounded-md rotate-12"></div>
              <div className="absolute inset-2 bg-white dark:bg-background rounded-sm flex items-center justify-center">
                <span className="text-skill-deep-purple dark:text-skill-light-purple font-bold">S</span>
              </div>
            </div>
            <span className="gradient-text">SkillHorizon</span>
          </a>

          {!isMobile ? (
            <nav className="flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Welcome, {user.name.split(' ')[0]}</span>
                    <Button variant="outline" size="sm" onClick={handleProfileClick}>
                      Profile
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSignIn}>
                      Sign In
                    </Button>
                    <Button size="sm" onClick={handleGetStarted}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          ) : (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 top-[60px] bg-background z-40 animate-fade-in">
            <nav className="container py-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-lg flex items-center gap-2 p-3 rounded-md hover:bg-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 mt-4">
                {isAuthenticated && user ? (
                  <div className="text-center">
                    <p className="mb-2">Welcome, {user.name}</p>
                    <Button className="w-full" onClick={() => {
                      setMobileMenuOpen(false);
                      handleProfileClick();
                    }}>
                      View Profile
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" className="justify-start" onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignIn();
                    }}>
                      <User className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                    <Button className="justify-start" onClick={() => {
                      setMobileMenuOpen(false);
                      handleGetStarted();
                    }}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        defaultTab={authDialogTab}
      />
    </>
  );
};

export default Navbar;
