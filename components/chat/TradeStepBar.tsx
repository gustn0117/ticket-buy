'use client';

import { Check } from 'lucide-react';
import { tradeSteps } from '@/data/mock';

interface TradeStepBarProps {
  currentStep: number;
}

export default function TradeStepBar({ currentStep }: TradeStepBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      {tradeSteps.map((step, idx) => {
        const isCompleted = step.step < currentStep;
        const isCurrent = step.step === currentStep;
        return (
          <div key={step.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCompleted
                    ? 'bg-primary text-white'
                    : isCurrent
                    ? 'bg-primary text-white ring-2 ring-primary/30'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? <Check size={16} /> : step.step}
              </div>
              <span className={`text-[10px] mt-1 ${isCurrent ? 'text-primary font-bold' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {idx < tradeSteps.length - 1 && (
              <div className={`w-6 sm:w-10 md:w-16 h-0.5 mx-1 ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
