import { Link } from "react-router-dom";
import { Menu, List } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Navigation = () => {
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
              </MenubarContent>
            </MenubarMenu>
            
            <div className="flex items-center space-x-2">
              <List className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-primary">Forex Journey</span>
            </div>
          </div>

          {/* Desktop Navigation */}
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
          </nav>
        </Menubar>
      </div>
    </header>
  );
};

export default Navigation;