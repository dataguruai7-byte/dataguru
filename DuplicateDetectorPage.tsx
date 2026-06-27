import { useState } from 'react';
import { AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';

export function DuplicateDetectorPage() {
  const [sql, setSql] = useState('');
  const [results, setResults] = useState<{
    risk: 'low' | 'medium' | 'high';
    message: string;
    fix?: string;
  }[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!sql.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults([
        {
          risk: 'medium',
          message: 'Potential duplicate rows detected: GROUP BY on notification_type and recipient_id returns multiple rows with COUNT(*) > 1.',
          fix: `SELECT notification_type, recipient_id, COUNT(*)\nFROM notifications\nGROUP BY notification_type, recipient_id\nHAVING COUNT(*) > 1;`,
        },
        {
          risk: 'low',
          message: 'No missing join conditions detected. All tables are properly joined.',
        },
        {
          risk: 'high',
          message: 'Cartesian product risk: If the WHERE clause is removed, this query could produce a cartesian product between USERS and NOTIFICATIONS.',
          fix: 'Ensure all tables have proper join conditions in the ON clause.',
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Duplicate Detector</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Analyze SQL for duplicate records and cartesian products</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Paste Your SQL</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              placeholder="Paste your SQL query here to analyze for duplicates..."
              rows={8}
              className="w-full rounded-lg border border-dark-300 bg-white p-4 font-mono text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
            />
            <div className="mt-4">
              <Button onClick={handleAnalyze} disabled={loading || !sql.trim()}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze SQL'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Analysis Results</h2>
            {results.map((r, i) => (
              <Card key={i} className={r.risk === 'high' ? 'border-oracle-200 dark:border-oracle-800' : undefined}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    {r.risk === 'low' ? (
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    ) : r.risk === 'medium' ? (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-oracle-500" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={r.risk === 'low' ? 'success' : r.risk === 'medium' ? 'warning' : 'danger'}
                        >
                          {r.risk.toUpperCase()} Risk
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-dark-700 dark:text-dark-300">{r.message}</p>
                      {r.fix && (
                        <div className="mt-3">
                          <p className="mb-1 text-xs font-medium text-dark-500 dark:text-dark-400">Recommended Fix:</p>
                          <CodeBlock code={r.fix} language="sql" showRun={false} showSave={false} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
