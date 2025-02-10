import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Paperclip, Send } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ChatInputProps {
  onSend?: (message: string) => void;
  onAttach?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput = ({
  onSend = () => {},
  onAttach = () => {},
  placeholder = "What would you like to know?",
  disabled = false,
}: ChatInputProps) => {
  const [message, setMessage] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAttach(file);
    }
  };

  return (
    <div className="w-full bg-white p-4 border rounded-lg shadow-sm flex gap-2 items-end">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={handleAttachClick}
              disabled={disabled}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Attach file</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="flex-1"
        disabled={disabled}
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-10 w-10"
              size="icon"
              onClick={handleSend}
              disabled={disabled || !message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ChatInput;
