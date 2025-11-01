'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users } from 'lucide-react';
import { Room, TimeSlot } from '../types/reservation.types';
import { TimeSlotButtons } from './TimeSlotButtons';

interface RoomCardProps {
  room: Room;
  timeSlots: TimeSlot[];
  onTimeSlotClick: (roomId: number, time: string) => void;
}

/**
 * 단일 회의실 카드 (정보 + 시간대 선택)
 */
export const RoomCard = ({ room, timeSlots, onTimeSlotClick }: RoomCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{room.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>최대 {room.capacity}명</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TimeSlotButtons
          timeSlots={timeSlots}
          onSlotClick={(time) => onTimeSlotClick(room.room_id, time)}
        />
      </CardContent>
    </Card>
  );
};


