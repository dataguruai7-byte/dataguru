import { cn } from '../../lib/utils';
import {
  Database, Bell, ChevronDown, Moon, Sun, Wifi, WifiOff,
  Settings, LogOut, User, HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { mockConnections } from '../../data/mockData';
import { Badge } from '../ui/Badge';

interface TopNavProps {
  onViewChange: (view: string) => void;
}

export function TopNav({ onViewChange }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const activeConnection = mockConnections.find((c) => c.status === 'connected');

  const notifications = [
    { id: 1, title: 'Slow query detected', desc: 'Query on EMPLOYEES table took 12s', time: '2m ago', read: false },
    { id: 2, title: 'Index recommendation', desc: 'Missing index on ORDERS table', time: '15m ago', read: false },
    { id: 3, title: 'Connection restored', desc: 'Production Oracle is back online', time: '1h ago', read: true },
  ];

  return (
    <header className="flex h-14 items-center justify-between border-b border-dark-200 bg-white px-4 dark:border-dark-800 dark:bg-dark-950">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-semibold text-dark-900 dark:text-white">DataGuru AI</span>
        </div>

        {activeConnection && (
          <>
            <div className="hidden h-4 w-px bg-dark-200 dark:bg-dark-800 sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs text-dark-500 dark:text-dark-400">Database:</span>
              <Badge variant="info">{activeConnection.name}</Badge>
            </div>
            <div className="hidden h-4 w-px bg-dark-200 dark:bg-dark-800 sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs text-dark-500 dark:text-dark-400">Schema:</span>
              <span className="text-xs font-medium text-dark-700 dark:text-dark-300">HR_PROD</span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Connection Status */}
        <div className="hidden items-center gap-1.5 rounded-full border border-dark-200 bg-dark-50 px-3 py-1 dark:border-dark-800 dark:bg-dark-900 md:flex">
          {activeConnection ? (
            <>
              <Wifi className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3.5 w-3.5 text-oracle-500" />
              <span className="text-xs font-medium text-oracle-600 dark:text-oracle-400">Disconnected</span>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-dark-500 hover:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-800"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative rounded-lg p-2 text-dark-500 hover:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-800"
          >
            <Bell className="h-4 w-4" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-oracle-500" />
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-xl border border-dark-200 bg-white shadow-xl dark:border-dark-800 dark:bg-dark-900">
              <div className="border-b border-dark-200 px-4 py-3 dark:border-dark-800">
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={cn('border-b border-dark-100 px-4 py-3 dark:border-dark-800', !n.read && 'bg-primary-50/50 dark:bg-primary-900/10')}>
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-dark-900 dark:text-dark-100">{n.title}</p>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-primary-500" />}
                    </div>
                    <p className="mt-0.5 text-xs text-dark-500 dark:text-dark-400">{n.desc}</p>
                    <p className="mt-1 text-xs text-dark-400 dark:text-dark-500">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-dark-100 dark:hover:bg-dark-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
              JD
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-dark-400 sm:block" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-dark-200 bg-white py-1 shadow-xl dark:border-dark-800 dark:bg-dark-900">
              <div className="border-b border-dark-200 px-4 py-3 dark:border-dark-800">
                <p className="text-sm font-semibold text-dark-900 dark:text-white">John Davidson</p>
                <p className="text-xs text-dark-500 dark:text-dark-400">john@company.com</p>
              </div>
              <button onClick={() => { setShowProfile(false); onViewChange('settings'); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-800">
                <User className="h-4 w-4" /> Profile
              </button>
              <button onClick={() => { setShowProfile(false); onViewChange('settings'); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-800">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-800">
                <HelpCircle className="h-4 w-4" /> Help & Support
              </button>
              <div className="border-t border-dark-200 dark:border-dark-800" />
              <button onClick={() => { setShowProfile(false); onViewChange('login'); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-oracle-600 hover:bg-oracle-50 dark:text-oracle-400 dark:hover:bg-oracle-900/10">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
