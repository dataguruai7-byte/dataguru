import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CodeBlock } from '../components/ui/CodeBlock';

export function QueryGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const lower = prompt.toLowerCase();
      if (lower.includes('employee') && lower.includes('salary')) {
        setResult(`SELECT e.employee_id,
       e.first_name,
       e.last_name,
       e.salary,
       d.department_name,
       RANK() OVER (PARTITION BY d.department_id ORDER BY e.salary DESC) AS salary_rank
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 5000
ORDER BY d.department_name, salary_rank;`);
      } else if (lower.includes('report') || lower.includes('summary')) {
        setResult(`SELECT d.department_name,
       COUNT(e.employee_id) AS employee_count,
       AVG(e.salary) AS avg_salary,
       MIN(e.salary) AS min_salary,
       MAX(e.salary) AS max_salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY avg_salary DESC;`);
      } else {
        setResult(`SELECT *
FROM user_tables
WHERE table_name LIKE '%'
ORDER BY table_name;`);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto p-6 scrollbar-thin">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Query Generator</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400">Generate Oracle SQL from natural language descriptions</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Describe What You Need</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Show me all employees earning above average salary in their department..."
              rows={4}
              className="w-full rounded-lg border border-dark-300 bg-white p-4 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
            />
            <div className="mt-4">
              <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {loading ? 'Generating...' : 'Generate SQL'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Generated SQL</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock code={result} language="sql" showRun={true} showSave={true} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
