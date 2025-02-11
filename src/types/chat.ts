export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  status?: MessageStatus;
  conversation_id: string;
}

export interface Conversation {
  id: string;
  created_at: Date;
  title?: string;
  last_message?: string;
}
