import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, MessageSquare, Sparkles, Users } from "lucide-react";

interface LandingPageProps {
  onStartChat: () => void;
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-card rounded-xl border shadow-sm"
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const LandingPage = ({ onStartChat }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-semibold text-lg">ProfileMu AI</div>
          <Button variant="outline" onClick={onStartChat}>
            Launch App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-8 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
            Your Digital Twin,
            <br />
            Powered by AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Transform your professional presence with an AI avatar that
            represents you 24/7. Share your knowledge, engage with your
            audience, and scale your impact effortlessly.
          </p>
          <Button
            size="lg"
            onClick={onStartChat}
            className="group px-8 py-6 text-lg"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-32"
        >
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose ProfileMu AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-primary" />}
              title="Natural Conversations"
              description="Engage in fluid, context-aware discussions that feel remarkably human-like. Your avatar learns and adapts to maintain your authentic voice."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="Personalized Responses"
              description="Every interaction is tailored to your expertise and style. Share your knowledge consistently while maintaining your unique perspective."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Scale Your Presence"
              description="Be available to your audience 24/7. Let your AI avatar handle routine interactions while you focus on what matters most."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
