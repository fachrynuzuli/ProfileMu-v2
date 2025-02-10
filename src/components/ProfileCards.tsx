import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MessageCircle, Users, Globe, MapPin } from "lucide-react";

interface ProfileCardProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  messageCount?: number;
  followerCount?: number;
}

const ProfileCards = ({
  name = "Fachry Nuzuli",
  role = "Product Manager",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=fachry",
  location = "Jakarta, Indonesia",
  website = "fachry.dev",
  messageCount = 1234,
  followerCount = 567,
}: ProfileCardProps) => {
  return (
    <Card className="w-full bg-background">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={avatarUrl}
            alt={name}
            className="w-16 h-16 rounded-full border-2 border-border"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {website}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">
                  {messageCount.toLocaleString()} messages
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  {followerCount.toLocaleString()} followers
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCards;
