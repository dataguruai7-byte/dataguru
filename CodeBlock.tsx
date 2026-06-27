import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Copy, Check, Play, Save, FileText } from 'lucide-react';
import { Button } from './Button';

interface CodeBlockProps {
  code: string;
  language?: string;
  showRun?: boolean;
  showSave?: boolean;
  className?: string;
  onRun?: () => void;
}

export function CodeBlock({ code, language = 'sql', showRun = true, showSave = true, className, onRun }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn('relative rounded-lg border border-dark-200 bg-dark-950 dark:border-dark-800', className)}>
      <div className="flex items-center justify-between border-b border-dark-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-dark-400" />
          <span className="text-xs font-medium text-dark-400 uppercase">{language}</span>
        </div>
        <div className="flex items-center gap-1">
          {showRun && onRun && (
            <Button variant="ghost" size="sm" onClick={onRun} className="h-7 text-xs text-green-400 hover:text-green-300 hover:bg-green-900/20">
              <Play className="mr-1 h-3 w-3" />
              Run
            </Button>
          )}
          {showSave && (
            <Button variant="ghost" size="sm" onClick={handleSave} className="h-7 text-xs text-primary-400 hover:text-primary-300 hover:bg-primary-900/20">
              <Save className="mr-1 h-3 w-3" />
              {saved ? 'Saved' : 'Save'}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 text-xs text-dark-400 hover:text-dark-300 hover:bg-dark-800">
            {copied ? <Check className="mr-1 h-3 w-3 text-green-400" /> : <Copy className="mr-1 h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code className="text-dark-100">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none pr-4 text-right text-dark-600 w-8 text-xs">{i + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
