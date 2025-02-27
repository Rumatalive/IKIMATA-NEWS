
import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();

    if (!error && data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        description: "Successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleNavClick = (sectionId: string) => {
    // First navigate to home if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false); // Close mobile menu after clicking
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false); // Close mobile menu after clicking
      }
    }
  };

  const navItems = [
    { name: 'Latest', href: 'latest-stories' },
    { name: 'Technology', href: 'technology' },
    { name: 'Business', href: 'business' },
    { name: 'Culture', href: 'culture' },
    { name: 'Science', href: 'science' },
    { name: 'Sports', href: 'sports' },
    { name: 'Entertainment', href: 'entertainment' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary">IKIMATA News</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-link cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
              <>
                <Button onClick={() => navigate('/admin')} variant="ghost">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button onClick={() => navigate('/create-post')} variant="ghost">
                  Create Post
                </Button>
                <Button onClick={handleLogout} variant="ghost">
                  Sign Out
                </Button>
              </>
            ) : user ? (
              <Button onClick={handleLogout} variant="ghost">
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="ghost">
                Sign In
              </Button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary/80 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full px-3 py-2 rounded-md text-base font-medium nav-link text-left"
              >
                {item.name}
              </button>
            ))}
            {isAdmin ? (
              <>
                <Button onClick={() => navigate('/admin')} variant="ghost" className="w-full text-left">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button onClick={() => navigate('/create-post')} variant="ghost" className="w-full text-left">
                  Create Post
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="w-full text-left">
                  Sign Out
                </Button>
              </>
            ) : user ? (
              <Button onClick={handleLogout} variant="ghost" className="w-full text-left">
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="ghost" className="w-full text-left">
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
