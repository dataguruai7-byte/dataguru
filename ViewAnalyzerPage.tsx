import { useState } from 'react';
import { AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';

export function ViewAnalyzerPage() {
  const [viewSql, setViewSql] = useState('');
  const [results, setResults] = useState<{
    tables: string[];
    joins: { left: string; right: string; type: string }[];
    risks: { level: 'low' | 'medium' | 'high'; message: string }[];
    missingIndexes: string[];
    suggestions: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!viewSql.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults({
        tables: ['EMPLOYEES', 'DEPARTMENTS', 'LOCATIONS'],
        joins: [
          { left: 'EMPLOYEES.DEPARTMENT_ID', right: 'DEPARTMENTS.DEPARTMENT_ID', type: 'INNER JOIN' },
          { left: 'DEPARTMENTS.LOCATION_ID', right: 'LOCATIONS.LOCATION_ID', type: 'INNER JOIN' },
        ],
        risks: [
          { level: 'low', message: 'View uses indexed columns for all joins' },
          { level: 'medium', message: 'Potential performance issue: Full scan on LOCATIONS table' },
        ],
        missingIndexes: ['CREATE INDEX idx_locations_city ON locations(city);'],
        suggestions: [
          'Consider materializing this view if query frequency is high',
          'Add index on LOCATIONS(city) for faster filtering',
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">View Analyzer</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Deep-dive into view definitions and optimization opportunities</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Paste View SQL</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={viewSql}
              onChange={(e) => setViewSql(e.target.value)}
              placeholder="Paste your CREATE VIEW statement here..."
              rows={8}
              className="w-full rounded-lg border border-dark-300 bg-white p-4 font-mono text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
            />
            <div className="mt-4">
              <Button onClick={handleAnalyze} disabled={loading || !viewSql.trim()}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze View'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Analysis Results</h2>

            <Card>
              <CardHeader>
                <CardTitle>Underlying Tables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.tables.map((t) => (
                    <Badge key={t} variant="info">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Join Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.joins.map((j, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-dark-100 bg-white p-3 dark:border-dark-800 dark:bg-dark-900">
                      <Badge variant="default">{j.type}</Badge>
                      <span className="text-sm text-dark-700 dark:text-dark-300">{j.left}</span>
                      <span className="text-dark-400">=</span>
                      <span className="text-sm text-dark-700 dark:text-dark-300">{j.right}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.risks.map((r, i) => (
                    <div key={i} className={`rounded-lg border p-3 text-sm ${
                      r.level === 'low' ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-300' :
                      r.level === 'medium' ? 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-300' :
                      'border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <Badge variant={r.level === 'low' ? 'success' : r.level === 'medium' ? 'warning' : 'danger'} className="text-[10px]">
                          {r.level.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="mt-1">{r.message}</p>
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
                <CardTitle>Optimization Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-dark-700 dark:text-dark-300">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
