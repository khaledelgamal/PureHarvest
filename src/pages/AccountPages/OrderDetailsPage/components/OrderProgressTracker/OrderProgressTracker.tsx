import { Check } from 'lucide-react';
import type { OrderStatus } from '@/services/supabase/orders/types';

const steps: { status: OrderStatus; label: string }[] = [
  { status: 'received', label: 'Order received' },
  { status: 'processing', label: 'Processing' },
  { status: 'on_the_way', label: 'On the way' },
  { status: 'delivered', label: 'Delivered' },
];

const statusOrder: OrderStatus[] = ['received', 'processing', 'on_the_way', 'delivered'];

type StepState = 'completed' | 'current' | 'upcoming';

const getStepState = (stepIndex: number, currentIndex: number): StepState => {
  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'current';
  return 'upcoming';
};

type OrderProgressTrackerProps = {
  status: OrderStatus;
};

export const OrderProgressTracker = ({ status }: OrderProgressTrackerProps) => {
  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const state = getStepState(index, currentIndex);
        const isLast = index === steps.length - 1;

        return (
          <div key={step.status} className="flex items-center flex-1 last:flex-none">
            {/* ── Step ── */}
            <div className="flex flex-col items-center gap-2">
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex-center text-sm font-semibold
                  transition-all duration-300 shrink-0
                  ${
                    state === 'completed'
                      ? 'bg-primary text-white'
                      : state === 'current'
                        ? 'bg-primary text-white ring-4 ring-primary/20'
                        : 'bg-white border-2 border-dashed border-primary/40 text-gray-400'
                  }
                `}
              >
                {state === 'completed' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{String(index + 1).padStart(2, '0')}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium whitespace-nowrap
                  ${
                    state === 'current'
                      ? 'text-primary'
                      : state === 'completed'
                        ? 'text-gray-600'
                        : 'text-gray-400'
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* ── Connector Line ── */}
            {!isLast && (
              <div
                className="flex-1 h-0.5 mx-2 mb-6 transition-all duration-300
                              rounded-full overflow-hidden bg-gray-200"
              >
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width: index < currentIndex ? '100%' : '0%',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
