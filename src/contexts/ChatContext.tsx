import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Message, MessageStatus } from "../types/chat";

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, sender: "user" | "ai") => Promise<void>;
  clearMessages: () => void;
  updateMessageStatus: (messageId: string, status: MessageStatus) => void;
  isTyping: boolean;
  conversationId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    // Load existing messages
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error loading messages:", error);
        return;
      }

      if (data) {
        setMessages(
          data.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        );
      }
    };

    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [
            ...prev,
            { ...newMessage, timestamp: new Date(newMessage.timestamp) },
          ]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const addMessage = async (content: string, sender: "user" | "ai") => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender,
      timestamp: new Date(),
      status: "sending",
      conversation_id: conversationId,
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const { error } = await supabase.from("messages").insert([
        {
          id: newMessage.id,
          content: newMessage.content,
          sender: newMessage.sender,
          status: "sent",
          conversation_id: newMessage.conversation_id,
        },
      ]);

      if (error) throw error;

      updateMessageStatus(newMessage.id, "sent");

      if (sender === "user") {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsTyping(false);
      }

      setTimeout(() => {
        updateMessageStatus(newMessage.id, "delivered");
      }, 1000);

      setTimeout(() => {
        updateMessageStatus(newMessage.id, "read");
      }, 2000);
    } catch (error) {
      console.error("Error adding message:", error);
      updateMessageStatus(newMessage.id, "error");
    }
  };

  const updateMessageStatus = async (
    messageId: string,
    status: MessageStatus,
  ) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ status })
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)),
      );
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const clearMessages = async () => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("conversation_id", conversationId);

      if (error) throw error;

      setMessages([]);
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        updateMessageStatus,
        isTyping,
        conversationId,
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
