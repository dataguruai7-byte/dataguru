import { useState } from 'react';
import { Package, Code, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
// CodeBlock available if needed

export function PackageAnalyzerPage() {
  const [packageName, setPackageName] = useState('');
  const [results, setResults] = useState<{
    name: string;
    status: string;
    procedures: { name: string; params: string[] }[];
    functions: { name: string; returnType: string }[];
    issues: { severity: 'low' | 'medium' | 'high'; message: string }[];
    dependencies: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!packageName.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults({
        name: packageName,
        status: 'VALID',
        procedures: [
          { name: 'CREATE_EMPLOYEE', params: ['p_first_name', 'p_last_name', 'p_email', 'p_salary'] },
          { name: 'UPDATE_EMPLOYEE', params: ['p_employee_id', 'p_first_name', 'p_last_name'] },
          { name: 'DELETE_EMPLOYEE', params: ['p_employee_id'] },
        ],
        functions: [
          { name: 'GET_EMPLOYEE_SALARY', returnType: 'NUMBER' },
          { name: 'EMPLOYEE_EXISTS', returnType: 'BOOLEAN' },
        ],
        issues: [
          { severity: 'medium', message: 'CREATE_EMPLOYEE does not validate email format before insert' },
          { severity: 'low', message: 'Consider adding PRAGMA AUTONOMOUS_TRANSACTION to audit log procedure' },
        ],
        dependencies: ['EMPLOYEES', 'DEPARTMENTS', 'AUDIT_LOG'],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Package Analyzer</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Understand PL/SQL packages, procedures, and functions</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Package Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. HR_EMPLOYEE_PKG"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="h-10 flex-1 rounded-lg border border-dark-300 bg-white px-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
              />
              <Button onClick={handleAnalyze} disabled={loading || !packageName.trim()}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              <div>
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{results.name}</h2>
                <Badge variant="success">{results.status}</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.procedures.map((p) => (
                    <div key={p.name} className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-primary-500" />
                        <span className="font-mono text-sm font-semibold text-dark-900 dark:text-white">{p.name}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.params.map((param) => (
                          <Badge key={param} variant="default" className="text-[10px]">{param}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.functions.map((f) => (
                    <div key={f.name} className="rounded-lg border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-green-500" />
                          <span className="font-mono text-sm font-semibold text-dark-900 dark:text-white">{f.name}</span>
                        </div>
                        <Badge variant="info">RETURNS {f.returnType}</Badge>
                      </div>
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

            <Card>
              <CardHeader>
                <CardTitle>Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.dependencies.map((dep) => (
                    <Badge key={dep} variant="default">{dep}</Badge>
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
