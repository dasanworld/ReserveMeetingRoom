'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TimeSlot } from '../types/reservation.types';
import { formatTimeForDisplay } from '../lib/timeSlotUtils';

interface TimeSlotButtonsProps {
  timeSlots: TimeSlot[];
  onSlotClick: (time: string) => void;
}

/**
 * 시간대 버튼 그리드
 */
export const TimeSlotButtons = ({ timeSlots, onSlotClick }: TimeSlotButtonsProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {timeSlots.map((slot) => (
        <Button
          key={slot.time}
          variant={slot.isAvailable ? 'outline' : 'secondary'}
          disabled={!slot.isAvailable}
          onClick={() => onSlotClick(slot.time)}
          className={cn('text-sm', !slot.isAvailable && 'opacity-50 cursor-not-allowed')}
        >
          {formatTimeForDisplay(slot.time)}
        </Button>
      ))}
    </div>
  );
};


