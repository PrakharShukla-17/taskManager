import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import PasswordStrengthIndicator from '../components/auth/PasswordStrengthIndicator';

const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      const { token, user } = res.data.data;
      login(token, user);
      toast.success(`Welcome, ${user.name}!`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex dark:bg-navy-950">
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent-700 blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-accent-600 flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Get Started Free</h1>
          <p className="text-navy-300 text-base leading-relaxed">Join TaskManager and take control of your productivity.</p>
          <div className="mt-8 space-y-3 text-left">
            {['Unlimited task creation','Smart search and filtering','Priority levels for better focus','Paginated dashboard for clarity'].map(f => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-navy-300">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-navy-950">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center"><LayoutDashboard size={16} className="text-white" /></div>
            <span className="font-bold text-navy-900 dark:text-white">TaskManager</span>
          </div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-slate-100 mb-1">Create your account</h2>
          <p className="text-sm text-navy-500 dark:text-navy-400 mb-7">Start managing your tasks today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">Full Name</label>
              <input type="text" autoComplete="name" className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`} placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">Email</label>
              <input type="email" autoComplete="email" className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`} placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} autoComplete="new-password" className={`input-field pr-11 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`} placeholder="Create a strong password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              <PasswordStrengthIndicator password={form.password} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2">
              {loading && <Loader2 size={16} className="animate-spin" />}Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-navy-500 dark:text-navy-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-accent-600 dark:text-accent-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
