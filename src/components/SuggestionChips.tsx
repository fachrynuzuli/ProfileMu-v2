import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SuggestionChip {
  id: string;
  text: string;
  tooltip?: string;
}

interface SuggestionChipsProps {
  suggestions?: SuggestionChip[];
  onChipClick?: (suggestion: SuggestionChip) => void;
}

const defaultSuggestions: SuggestionChip[] = [
  {
    id: "1",
    text: "What's your product management philosophy?",
    tooltip: "Learn about PM approach",
  },
  {
    id: "2",
    text: "Tell me about the FinTech project",
    tooltip: "Digital wallet redesign details",
  },
  {
    id: "3",
    text: "Healthcare platform challenges?",
    tooltip: "Telemedicine project insights",
  },
  {
    id: "4",
    text: "E-commerce optimization results?",
    tooltip: "Marketplace metrics",
  },
  {
    id: "5",
    text: "Team leadership experience?",
    tooltip: "Management style",
  },
  {
    id: "6",
    text: "Product metrics you track?",
    tooltip: "KPI framework",
  },
];

const SuggestionChips = ({
  suggestions = defaultSuggestions,
  onChipClick,
}: SuggestionChipsProps) => {
  const handleClick = (suggestion: SuggestionChip) => {
    if (onChipClick) {
      onChipClick(suggestion);
    }
  };

  return (
    <div className="w-full bg-white p-4">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <TooltipProvider>
            {suggestions.map((suggestion) => (
              <Tooltip key={suggestion.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 px-4 flex flex-col items-start text-left whitespace-normal"
                    onClick={() => handleClick(suggestion)}
                  >
                    {suggestion.text}
                  </Button>
                </TooltipTrigger>
                {suggestion.tooltip && (
                  <TooltipContent>
                    <p>{suggestion.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SuggestionChips;
