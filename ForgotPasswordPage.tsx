import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-dark-950">
      <div className="hidden w-1/2 flex-col justify-between bg-primary-950 p-12 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Database className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">DataGuru AI</span>
        </div>
        <div>
          <blockquote className="text-2xl font-medium leading-relaxed text-white">
            "The most intuitive database intelligence platform we've ever used. Our team adopted it within hours."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold">SK</div>
            <div>
              <div className="font-medium text-white">Sarah Kim</div>
              <div className="text-sm text-primary-300">Database Manager, FinServe Inc.</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-primary-400">&copy; {new Date().getFullYear()} DataGuru AI</div>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/login')}
            className="mb-8 inline-flex items-center gap-1 text-sm text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>

          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-dark-900 dark:text-white">DataGuru AI</span>
            </div>
          </div>

          {!submitted ? (
            <>
              <h1 className="mb-2 text-2xl font-bold text-dark-900 dark:text-white">Reset your password</h1>
              <p className="mb-8 text-sm text-dark-500 dark:text-dark-400">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-dark-900 dark:text-white">Check your email</h2>
              <p className="mb-6 text-sm text-dark-500 dark:text-dark-400">
                We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
              </p>
              <Button variant="outline" onClick={() => navigate('/login')} className="w-full">
                Back to login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
