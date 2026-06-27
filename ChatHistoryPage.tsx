import { useState } from 'react';
import { History, Search, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { mockChats } from '../data/mockData';

export function ChatHistoryPage() {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState(mockChats);

  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Chat History</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Your previous conversations with DataGuru AI</p>
        </div>

        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-dark-300 bg-white pl-9 pr-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((chat) => (
            <Card key={chat.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20">
                      <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-900 dark:text-white">{chat.title}</h3>
                      <p className="text-xs text-dark-500 dark:text-dark-400">
                        {chat.messages.length} messages &middot; {chat.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(chat.id)}>
                      <Trash2 className="h-4 w-4 text-oracle-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <History className="mx-auto mb-4 h-12 w-12 text-dark-300 dark:text-dark-700" />
              <p className="text-dark-500 dark:text-dark-400">No conversations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
