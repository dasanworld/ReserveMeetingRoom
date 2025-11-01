'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Users } from 'lucide-react';
import { Room } from '../types/reservation.types';

interface RoomInfoDisplayProps {
  room: Room;
  date: string;
  time: string;
}

/**
 * 선택된 회의실/일시 정보 표시 카드
 */
export const RoomInfoDisplay = ({ room, date, time }: RoomInfoDisplayProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{room.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>최대 {room.capacity}명</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {date} {time}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


