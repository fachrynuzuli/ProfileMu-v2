import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  Home,
  Search,
  BookmarkCheck,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (href: string) => void;
}

const defaultNavItems: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/" },
  {
    icon: <Search className="w-5 h-5" />,
    label: "Discover",
    href: "/discover",
  },
  {
    icon: <BookmarkCheck className="w-5 h-5" />,
    label: "Scouts",
    href: "/scouts",
  },
];

const Sidebar = ({
  isCollapsed = false,
  onToggle = () => {},
  items = defaultNavItems,
  activeItem = "/",
  onItemClick = () => {},
}: SidebarProps) => {
  return (
    <div
      className={cn(
        "h-screen bg-background border-r transition-all duration-300 flex flex-col py-4",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-end px-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-6 w-6"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <nav className="space-y-1 px-2">
            <TooltipProvider delayDuration={0}>
              {items.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeItem === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-11",
                        isCollapsed ? "px-2" : "px-4",
                        activeItem === item.href && "bg-secondary/50",
                      )}
                      onClick={() => onItemClick(item.href)}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>

        {/* Profile Button at Bottom */}
        <div className="px-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-11",
                    isCollapsed ? "px-2" : "px-4",
                  )}
                  onClick={() => onItemClick("/profile")}
                >
                  <User className="w-5 h-5" />
                  {!isCollapsed && <span className="ml-3">Profile</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>Profile</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
