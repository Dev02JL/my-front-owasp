'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/apiService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser({ username: email, password });
      login(email, data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Login
          </h2>
        </div>

        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md text-center">
                {error}
            </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="sr-only">Email*</label>
            <input id="email" name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password*</label>
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.201-1.209A3.004 3.004 0 0012 15a3 3 0 10-4.243-4.243" />
                    )}
                </svg>
            </button>
          </div>
          
          <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-green-500 hover:text-green-400">
                Forgot your password?
              </Link>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 disabled:opacity-50" disabled={loading}>
              {loading ? 'Connexion...' : 'Log in'}
            </button>
          </div>

          <div className="flex items-center">
             <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 bg-gray-700 text-green-600 focus:ring-green-500 border-gray-600 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
          </div>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div>
            <button type="button" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500" disabled={loading}>
               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              Log in with Google
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/register" className="font-medium text-green-500 hover:text-green-400">
            Not yet a customer?
          </Link>
        </div>
      </div>
    </div>
  );
} 