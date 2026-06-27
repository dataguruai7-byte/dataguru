import { useState } from 'react';
import { Zap, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
// CodeBlock available if needed

export function TriggerAnalyzerPage() {
  const [triggerName, setTriggerName] = useState('');
  const [results, setResults] = useState<{
    name: string;
    table: string;
    events: string[];
    timing: string;
    status: string;
    performance: { metric: string; value: string }[];
    issues: { severity: 'low' | 'medium' | 'high'; message: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!triggerName.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults({
        name: triggerName,
        table: 'EMPLOYEES',
        events: ['INSERT', 'UPDATE'],
        timing: 'BEFORE EACH ROW',
        status: 'ENABLED',
        performance: [
          { metric: 'Avg Execution Time', value: '0.3ms' },
          { metric: 'Calls per Minute', value: '45' },
          { metric: 'Impact Score', value: 'Low' },
        ],
        issues: [
          { severity: 'low', message: 'Trigger performs well with minimal overhead' },
          { severity: 'medium', message: 'Consider batching audit log inserts for high-frequency tables' },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Trigger Analyzer</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Audit database triggers for performance and logic issues</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Trigger Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. TRG_AUDIT_LOG"
                value={triggerName}
                onChange={(e) => setTriggerName(e.target.value)}
                className="h-10 flex-1 rounded-lg border border-dark-300 bg-white px-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
              />
              <Button onClick={handleAnalyze} disabled={loading || !triggerName.trim()}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-red-600 dark:text-red-400" />
              <div>
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{results.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">{results.status}</Badge>
                  <Badge variant="info">{results.table}</Badge>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Trigger Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                    <p className="text-xs text-dark-500 dark:text-dark-400">Timing</p>
                    <p className="mt-1 font-semibold text-dark-900 dark:text-white">{results.timing}</p>
                  </div>
                  <div className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                    <p className="text-xs text-dark-500 dark:text-dark-400">Events</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {results.events.map((e) => (
                        <Badge key={e} variant="default" className="text-[10px]">{e}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                    <p className="text-xs text-dark-500 dark:text-dark-400">Table</p>
                    <p className="mt-1 font-semibold text-dark-900 dark:text-white">{results.table}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  {results.performance.map((p) => (
                    <div key={p.metric} className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                      <p className="text-xs text-dark-500 dark:text-dark-400">{p.metric}</p>
                      <p className="mt-1 text-2xl font-bold text-dark-900 dark:text-white">{p.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Issues & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.issues.map((issue, i) => (
                    <div key={i} className={`rounded-lg border p-3 text-sm ${
                      issue.severity === 'low' ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-300' :
                      issue.severity === 'medium' ? 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-300' :
                      'border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        {issue.severity === 'low' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                        <Badge variant={issue.severity === 'low' ? 'success' : issue.severity === 'medium' ? 'warning' : 'danger'} className="text-[10px]">
                          {issue.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="mt-1">{issue.message}</p>
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
