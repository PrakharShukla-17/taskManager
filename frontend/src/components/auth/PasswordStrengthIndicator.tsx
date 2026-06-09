import React from 'react';
import { Check, X, Shield } from 'lucide-react';
import { getPasswordStrength } from '../../utils/passwordStrength';

interface Props { password: string; }

const PasswordStrengthIndicator: React.FC<Props> = ({ password }) => {
  if (!password) return null;
  const { strength, checks } = getPasswordStrength(password);
  const cfg = {
    weak:     { label: 'Weak',     color: 'text-red-500',    bar: 'bg-red-500',    bars: 1 },
    moderate: { label: 'Moderate', color: 'text-yellow-500', bar: 'bg-yellow-500', bars: 2 },
    strong:   { label: 'Strong',   color: 'text-green-500',  bar: 'bg-green-500',  bars: 3 },
  }[strength];

  const reqs = [
    { key: 'length',    label: 'At least 8 characters', met: checks.length    },
    { key: 'uppercase', label: 'One uppercase letter',  met: checks.uppercase },
    { key: 'number',    label: 'One number',            met: checks.number    },
    { key: 'special',   label: 'One special character', met: checks.special   },
  ];

  return (
    <div className="mt-2 space-y-2 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[1, 2, 3].map((b) => (
            <div
              key={b}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                b <= cfg.bars ? cfg.bar : 'bg-navy-200 dark:bg-navy-700'
              }`}
            />
          ))}
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${cfg.color}`}>
          <Shield size={12} />
          <span>{cfg.label}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {reqs.map((r) => (
          <div key={r.key} className="flex items-center gap-1.5 text-xs">
            {r.met ? (
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check size={9} strokeWidth={3} className="text-white" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full bg-navy-200 dark:bg-navy-700 flex items-center justify-center flex-shrink-0">
                <X size={9} strokeWidth={3} className="text-navy-400" />
              </div>
            )}
            <span className={r.met ? 'text-green-600 dark:text-green-400' : 'text-navy-400 dark:text-navy-500'}>
              {r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
