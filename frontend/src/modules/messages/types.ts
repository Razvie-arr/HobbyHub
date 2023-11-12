interface Message {
    id: string;
    thread_id: string;
    sender_id: string;
    text: string;
    sent_at: string;
  }
  
  interface Thread {
    id: string;
    users: string[];
    thread_read: boolean;
    messages: Message[];
    last_message_at: string;
    lastMessage: Message | null;
  }