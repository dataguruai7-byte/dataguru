import { useState } from 'react';
import { Database, Plus, TestTube, Link2, Trash2, Check, X, Server } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DatabaseConnection } from '../types';
import { mockConnections } from '../data/mockData';

export function ConnectionsPage() {
  const [connections, setConnections] = useState<DatabaseConnection[]>(mockConnections);
  const [showForm, setShowForm] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    host: '',
    port: '1521',
    serviceName: '',
    username: '',
    password: '',
  });

  const handleTest = async (id: string) => {
    setTesting(id);
    setTestResult(null);
    setTimeout(() => {
      setTesting(null);
      setTestResult({ id, success: true });
    }, 2000);
  };

  const handleConnect = (id: string) => {
    setConnections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'connected' } : { ...c, status: 'disconnected' }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConnection: DatabaseConnection = {
      id: Date.now().toString(),
      ...formData,
      status: 'disconnected',
    };
    setConnections((prev) => [newConnection, ...prev]);
    setShowForm(false);
    setFormData({ name: '', host: '', port: '1521', serviceName: '', username: '', password: '' });
  };

  const handleDelete = (id: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Database Connections</h1>
            <p className="text-sm text-dark-500 dark:text-dark-400">Manage your Oracle database connections</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New Connection
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Connection Name"
                  placeholder="e.g. Production Oracle"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Host"
                  placeholder="e.g. oracle.company.com"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  required
                />
                <Input
                  label="Port"
                  placeholder="1521"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  required
                />
                <Input
                  label="Service Name"
                  placeholder="e.g. ORCLPDB1"
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  required
                />
                <Input
                  label="Username"
                  placeholder="Database username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Database password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <div className="flex items-end gap-2 sm:col-span-2">
                  <Button type="submit" className="gap-2">
                    <Database className="h-4 w-4" />
                    Save Connection
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {connections.map((conn) => (
            <Card key={conn.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20">
                      <Server className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{conn.name}</h3>
                        <Badge variant={conn.status === 'connected' ? 'success' : 'default'}>
                          {conn.status === 'connected' ? 'Connected' : 'Disconnected'}
                        </Badge>
                      </div>
                      <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-dark-500 dark:text-dark-400">
                        <span>Host: {conn.host}</span>
                        <span>Port: {conn.port}</span>
                        <span>Service: {conn.serviceName}</span>
                        <span>User: {conn.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTest(conn.id)}
                      disabled={testing === conn.id}
                    >
                      <TestTube className="mr-1.5 h-3.5 w-3.5" />
                      {testing === conn.id ? 'Testing...' : 'Test'}
                    </Button>
                    {conn.status === 'disconnected' ? (
                      <Button size="sm" onClick={() => handleConnect(conn.id)}>
                        <Link2 className="mr-1.5 h-3.5 w-3.5" />
                        Connect
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => handleConnect(conn.id)}>
                        Disconnect
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(conn.id)}>
                      <Trash2 className="h-4 w-4 text-oracle-500" />
                    </Button>
                  </div>
                </div>
                {testResult?.id === conn.id && (
                  <div className={`mt-3 rounded-lg border p-3 text-sm ${testResult.success ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-300' : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-300'}`}>
                    {testResult.success ? (
                      <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Connection successful</span>
                    ) : (
                      <span className="flex items-center gap-2"><X className="h-4 w-4" /> Connection failed</span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
