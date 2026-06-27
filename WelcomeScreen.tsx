import {
  MessageSquare, GitMerge, Search, BarChart3, Eye, Package, Zap, Sparkles
} from 'lucide-react';

const suggestions = [
  { icon: MessageSquare, text: 'Show active menus' },
  { icon: Search, text: 'Find duplicate notifications' },
  { icon: Package, text: 'Explain HR_EMPLOYEE_PKG' },
  { icon: BarChart3, text: 'Suggest indexes for ORDERS table' },
  { icon: Eye, text: 'Analyze V_EMPLOYEE_DETAILS view' },
  { icon: Zap, text: 'Review TRG_AUDIT_LOG trigger' },
];

const tools = [
  { icon: GitMerge, label: 'Join Finder', desc: 'Discover table relationships' },
  { icon: Search, label: 'Duplicate Detector', desc: 'Find duplicate records' },
  { icon: BarChart3, label: 'Index Advisor', desc: 'Get index recommendations' },
  { icon: Eye, label: 'View Analyzer', desc: 'Analyze view performance' },
];

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

export function WelcomeScreen({ onSuggestion }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-dark-900 dark:text-white">
          Welcome to DataGuru AI
        </h1>
        <p className="mb-8 text-dark-500 dark:text-dark-400">
          Your Oracle Database Architect & SQL Copilot. Ask me anything about your database.
        </p>

        <div className="mb-10 grid gap-3 sm:grid-cols-2">
          {suggestions.map((s) => (
            <button
              key={s.text}
              onClick={() => onSuggestion(s.text)}
              className="flex items-center gap-3 rounded-xl border border-dark-200 bg-white p-4 text-left transition-all hover:border-primary-300 hover:shadow-md dark:border-dark-800 dark:bg-dark-900 dark:hover:border-primary-700"
            >
              <s.icon className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-dark-700 dark:text-dark-300">{s.text}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {tools.map((t) => (
            <div
              key={t.label}
              className="rounded-xl border border-dark-200 bg-dark-50 p-4 text-center dark:border-dark-800 dark:bg-dark-900"
            >
              <t.icon className="mx-auto mb-2 h-6 w-6 text-dark-500 dark:text-dark-400" />
              <div className="text-sm font-medium text-dark-900 dark:text-white">{t.label}</div>
              <div className="mt-1 text-xs text-dark-500 dark:text-dark-500">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
