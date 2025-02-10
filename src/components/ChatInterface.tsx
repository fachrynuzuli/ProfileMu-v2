import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import ChatInput from "./ChatInput";
import SuggestionChips from "./SuggestionChips";
import { useChat, Message, MessageStatus } from "../contexts/ChatContext";
import { Check, CheckCheck, Clock, AlertCircle, Loader2 } from "lucide-react";

interface ChatInterfaceProps {
  onAttachFile?: (file: File) => void;
  isLoading?: boolean;
}

const MessageStatusIndicator = ({ status }: { status?: MessageStatus }) => {
  switch (status) {
    case "sending":
      return <Clock className="h-3 w-3 text-muted-foreground animate-pulse" />;
    case "sent":
      return <Check className="h-3 w-3 text-muted-foreground" />;
    case "delivered":
      return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
    case "read":
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    case "error":
      return <AlertCircle className="h-3 w-3 text-destructive" />;
    default:
      return null;
  }
};

const TypingIndicator = () => (
  <div className="flex space-x-2 p-4 bg-secondary rounded-lg max-w-[100px]">
    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
  </div>
);

const ChatInterface = ({
  onAttachFile = () => {},
  isLoading = false,
}: ChatInterfaceProps) => {
  const { messages, addMessage, isTyping } = useChat();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = async (message: string) => {
    await addMessage(message, "user");
    // Simulate AI response
    setTimeout(async () => {
      await addMessage(`I received your message: ${message}`, "ai");
    }, 2000);
  };

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg overflow-hidden mx-auto">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"} mb-4`}
            >
              <Card
                className={`max-w-[70%] p-4 ${message.sender === "ai" ? "bg-secondary" : "bg-primary text-primary-foreground"}`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2 gap-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.sender === "user" && (
                    <MessageStatusIndicator status={message.status} />
                  )}
                </div>
              </Card>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <TypingIndicator />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="space-y-4">
          <SuggestionChips
            onChipClick={(suggestion) => handleSendMessage(suggestion.text)}
          />
          <ChatInput
            onSend={handleSendMessage}
            onAttach={onAttachFile}
            disabled={isLoading || isTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
