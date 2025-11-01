'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateForDisplay } from '../lib/dateUtils';

interface DateSelectorProps {
  selectedDate: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

/**
 * 날짜 이동/표시 컴포넌트
 */
export const DateSelector = ({
  selectedDate,
  onPrevDay,
  onNextDay,
  onToday,
}: DateSelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h2 className="text-2xl font-bold">{formatDateForDisplay(selectedDate)}</h2>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={onPrevDay} aria-label="이전 날짜">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onToday}>오늘로 이동</Button>
        <Button variant="outline" size="icon" onClick={onNextDay} aria-label="다음 날짜">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};


