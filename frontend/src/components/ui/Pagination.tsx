import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination as PT } from '../../types';

interface PaginationProps { pagination: PT; onPageChange: (page: number) => void; }

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { page, totalPages, total } = pagination;
  if (totalPages <= 1) return null;

  const all = Array.from({ length: totalPages }, (_, i) => i + 1);
  let visible = all;
  if (totalPages > 5) {
    const s = Math.max(1, page - 2);
    visible = all.slice(s - 1, s + 4);
  }

  const btn = (p: number) => (
    <button
      key={p} onClick={() => onPageChange(p)}
      className={`w-8 h-8 text-xs rounded-lg font-medium transition-all ${
        p === page ? 'bg-accent-600 text-white' : 'hover:bg-navy-100 dark:hover:bg-navy-800 text-navy-600 dark:text-navy-400'
      }`}
    >{p}</button>
  );

  return (
    <div id="pagination" className="flex items-center justify-between pt-2">
      <p className="text-xs text-navy-500 dark:text-navy-400">
        Page <span className="font-semibold text-navy-700 dark:text-navy-200">{page}</span> of{' '}
        <span className="font-semibold text-navy-700 dark:text-navy-200">{totalPages}</span> &middot; {total} task{total !== 1 ? 's' : ''}
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-800 disabled:opacity-30 disabled:cursor-not-allowed text-navy-600 dark:text-navy-400 transition-colors">
          <ChevronLeft size={16} />
        </button>
        {visible[0] > 1 && <>{btn(1)}{visible[0] > 2 && <span className="text-navy-400 text-xs px-0.5">…</span>}</>}
        {visible.map(btn)}
        {visible[visible.length - 1] < totalPages && (
          <>{visible[visible.length - 1] < totalPages - 1 && <span className="text-navy-400 text-xs px-0.5">…</span>}{btn(totalPages)}</>
        )}
        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-800 disabled:opacity-30 disabled:cursor-not-allowed text-navy-600 dark:text-navy-400 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
