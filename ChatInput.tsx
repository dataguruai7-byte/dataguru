import { useState, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-dark-200 bg-white p-4 dark:border-dark-800 dark:bg-dark-950">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="relative flex items-end gap-2 rounded-xl border border-dark-300 bg-white p-2 shadow-sm dark:border-dark-700 dark:bg-dark-900">
          <button
            type="button"
            className="rounded-lg p-2 text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask DataGuru AI about your Oracle database..."
            rows={1}
            disabled={disabled}
            className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none dark:text-dark-100 dark:placeholder:text-dark-500"
            style={{ height: 'auto' }}
          />
          <button
            type="button"
            className="rounded-lg p-2 text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800"
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className={cn(
              'rounded-lg p-2 transition-colors',
              input.trim() && !disabled
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-dark-100 text-dark-400 dark:bg-dark-800 dark:text-dark-500'
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-dark-400 dark:text-dark-500">
          DataGuru AI can make mistakes. Always review generated SQL before executing in production.
        </p>
      </form>
    </div>
  );
}
