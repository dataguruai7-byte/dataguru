import { useState } from 'react';
import { GitMerge, Plus, Trash2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';

export function JoinFinderPage() {
  const [tables, setTables] = useState<string[]>(['']);
  const [results, setResults] = useState<{
    path: string;
    type: string;
    cardinality: string;
    sql: string;
  }[] | null>(null);
  const [loading, setLoading] = useState(false);

  const addTable = () => setTables([...tables, '']);
  const removeTable = (idx: number) => setTables(tables.filter((_, i) => i !== idx));
  const updateTable = (idx: number, val: string) => {
    const next = [...tables];
    next[idx] = val;
    setTables(next);
  };

  const handleFind = () => {
    setLoading(true);
    setTimeout(() => {
      setResults([
        {
          path: 'USERS → ROLES',
          type: 'INNER JOIN',
          cardinality: '1:N',
          sql: `SELECT u.*, r.role_name\nFROM users u\nINNER JOIN roles r ON u.role_id = r.role_id;`,
        },
        {
          path: 'NOTIFICATIONS → USERS',
          type: 'LEFT JOIN',
          cardinality: 'N:1',
          sql: `SELECT n.*, u.username, u.email\nFROM notifications n\nLEFT JOIN users u ON n.recipient_id = u.user_id;`,
        },
        {
          path: 'APP_MENUS → APP_MENUS (self)',
          type: 'LEFT JOIN',
          cardinality: '1:N',
          sql: `SELECT m.*, p.menu_name AS parent_name\nFROM app_menus m\nLEFT JOIN app_menus p ON m.parent_menu_id = p.menu_id;`,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Join Finder</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Discover optimal join paths between tables</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tables.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Table ${i + 1}`}
                    value={t}
                    onChange={(e) => updateTable(i, e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-dark-300 bg-white px-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
                  />
                  {tables.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeTable(i)}>
                      <Trash2 className="h-4 w-4 text-oracle-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={addTable}>
                <Plus className="mr-1.5 h-4 w-4" />
                Add Table
              </Button>
              <Button onClick={handleFind} disabled={loading || tables.every((t) => !t)}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Find Joins'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Join Paths Found</h2>
            {results.map((r, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20">
                        <GitMerge className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-900 dark:text-white">{r.path}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="info">{r.type}</Badge>
                          <Badge variant="default">{r.cardinality}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CodeBlock code={r.sql} language="sql" showRun={false} showSave={false} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
