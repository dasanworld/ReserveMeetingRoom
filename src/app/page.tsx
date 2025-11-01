"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateSelector } from '@/features/reservation/components/DateSelector';
import { RoomList } from '@/features/reservation/components/RoomList';
import { ReservationDialog } from '@/features/reservation/components/ReservationDialog';
import { useDateNavigation } from '@/features/reservation/hooks/useDateNavigation';
import { useReservationsByDate, useRooms } from '@/features/reservation/hooks/useReservationQuery';
import { formatDateToString } from '@/features/reservation/lib/dateUtils';

/**
 * 회의실 목록 페이지 (/)
 * - 날짜 이동, 회의실/예약 현황 조회, 시간대 선택 후 /form 이동
 */
export default function HomePage() {
  const router = useRouter();
  const { selectedDate, goToToday, goToPrevDay, goToNextDay } = useDateNavigation();
  const dateString = formatDateToString(selectedDate);

  const { data: rooms = [], isLoading: roomsLoading } = useRooms();
  const { data: reservations = [], isLoading: reservationsLoading } = useReservationsByDate(dateString);

  const [dialogState, setDialogState] = useState({ open: false, title: '', message: '' });

  const handleTimeSlotClick = (roomId: number, time: string) => {
    const params = new URLSearchParams({ roomId: String(roomId), date: dateString, time });
    router.push(`/form?${params}`);
  };

  const isLoading = roomsLoading || reservationsLoading;
  if (isLoading) return <div className="container mx-auto p-8">로딩 중...</div>;

  return (
    <div className="container mx-auto p-8 space-y-8">
      <DateSelector
        selectedDate={selectedDate}
        onPrevDay={goToPrevDay}
        onNextDay={goToNextDay}
        onToday={goToToday}
      />
      <RoomList
        rooms={rooms}
        reservations={reservations}
        selectedDate={dateString}
        onTimeSlotClick={handleTimeSlotClick}
      />
      <ReservationDialog
        open={dialogState.open}
        onClose={() => setDialogState({ ...dialogState, open: false })}
        title={dialogState.title}
        message={dialogState.message}
      />
    </div>
  );
}
