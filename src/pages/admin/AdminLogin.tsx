import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../lib/cmsContext';

interface AdminLoginProps {
  navigate: (route: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ navigate }) => {
  const { loginAdmin, isSupabaseActive } = useCMS();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your administrator email and password.');
      return;
    }

    setLoading(true);
    const result = await loginAdmin(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify your Supabase credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#064E3B] text-emerald-300 rounded-xl flex items-center justify-center mx-auto shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-[#064E3B] tracking-tight">
            Administrator Portal
          </h2>
          <p className="text-xs text-slate-500">
            Sign in with your Supabase account to manage Church Media Academy.
          </p>
        </div>

        {/* Supabase Connection Status Badge */}
        <div className="p-2.5 bg-slate-100 rounded-lg text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isSupabaseActive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="font-medium text-slate-700 text-[11px]">
              {isSupabaseActive ? 'Supabase Auth Connected' : 'Local Sandbox Mode Active'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            {isSupabaseActive ? 'Production' : 'Ready'}
          </span>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="your-admin@supabase.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-xs font-bold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {loading ? (
              <span>Authenticating with Supabase...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-[10px] text-slate-400 text-center leading-relaxed pt-2 border-t border-slate-100">
          Public registration is disabled. Administrator users are managed in the Supabase Dashboard under Authentication &gt; Users.
        </div>
      </div>
    </div>
  );
};
