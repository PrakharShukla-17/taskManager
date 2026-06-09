import React from 'react';
import { X, ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { TourStep } from '../../types';

interface TourModalProps {
  isOpen: boolean;
  steps: TourStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ isOpen, steps, currentStep, onNext, onPrev, onClose }) => {
  if (!isOpen) return null;
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm animate-scale-in">
        <div className="bg-navy-900 dark:bg-navy-950 border border-navy-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-2">
              <Compass size={15} className="text-accent-400" />
              <span className="text-xs font-semibold text-navy-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-navy-800 text-navy-400 hover:text-white transition-colors">
              <X size={15} />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5 px-5 pb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'bg-accent-500 w-6' : i < currentStep ? 'bg-accent-700 w-2' : 'bg-navy-700 w-2'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-5 pb-5">
            <h3 className="text-white font-bold text-base mb-2 leading-snug">{step.title}</h3>
            <p className="text-navy-300 text-sm leading-relaxed">{step.description}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-navy-800 bg-navy-950/50">
            <button onClick={onClose} className="text-sm text-navy-400 hover:text-white transition-colors font-medium">
              Exit Tour
            </button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={onPrev}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-navy-200 text-sm font-medium transition-all"
                >
                  <ArrowLeft size={14} /> Previous
                </button>
              )}
              <button
                onClick={isLast ? onClose : onNext}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold transition-all"
              >
                {isLast ? 'Finish' : 'Next'}
                {!isLast && <ArrowRight size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourModal;
