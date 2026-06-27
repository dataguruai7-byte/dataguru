import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-dark-950">
      {/* Left Panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary-950 p-12 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Database className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">DataGuru AI</span>
        </div>
        <div>
          <blockquote className="text-2xl font-medium leading-relaxed text-white">
            "We onboarded our entire DBA team onto DataGuru AI in a single day. The productivity gains were immediate and substantial."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold">MR</div>
            <div>
              <div className="font-medium text-white">Michael Roberts</div>
              <div className="text-sm text-primary-300">VP of Engineering, TechCorp</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-primary-400">&copy; {new Date().getFullYear()} DataGuru AI</div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center gap-1 text-sm text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-dark-900 dark:text-white">DataGuru AI</span>
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-dark-900 dark:text-white">Create your account</h1>
          <p className="mb-8 text-sm text-dark-500 dark:text-dark-400">
            Start your free trial today. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
              <Input
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
              <Input
                type="text"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-dark-300 dark:border-dark-700" required />
              <p className="text-xs text-dark-500 dark:text-dark-400">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">Privacy Policy</a>
              </p>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-dark-500 dark:text-dark-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
