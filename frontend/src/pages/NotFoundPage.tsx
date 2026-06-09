import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950 p-6">
    <div className="text-center max-w-sm">
      <div className="w-16 h-16 rounded-2xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center mx-auto mb-5">
        <AlertCircle size={28} className="text-navy-400 dark:text-navy-500" />
      </div>
      <h1 className="text-5xl font-bold text-gradient mb-3">404</h1>
      <h2 className="text-xl font-bold text-navy-900 dark:text-slate-100 mb-2">Page not found</h2>
      <p className="text-navy-500 dark:text-navy-400 text-sm mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2 text-sm"><Home size={15} />Back to Dashboard</Link>
    </div>
  </div>
);

export default NotFoundPage;
