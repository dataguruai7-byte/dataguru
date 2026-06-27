import { useState } from 'react';
import { TrendingUp, Clock, Database, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function PerformanceReportsPage() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');

  const stats = [
    { label: 'Total Queries', value: '12,847', change: '+8.2%', icon: Database },
    { label: 'Avg Response Time', value: '1.2s', change: '-15.3%', icon: Clock },
    { label: 'Slow Queries', value: '23', change: '-42%', icon: TrendingUp },
    { label: 'Index Hits', value: '94.2%', change: '+3.1%', icon: BarChart3 },
  ];

  const topQueries = [
    { sql: 'SELECT * FROM employees WHERE dept_id = :1', calls: '2,341', avgTime: '45ms', trend: 'stable' },
    { sql: 'UPDATE orders SET status = :1 WHERE order_id = :2', calls: '1,892', avgTime: '32ms', trend: 'improving' },
    { sql: 'SELECT COUNT(*) FROM notifications WHERE created > :1', calls: '1,456', avgTime: '120ms', trend: 'degrading' },
    { sql: 'INSERT INTO audit_log (...) VALUES (...)', calls: '987', avgTime: '28ms', trend: 'stable' },
  ];

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Performance Reports</h1>
            <p className="text-sm text-dark-500 dark:text-dark-400">Database performance metrics and trends</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-dark-200 bg-white p-1 dark:border-dark-800 dark:bg-dark-900">
            {(['day', 'week', 'month'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  period === p
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-600 hover:bg-dark-50 dark:text-dark-400 dark:hover:bg-dark-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-dark-500 dark:text-dark-400">{s.label}</p>
                    <p className="mt-1 text-2xl font-bold text-dark-900 dark:text-white">{s.value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20">
                    <s.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <p className={`mt-2 text-xs font-medium ${s.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-oracle-600 dark:text-oracle-400'}`}>
                  {s.change} vs last {period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Queries by Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topQueries.map((q, i) => (
                <div key={i} className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-dark-900 dark:text-dark-100">{q.sql}</code>
                    <Badge variant={q.trend === 'improving' ? 'success' : q.trend === 'degrading' ? 'warning' : 'default'} className="text-[10px] capitalize">
                      {q.trend}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-dark-500 dark:text-dark-400">
                    <span>{q.calls} calls</span>
                    <span>Avg: {q.avgTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
