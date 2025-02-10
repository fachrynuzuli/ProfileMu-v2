import React from "react";
import Sidebar from "./Sidebar";
import ChatInterface from "./ChatInterface";
import { Button } from "./ui/button";
import { Github, Linkedin, Twitter, Briefcase, Calendar } from "lucide-react";

interface HomeProps {
  onSendMessage?: (message: string) => void;
  onAttachFile?: (file: File) => void;
  onProfileCardClick?: (card: any) => void;
  onNavigate?: (path: string) => void;
  isLoading?: boolean;
}

const Home = ({
  onAttachFile = () => {},
  onProfileCardClick = () => {},
  onNavigate = () => {},
  isLoading = false,
}: HomeProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const connectedApps = [
    { icon: <Github className="w-4 h-4" />, name: "GitHub", href: "#" },
    { icon: <Linkedin className="w-4 h-4" />, name: "LinkedIn", href: "#" },
    { icon: <Twitter className="w-4 h-4" />, name: "Twitter", href: "#" },
    { icon: <Briefcase className="w-4 h-4" />, name: "Resume", href: "#" },
    { icon: <Calendar className="w-4 h-4" />, name: "Calendar", href: "#" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onItemClick={onNavigate}
      />
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative ml-0 mr-80">
        {/* Main Chat Area */}
        <div className="max-w-2xl w-full space-y-6 mx-auto">
          <h1 className="text-3xl font-semibold text-center">
            Hey, It's Fachry. Ask me anything!
          </h1>
          <ChatInterface onAttachFile={onAttachFile} isLoading={isLoading} />
        </div>

        {/* Profile Sidebar */}
        <div className="w-80 h-screen fixed right-0 top-0 bg-background border-l p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=fachry"
                alt="Fachry Nuzuli Kamal"
                className="w-24 h-24 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div className="text-center space-y-1 w-full">
              <h2 className="text-xl font-semibold">Fachry Nuzuli Kamal</h2>
              <p className="text-muted-foreground">Product Manager</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">About</h3>
              <p className="text-sm text-muted-foreground">
                Passionate about building innovative products and leading
                cross-functional teams to deliver impactful solutions.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">
                Jakarta, Indonesia
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Connected Apps</h3>
              {connectedApps.map((app) => (
                <Button
                  key={app.name}
                  variant="secondary"
                  className="w-full justify-start h-10 text-sm font-normal bg-secondary/50 hover:bg-secondary"
                  asChild
                >
                  <a href={app.href} className="flex items-center gap-3">
                    {app.icon}
                    {app.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span>20 messages remaining</span>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90">
                Upgrade
              </button>
            </div>
            <div className="mt-2 w-full h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="w-0 h-full bg-primary"
                style={{ width: "0%" }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              0 of 20 messages used this month
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
