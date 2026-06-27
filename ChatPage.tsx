import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { mockChats } from '../data/mockData';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { WelcomeScreen } from '../components/chat/WelcomeScreen';
// ScrollArea replaced with native div

interface ChatPageProps {
  chatId?: string;
}

export function ChatPage({ chatId }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) {
      const chat = mockChats.find((c) => c.id === chatId);
      if (chat) {
        setMessages(chat.messages);
      }
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(content),
        timestamp: new Date(),
        sql: generateSql(content),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    handleSend(text);
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-auto scrollbar-thin">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestion={handleSuggestion} />
        ) : (
          <div>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="py-6 bg-dark-50 dark:bg-dark-900/50">
                <div className="mx-auto max-w-3xl px-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oracle-600">
                      <div className="h-4 w-4 animate-pulse rounded-full bg-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-dark-200 dark:bg-dark-800" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-dark-200 dark:bg-dark-800" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-dark-200 dark:bg-dark-800" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

function generateResponse(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('menu')) {
    return 'Here are the active menus in your Oracle database. I have generated the SQL query to retrieve all active menu items with their parent relationships. You can run this query directly or save it for later use.';
  }
  if (lower.includes('duplicate')) {
    return 'I analyzed the NOTIFICATIONS table for duplicate records. There are potential duplicates grouped by notification_type and recipient_id within the last 7 days. The generated SQL will help you identify and resolve these duplicates.';
  }
  if (lower.includes('package') || lower.includes('pkg')) {
    return 'The HR_EMPLOYEE_PKG package is a well-structured PL/SQL package containing procedures and functions for employee management. It has valid status and is actively used in your application.';
  }
  if (lower.includes('index')) {
    return 'Based on query patterns and table statistics, I recommend creating an index on the ORDERS table. This could improve query performance by up to 40% for filtered lookups.';
  }
  if (lower.includes('view')) {
    return 'The V_EMPLOYEE_DETAILS view joins multiple underlying tables. The analysis shows good performance with proper indexes, but there is a potential optimization opportunity on the department lookup.';
  }
  if (lower.includes('trigger')) {
    return 'The TRG_AUDIT_LOG trigger is firing correctly on INSERT and UPDATE operations. It captures audit information efficiently without significant performance overhead.';
  }
  return 'I have analyzed your request and generated the appropriate SQL query. You can review, copy, save, or execute it directly from the code block below.';
}

function generateSql(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('menu')) {
    return `SELECT m.menu_id,
       m.menu_name,
       p.menu_name AS parent_menu,
       m.status,
       m.created_date
FROM app_menus m
LEFT JOIN app_menus p ON m.parent_menu_id = p.menu_id
WHERE m.status = 'ACTIVE'
ORDER BY COALESCE(p.menu_name, m.menu_name), m.menu_name;`;
  }
  if (lower.includes('duplicate')) {
    return `SELECT notification_type,
       recipient_id,
       COUNT(*) AS duplicate_count,
       MIN(created_date) AS first_seen,
       MAX(created_date) AS last_seen
FROM notifications
WHERE created_date >= TRUNC(SYSDATE - 7)
GROUP BY notification_type, recipient_id
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;`;
  }
  if (lower.includes('package') || lower.includes('pkg')) {
    return `SELECT object_name,
       object_type,
       status,
       created,
       last_ddl_time
FROM user_objects
WHERE object_name = 'HR_EMPLOYEE_PKG'
ORDER BY object_type;`;
  }
  if (lower.includes('index')) {
    return `CREATE INDEX idx_orders_customer_date
ON orders(customer_id, order_date)
TABLESPACE users
COMPUTE STATISTICS;`;
  }
  if (lower.includes('view')) {
    return `SELECT view_name,
       text_length,
       text
FROM user_views
WHERE view_name = 'V_EMPLOYEE_DETAILS';`;
  }
  if (lower.includes('trigger')) {
    return `SELECT trigger_name,
       trigger_type,
       triggering_event,
       table_name,
       status
FROM user_triggers
WHERE trigger_name = 'TRG_AUDIT_LOG';`;
  }
  return `SELECT * FROM user_tables WHERE table_name LIKE '%' ORDER BY table_name;`;
}
