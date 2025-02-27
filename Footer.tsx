
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-primary">IKIMATA News</h2>
            <p className="text-muted-foreground max-w-md">
              Delivering the latest and most relevant news stories from around the globe.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:contact@ikimata.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Categories</h3>
            <ul className="space-y-3">
              {['Latest', 'Technology', 'Business', 'Culture', 'Science'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@ikimata.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Email Us
                </a>
              </li>
              <li>
                <a href="#feedback" className="text-muted-foreground hover:text-primary transition-colors">
                  Send Feedback
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-center">
            © {new Date().getFullYear()} IKIMATA News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
