import { cn } from '../../lib/utils';
import {
  Plus, Database, History, Bookmark, FolderTree, MessageSquare, GitMerge, Search,
  BarChart3, Eye, Package, Zap, Activity, FileBarChart, Settings, ChevronLeft, ChevronRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { mockChats } from '../../data/mockData';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const mainNavItems = [
  { id: 'chat', label: 'New Chat', icon: Plus },
  { id: 'connections', label: 'Database Connections', icon: Database },
];

const historyItems = [
  { id: 'history', label: 'Chat History', icon: History },
  { id: 'saved', label: 'Saved Queries', icon: Bookmark },
];

const toolItems = [
  { id: 'schema', label: 'Schema Explorer', icon: FolderTree },
  { id: 'generator', label: 'Query Generator', icon: MessageSquare },
  { id: 'joins', label: 'Join Finder', icon: GitMerge },
  { id: 'duplicates', label: 'Duplicate Detector', icon: Search },
  { id: 'index', label: 'Index Advisor', icon: BarChart3 },
  { id: 'views', label: 'View Analyzer', icon: Eye },
  { id: 'packages', label: 'Package Analyzer', icon: Package },
  { id: 'triggers', label: 'Trigger Analyzer', icon: Zap },
  { id: 'execution', label: 'Execution Plan Analyzer', icon: Activity },
  { id: 'reports', label: 'Performance Reports', icon: FileBarChart },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onViewChange, collapsed, onToggleCollapse }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tools: true,
    history: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderNavItem = (item: { id: string; label: string; icon: typeof Plus }) => {
    const isActive = activeView === item.id;
    const Icon = item.icon;

    return (
      <button
        key={item.id}
        onClick={() => onViewChange(item.id)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
            : 'text-dark-600 hover:bg-dark-50 dark:text-dark-400 dark:hover:bg-dark-800',
          collapsed && 'justify-center px-2'
        )}
        title={collapsed ? item.label : undefined}
      >
        <Icon className={cn('h-4 w-4 shrink-0', isActive && 'text-primary-600 dark:text-primary-400')} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-dark-200 bg-white transition-all duration-300 dark:border-dark-800 dark:bg-dark-950',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn('flex h-14 items-center border-b border-dark-200 px-3 dark:border-dark-800', collapsed && 'justify-center px-2')}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-700 dark:bg-primary-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span className="ml-2 text-sm font-bold text-dark-900 dark:text-white">DataGuru AI</span>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2 scrollbar-thin">
        {/* Main Nav */}
        <div className="space-y-0.5 px-2">
          {mainNavItems.map(renderNavItem)}
        </div>

        {/* History Section */}
        {!collapsed && (
          <div className="mt-4 px-3">
            <button
              onClick={() => toggleSection('history')}
              className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-dark-500"
            >
              <span>History</span>
              {expandedSections.history ? <ChevronLeft className="h-3 w-3 rotate-90" /> : <ChevronLeft className="h-3 w-3 -rotate-90" />}
            </button>
            {expandedSections.history && (
              <div className="mt-1 space-y-0.5">
                {historyItems.map(renderNavItem)}
                {mockChats.slice(0, 3).map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onViewChange(`chat-${chat.id}`)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors',
                      activeView === `chat-${chat.id}`
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-dark-500 hover:bg-dark-50 dark:text-dark-500 dark:hover:bg-dark-800'
                    )}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tools Section */}
        <div className="mt-4 px-2 space-y-0.5">
          {!collapsed && (
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-dark-500">
              Tools
            </div>
          )}
          {toolItems.map(renderNavItem)}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-dark-200 p-2 dark:border-dark-800">
        {bottomItems.map(renderNavItem)}
        <button
          onClick={onToggleCollapse}
          className={cn(
            'mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-dark-500 transition-colors hover:bg-dark-50 dark:text-dark-400 dark:hover:bg-dark-800',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
