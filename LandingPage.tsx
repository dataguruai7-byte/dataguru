import { useNavigate } from 'react-router-dom';
import {
  Database, MessageSquare, GitMerge, Search, BarChart3, Eye, Package, Zap, Layers,
  ArrowRight, Play, Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const features = [
  { icon: MessageSquare, title: 'SQL Generation', desc: 'Generate complex Oracle SQL queries from natural language descriptions.' },
  { icon: GitMerge, title: 'Join Finder', desc: 'Automatically discover optimal join paths between tables with relationship mapping.' },
  { icon: Search, title: 'Duplicate Detection', desc: 'Identify and resolve duplicate records with intelligent analysis.' },
  { icon: BarChart3, title: 'Index Advisor', desc: 'Get AI-powered index recommendations for optimal query performance.' },
  { icon: Eye, title: 'View Analyzer', desc: 'Deep-dive into view definitions, dependencies, and optimization opportunities.' },
  { icon: Package, title: 'Package Analyzer', desc: 'Understand PL/SQL packages, procedures, and functions at a glance.' },
  { icon: Zap, title: 'Trigger Analyzer', desc: 'Audit database triggers for performance and logic issues.' },
  { icon: Layers, title: 'Execution Plan Analyzer', desc: 'Visualize and optimize SQL execution plans with expert guidance.' },
  { icon: Sparkles, title: 'Oracle APEX Assistant', desc: 'Build APEX applications faster with AI-generated components and SQL.' },
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50M+', label: 'Queries Generated' },
  { value: '10K+', label: 'Enterprise Teams' },
  { value: '<2s', label: 'Avg Response Time' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-dark-200/50 bg-white/80 backdrop-blur-xl dark:border-dark-800/50 dark:bg-dark-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 dark:bg-primary-600">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-dark-900 dark:text-white">DataGuru AI</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm font-medium text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-200">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-200">How it Works</a>
            <a href="#pricing" className="text-sm font-medium text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-200">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-oracle-50/30 dark:from-primary-950/20 dark:via-transparent dark:to-oracle-950/10" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-primary-200/20 blur-3xl dark:bg-primary-900/10" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-oracle-200/20 blur-3xl dark:bg-oracle-900/10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Oracle Database Intelligence
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-dark-950 dark:text-white sm:text-6xl lg:text-7xl">
              DataGuru <span className="text-primary-600 dark:text-primary-400">AI</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-dark-600 dark:text-dark-400">
              Your Intelligent Database Architect & SQL Copilot. Connect your Oracle database and interact with it using natural language.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/app')} className="gap-2">
                <Database className="h-5 w-5" />
                Connect Database
              </Button>
              <Button size="lg" variant="ghost" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-2xl border border-dark-200 bg-white p-2 shadow-2xl dark:border-dark-800 dark:bg-dark-900">
              <div className="rounded-xl bg-dark-950 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-oracle-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs text-dark-500">DataGuru AI - Oracle SQL Copilot</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white font-bold">U</div>
                    <div className="rounded-lg bg-dark-800 px-4 py-2 text-sm text-dark-200">Show me all active menus with their parent relationships</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-oracle-600 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 rounded-lg bg-dark-800/50 px-4 py-2">
                      <p className="mb-2 text-sm text-dark-300">Here are the active menus with parent relationships:</p>
                      <pre className="overflow-x-auto rounded bg-dark-950 p-3 text-xs text-green-400">
{`SELECT m.menu_id, m.menu_name, p.menu_name AS parent_menu
FROM app_menus m
LEFT JOIN app_menus p ON m.parent_menu_id = p.menu_id
WHERE m.status = 'ACTIVE'
ORDER BY COALESCE(p.menu_name, m.menu_name), m.menu_name;`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-dark-200 bg-dark-50 py-12 dark:border-dark-800 dark:bg-dark-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-dark-900 dark:text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-dark-500 dark:text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-dark-900 dark:text-white sm:text-4xl">
              Everything You Need for Oracle Database Excellence
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-600 dark:text-dark-400">
              From SQL generation to performance tuning, DataGuru AI empowers your entire database team.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-dark-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg dark:border-dark-800 dark:bg-dark-900 dark:hover:border-primary-700"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-dark-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-dark-200 bg-dark-50 py-24 dark:border-dark-800 dark:bg-dark-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-dark-900 dark:text-white sm:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-600 dark:text-dark-400">
              Get started in minutes. Connect, chat, and optimize.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Connect Your Database', desc: 'Securely connect to your Oracle database with encrypted credentials and SSL support.', icon: Database },
              { step: '02', title: 'Ask in Natural Language', desc: 'Describe what you need in plain English. No SQL expertise required.', icon: MessageSquare },
              { step: '03', title: 'Generate & Optimize', desc: 'Get generated SQL, execution plans, and optimization suggestions instantly.', icon: Zap },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg">
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary-200 dark:text-primary-900">{item.step}</div>
                <h3 className="mb-2 text-xl font-semibold text-dark-900 dark:text-white">{item.title}</h3>
                <p className="text-dark-600 dark:text-dark-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-dark-900 dark:text-white sm:text-4xl">
            Ready to Transform Your Database Workflow?
          </h2>
          <p className="mb-8 text-lg text-dark-600 dark:text-dark-400">
            Join thousands of Oracle developers, DBAs, and data engineers who trust DataGuru AI.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Log In to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-200 bg-dark-50 py-12 dark:border-dark-800 dark:bg-dark-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 dark:bg-primary-600">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-dark-900 dark:text-white">DataGuru AI</span>
            </div>
            <p className="text-sm text-dark-500 dark:text-dark-400">
              &copy; {new Date().getFullYear()} DataGuru AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
