import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const tRoute = 'pages.Home.components.DealOfTheMonth.components.CountdownTimer';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date | string;
}

const calculateTimeLeft = (targetDate: Date | string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const padWithZero = (num: number): string => String(num).padStart(2, '0');

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  const isExpired = useCallback(
    () =>
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0,
    [timeLeft],
  );

  useEffect(() => {
    if (isExpired()) return;

    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, isExpired]);

  const timeUnits = [
    { value: timeLeft.days, label: t(`${tRoute}.days`, 'DAYS') },
    { value: timeLeft.hours, label: t(`${tRoute}.hours`, 'HOURS') },
    { value: timeLeft.minutes, label: t(`${tRoute}.mins`, 'MINS') },
    { value: timeLeft.seconds, label: t(`${tRoute}.secs`, 'SECS') },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          {/* Time unit box */}
          <div
            className="
            flex flex-col items-center justify-center
            w-14 h-14
            sm:w-16 sm:h-16
            md:w-20 md:h-20
            lg:w-[96px] lg:h-[96px]
            bg-white rounded-lg shadow-sm
          "
          >
            <span
              className="
              leading-none text-primary
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-[32px]
            "
            >
              {padWithZero(unit.value)}
            </span>
            <span
              className="
              uppercase tracking-wider text-green-gray-500 mt-1
              text-[9px]
              sm:text-[10px]
              md:text-xs
              lg:text-[14px]
            "
            >
              {unit.label}
            </span>
          </div>

          {/* Colon separator */}
          {index < timeUnits.length - 1 && (
            <span
              className="
              font-semibold text-green-gray-500 leading-none
              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl
            "
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
