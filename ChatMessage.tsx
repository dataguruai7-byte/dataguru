import { cn } from '../../lib/utils';
import { User, Sparkles } from 'lucide-react';
import { Message } from '../../types';
import { CodeBlock } from '../ui/CodeBlock';

interface ChatMessageProps {
  message: Message;
  onRunSql?: (sql: string) => void;
}

export function ChatMessage({ message, onRunSql }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('py-6', isUser ? 'bg-white dark:bg-dark-950' : 'bg-dark-50 dark:bg-dark-900/50')}>
      <div className="mx-auto max-w-3xl px-4">
        <div className={cn('flex gap-4', isUser && 'flex-row-reverse')}>
          <div className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            isUser ? 'bg-primary-600' : 'bg-oracle-600'
          )}>
            {isUser ? (
              <User className="h-4 w-4 text-white" />
            ) : (
              <Sparkles className="h-4 w-4 text-white" />
            )}
          </div>
          <div className={cn('flex-1 space-y-3', isUser && 'text-right')}>
            <div className="text-sm font-medium text-dark-900 dark:text-white">
              {isUser ? 'You' : 'DataGuru AI'}
            </div>
            <div className={cn('text-sm leading-relaxed text-dark-700 dark:text-dark-300', isUser && 'text-right')}>
              {message.content}
            </div>
            {message.sql && (
              <div className={isUser ? 'ml-auto max-w-2xl' : 'max-w-2xl'}>
                <CodeBlock
                  code={message.sql}
                  language="sql"
                  showRun={!isUser}
                  onRun={() => onRunSql?.(message.sql!)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
