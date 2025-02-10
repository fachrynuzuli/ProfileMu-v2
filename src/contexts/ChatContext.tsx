import React, { createContext, useContext, useState } from "react";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  status?: MessageStatus;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, sender: "user" | "ai") => Promise<void>;
  clearMessages: () => void;
  updateMessageStatus: (messageId: string, status: MessageStatus) => void;
  isTyping: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      status: "read",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = async (content: string, sender: "user" | "ai") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update status to sent
      updateMessageStatus(newMessage.id, "sent");

      // For AI messages, show typing indicator
      if (sender === "user") {
        setIsTyping(true);
        // Simulate AI typing
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsTyping(false);
      }

      // Update to delivered after a delay
      setTimeout(() => {
        updateMessageStatus(newMessage.id, "delivered");
      }, 1000);

      // Update to read after another delay
      setTimeout(() => {
        updateMessageStatus(newMessage.id, "read");
      }, 2000);
    } catch (error) {
      updateMessageStatus(newMessage.id, "error");
    }
  };

  const updateMessageStatus = (messageId: string, status: MessageStatus) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)),
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        updateMessageStatus,
        isTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
