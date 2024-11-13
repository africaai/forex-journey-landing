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
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <Menu className="h-6 w-6" />
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/">
                <MenubarItem>Home</MenubarItem>
              </Link>
              <Link to="/courses">
                <MenubarItem>Courses</MenubarItem>
              </Link>
              <Link to="/events">
                <MenubarItem>Events</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
          <div className="ml-4 flex items-center space-x-2">
            <List className="h-6 w-6" />
            <span className="font-semibold">Forex Journey</span>
          </div>
        </Menubar>
      </div>
    </header>
  );
};

export default Navigation;