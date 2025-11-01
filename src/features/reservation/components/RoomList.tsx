'use client';

import { Room, Reservation } from '../types/reservation.types';
import { generateTimeSlots } from '../lib/timeSlotUtils';
import { RoomCard } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  reservations: Reservation[];
  selectedDate: string;
  onTimeSlotClick: (roomId: number, time: string) => void;
}

/**
 * 회의실 목록 컨테이너
 */
export const RoomList = ({
  rooms,
  reservations,
  selectedDate,
  onTimeSlotClick,
}: RoomListProps) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">등록된 회의실이 없습니다.</div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => {
        const timeSlots = generateTimeSlots(room.room_id, selectedDate, reservations);
        return (
          <RoomCard
            key={room.room_id}
            room={room}
            timeSlots={timeSlots}
            onTimeSlotClick={onTimeSlotClick}
          />
        );
      })}
    </div>
  );
};


