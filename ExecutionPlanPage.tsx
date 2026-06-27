import { useState } from 'react';
import { Activity, Upload, AlertTriangle, Clock, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';

export function ExecutionPlanPage() {
  const [planText, setPlanText] = useState('');
  const [results, setResults] = useState<{
    fullScans: { table: string; rows: string; cost: string }[];
    expensiveOps: { operation: string; cost: string; suggestion: string }[];
    missingIndexes: string[];
    bottlenecks: { step: string; impact: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!planText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults({
        fullScans: [
          { table: 'EMPLOYEES', rows: '107,000', cost: '245' },
          { table: 'DEPARTMENTS', rows: '27', cost: '3' },
        ],
        expensiveOps: [
          { operation: 'HASH JOIN', cost: '312', suggestion: 'Consider nested loops for small outer tables' },
          { operation: 'SORT ORDER BY', cost: '89', suggestion: 'Add index on sort columns to avoid sort' },
        ],
        missingIndexes: [
          'CREATE INDEX idx_employees_dept ON employees(department_id);',
        ],
        bottlenecks: [
          { step: 'Full Table Scan on EMPLOYEES', impact: 'High' },
          { step: 'HASH JOIN between EMPLOYEES and DEPARTMENTS', impact: 'Medium' },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Execution Plan Analyzer</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Visualize and optimize SQL execution plans</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Paste Execution Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={planText}
              onChange={(e) => setPlanText(e.target.value)}
              placeholder="Paste your EXPLAIN PLAN output here..."
              rows={10}
              className="w-full rounded-lg border border-dark-300 bg-white p-4 font-mono text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
            />
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={handleAnalyze} disabled={loading || !planText.trim()}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze Plan'}
              </Button>
              <Button variant="outline" disabled>
                <Upload className="mr-1.5 h-4 w-4" />
                Upload File
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Plan Analysis</h2>

            <Card>
              <CardHeader>
                <CardTitle>Full Table Scans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.fullScans.map((scan, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-oracle-100 bg-oracle-50 p-3 dark:border-oracle-900/30 dark:bg-oracle-900/10">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-oracle-500" />
                        <span className="text-sm font-medium text-dark-900 dark:text-white">{scan.table}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-dark-500 dark:text-dark-400">
                        <span>{scan.rows} rows</span>
                        <Badge variant="danger">Cost: {scan.cost}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expensive Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.expensiveOps.map((op, i) => (
                    <div key={i} className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary-500" />
                          <span className="font-semibold text-dark-900 dark:text-white">{op.operation}</span>
                        </div>
                        <Badge variant="warning">Cost: {op.cost}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-dark-600 dark:text-dark-400">{op.suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {results.missingIndexes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Missing Indexes</CardTitle>
                </CardHeader>
                <CardContent>
                  {results.missingIndexes.map((idx, i) => (
                    <CodeBlock key={i} code={idx} language="sql" showRun={false} showSave={true} />
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Bottlenecks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.bottlenecks.map((b, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-dark-100 bg-white p-3 dark:border-dark-800 dark:bg-dark-900">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-dark-400" />
                        <span className="text-sm text-dark-700 dark:text-dark-300">{b.step}</span>
                      </div>
                      <Badge variant={b.impact === 'High' ? 'danger' : 'warning'}>{b.impact}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
