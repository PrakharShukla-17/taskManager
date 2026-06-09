import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const GuestRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950">
      <Loader2 size={28} className="animate-spin text-accent-600" />
    </div>
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default GuestRoute;
