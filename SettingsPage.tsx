import { useState } from 'react';
import { Moon, Sun, Bell, Shield, Database, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showSqlPreview, setShowSqlPreview] = useState(true);

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Settings</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Manage your DataGuru AI preferences</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary-500" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-xl font-bold text-white">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-dark-900 dark:text-white">John Davidson</p>
                  <p className="text-sm text-dark-500 dark:text-dark-400">john@company.com</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-700 dark:text-dark-300">Display Name</label>
                  <input
                    type="text"
                    defaultValue="John Davidson"
                    className="h-10 w-full rounded-lg border border-dark-300 bg-white px-3 text-sm text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-700 dark:text-dark-300">Email</label>
                  <input
                    type="email"
                    defaultValue="john@company.com"
                    className="h-10 w-full rounded-lg border border-dark-300 bg-white px-3 text-sm text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100"
                  />
                </div>
              </div>
              <Button size="sm">Save Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-5 w-5 text-primary-500" /> : <Sun className="h-5 w-5 text-primary-500" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Toggle between light and dark themes</p>
                </div>
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Enable Notifications</p>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Receive alerts about slow queries and recommendations</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary-500" />
                Query Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Auto-Save Queries</p>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Automatically save generated queries to history</p>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Show SQL Preview</p>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Display SQL preview in chat responses</p>
                </div>
                <Switch checked={showSqlPreview} onCheckedChange={setShowSqlPreview} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Connection Encryption</p>
                  <p className="text-sm text-dark-500 dark:text-dark-400">All database connections use SSL/TLS encryption</p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
