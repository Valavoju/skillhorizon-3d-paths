
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  resumeScore: number;
  jobs: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (email: string, password: string, name: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Check for your specific credentials
    if (email === 'avinashvalavoju@gmail.com' && password === '12345') {
      const userData = {
        email: 'avinashvalavoju@gmail.com',
        name: 'Avinash Valavoju',
        resumeScore: 85,
        jobs: ['Software Engineer at TechCorp', 'Frontend Developer at StartupXYZ', 'Full Stack Developer at InnovateLab']
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string, name: string) => {
    // For demo purposes, allow any signup but give default data
    const userData = {
      email,
      name,
      resumeScore: 70,
      jobs: ['Entry Level Developer', 'Junior Frontend Developer']
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing session on load
  useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
