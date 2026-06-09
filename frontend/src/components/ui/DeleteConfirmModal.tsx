import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface Props { isOpen: boolean; onClose: () => void; onConfirm: () => void; taskTitle: string; }

const DeleteConfirmModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="card w-full max-w-sm animate-scale-in p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-navy-900 dark:text-slate-100 mb-1">Delete Task</h3>
            <p className="text-sm text-navy-500 dark:text-navy-400">
              Are you sure you want to delete <span className="font-semibold text-navy-700 dark:text-navy-300">"{taskTitle}"</span>? This cannot be undone.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-800 text-navy-400"><X size={16} /></button>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm py-2">Cancel</button>
          <button onClick={onConfirm} className="btn-danger flex-1 text-sm py-2">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
