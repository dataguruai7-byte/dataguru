import { useState } from 'react';
import { Bookmark, Search, Trash2, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { CodeBlock } from '../components/ui/CodeBlock';

const savedQueries = [
  {
    id: '1',
    title: 'Active Menus Query',
    sql: `SELECT m.menu_id, m.menu_name, p.menu_name AS parent_menu\nFROM app_menus m\nLEFT JOIN app_menus p ON m.parent_menu_id = p.menu_id\nWHERE m.status = 'ACTIVE'\nORDER BY COALESCE(p.menu_name, m.menu_name), m.menu_name;`,
    createdAt: '2024-01-15 10:30',
  },
  {
    id: '2',
    title: 'Duplicate Notifications',
    sql: `SELECT notification_type, recipient_id, COUNT(*) AS duplicate_count\nFROM notifications\nWHERE created_date >= TRUNC(SYSDATE - 7)\nGROUP BY notification_type, recipient_id\nHAVING COUNT(*) > 1\nORDER BY duplicate_count DESC;`,
    createdAt: '2024-01-15 11:15',
  },
  {
    id: '3',
    title: 'Employee Salary Report',
    sql: `SELECT d.department_name,\n       COUNT(e.employee_id) AS employee_count,\n       AVG(e.salary) AS avg_salary\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id\nGROUP BY d.department_name\nORDER BY avg_salary DESC;`,
    createdAt: '2024-01-15 14:20',
  },
];

export function SavedQueriesPage() {
  const [search, setSearch] = useState('');
  const [queries, setQueries] = useState(savedQueries);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = queries.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.sql.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setQueries((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Saved Queries</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Your collection of saved SQL queries</p>
        </div>

        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search saved queries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-dark-300 bg-white pl-9 pr-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
          />
        </div>

        <div className="space-y-4">
          {filtered.map((q) => (
            <Card key={q.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-5 w-5 text-primary-500" />
                    <h3 className="font-semibold text-dark-900 dark:text-white">{q.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-dark-500 dark:text-dark-400">
                      <Clock className="h-3 w-3" />
                      {q.createdAt}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                      {expandedId === q.id ? 'Collapse' : 'Expand'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(q.id)}>
                      <Trash2 className="h-4 w-4 text-oracle-500" />
                    </Button>
                  </div>
                </div>
                {expandedId === q.id && (
                  <div className="mt-4">
                    <CodeBlock code={q.sql} language="sql" showRun={true} showSave={false} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Bookmark className="mx-auto mb-4 h-12 w-12 text-dark-300 dark:text-dark-700" />
              <p className="text-dark-500 dark:text-dark-400">No saved queries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
