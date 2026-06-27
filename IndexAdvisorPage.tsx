import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';

export function IndexAdvisorPage() {
  const [results, setResults] = useState<{
    table: string;
    column: string;
    reason: string;
    improvement: string;
    sql: string;
  }[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResults([
        {
          table: 'ORDERS',
          column: 'CUSTOMER_ID, ORDER_DATE',
          reason: 'Frequent filtering by customer and date range in reporting queries',
          improvement: '~45% faster range scans',
          sql: `CREATE INDEX idx_orders_customer_date\nON orders(customer_id, order_date)\nTABLESPACE users\nCOMPUTE STATISTICS;`,
        },
        {
          table: 'NOTIFICATIONS',
          column: 'RECIPIENT_ID, CREATED_DATE',
          reason: 'High volume lookups by recipient with date ordering',
          improvement: '~60% faster recipient lookups',
          sql: `CREATE INDEX idx_notifications_recipient_date\nON notifications(recipient_id, created_date DESC)\nTABLESPACE users\nCOMPUTE STATISTICS;`,
        },
        {
          table: 'USERS',
          column: 'EMAIL',
          reason: 'Unique constraint enforcement and login lookups',
          improvement: '~30% faster login queries',
          sql: `CREATE UNIQUE INDEX idx_users_email_unique\nON users(email)\nTABLESPACE users\nCOMPUTE STATISTICS;`,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Index Advisor</h1>
            <p className="text-sm text-dark-500 dark:text-dark-400">AI-powered index recommendations for optimal performance</p>
          </div>
          <Button onClick={handleAnalyze} disabled={loading}>
            <Sparkles className="mr-1.5 h-4 w-4" />
            {loading ? 'Analyzing...' : 'Analyze Schema'}
          </Button>
        </div>

        {!results && !loading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BarChart3 className="mb-4 h-12 w-12 text-dark-300 dark:text-dark-700" />
              <p className="text-dark-500 dark:text-dark-400">Click Analyze Schema to get index recommendations</p>
            </CardContent>
          </Card>
        )}

        {results && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-dark-900 dark:text-white">{results.length}</p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">Missing Indexes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-primary-500" />
                    <div>
                      <p className="text-2xl font-bold text-dark-900 dark:text-white">~45%</p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">Avg Improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold text-dark-900 dark:text-white">3</p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">Tables Affected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {results.map((r, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/20">
                        <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-900 dark:text-white">{r.table}.{r.column}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="success">{r.improvement}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-dark-600 dark:text-dark-400">{r.reason}</p>
                  <CodeBlock code={r.sql} language="sql" showRun={false} showSave={true} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
