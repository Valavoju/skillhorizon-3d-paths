
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-4">
            <a href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-skill-purple rounded-md rotate-45"></div>
                <div className="absolute inset-1 bg-skill-blue rounded-md rotate-12"></div>
                <div className="absolute inset-2 bg-white dark:bg-card rounded-sm flex items-center justify-center">
                  <span className="text-skill-deep-purple dark:text-skill-light-purple font-bold">S</span>
                </div>
              </div>
              <span className="gradient-text">SkillHorizon</span>
            </a>
            <p className="text-muted-foreground mb-6">
              AI-powered career development platform helping individuals enhance their career readiness through personalized learning paths.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  123 Innovation Drive, San Francisco, CA 94103
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href="tel:+14155550123" className="text-muted-foreground hover:text-primary transition-colors">
                  (415) 555-0123
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href="mailto:info@skillhorizon.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@skillhorizon.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-muted-foreground/20" />
        
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center mt-6 text-sm text-muted-foreground">
          <div>© 2025 SkillHorizon. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
