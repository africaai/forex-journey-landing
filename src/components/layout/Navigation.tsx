import { Link } from "react-router-dom";
import { Menu, List, Shield } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Navigation = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const sessionToken = localStorage.getItem('sessionToken');
      if (!sessionToken) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_WEBHOOK_BASE_URL}/verify-admin`, {
          headers: {
            'Authorization': `Bearer ${sessionToken}`
          }
        });
        setIsAdmin(response.ok);
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    // Refresh admin status after successful signup
    checkAdminStatus();
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <Menubar className="border-none bg-transparent justify-between items-center">
          <div className="flex items-center space-x-4">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer hover:bg-gray-100 transition-colors md:hidden data-[state=open]:bg-gray-100">
                <Menu className="h-6 w-6" />
              </MenubarTrigger>
              <MenubarContent className="min-w-[200px]">
                <Link to="/" className="block">
                  <MenubarItem className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Home
                  </MenubarItem>
                </Link>
                <Link to="/courses" className="block">
                  <MenubarItem className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Courses
                  </MenubarItem>
                </Link>
                <Link to="/events" className="block">
                  <MenubarItem className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Events
                  </MenubarItem>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block">
                    <MenubarItem className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Panel
                    </MenubarItem>
                  </Link>
                )}
              </MenubarContent>
            </MenubarMenu>
            
            <div className="flex items-center space-x-2">
              <List className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-primary">Forex Journey</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-gray-600 hover:text-primary transition-colors">
                Courses
              </Link>
              <Link to="/events" className="text-gray-600 hover:text-primary transition-colors">
                Events
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Panel
                </Link>
              )}
            </nav>

            {/* Auth Buttons */}
            <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mr-2">Sign Up</Button>
              </DialogTrigger>
              <DialogContent>
                <SignUpForm onSuccess={handleSignUpSuccess} />
              </DialogContent>
            </Dialog>
            <Button>Login</Button>
          </div>
        </Menubar>
      </div>
    </header>
  );
};

export default Navigation;