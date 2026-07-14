import { useState, useRef, useCallback } from 'react';

interface RangeInputProps {
  min: number;
  max: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  step?: number;
  disabled?: boolean;
  debounce?: boolean;
  debounceDuration?: number;
}

const RangeInput = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  disabled = false,
  debounce = false,
  debounceDuration = 300,
}: RangeInputProps) => {
  const [minVal, setMinVal] = useState<number>(value?.[0] ?? min);
  const [maxVal, setMaxVal] = useState<number>(value?.[1] ?? max);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  const handleDebouncedChange = useCallback(
    (newMin: number, newMax: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        onChange?.([newMin, newMax]);
      }, debounceDuration);
    },
    [onChange, debounceDuration, debounce],
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(val);

    if (debounce) {
      handleDebouncedChange(val, maxVal);
    } else {
      onChange?.([val, maxVal]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(val);

    if (debounce) {
      handleDebouncedChange(minVal, val);
    } else {
      onChange?.([minVal, val]);
    }
  };

  return (
    <div className="relative h-1.5 w-full">
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-gray-200" />

      {/* Green fill between thumbs */}
      <div
        className="absolute h-full rounded-full bg-primary"
        style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
      />

      {/* Min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        disabled={disabled}
        className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
        style={{ zIndex: 3 }}
      />

      {/* Max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        disabled={disabled}
        className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
        style={{ zIndex: 4 }}
      />
    </div>
  );
};

export default RangeInput;
