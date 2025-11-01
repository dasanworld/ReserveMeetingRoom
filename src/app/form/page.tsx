'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RoomInfoDisplay } from '@/features/reservation/components/RoomInfoDisplay';
import { ReservationForm } from '@/features/reservation/components/ReservationForm';
import { ReservationNotice } from '@/features/reservation/components/ReservationNotice';
import { ReservationDialog } from '@/features/reservation/components/ReservationDialog';
import { useCreateReservation, useRooms } from '@/features/reservation/hooks/useReservationQuery';
import { type ReservationFormValues } from '@/features/reservation/types/reservation.schema';

/**
 * 예약 페이지 (/form)
 * - 쿼리 파라미터(roomId, date, time) 기반으로 예약 폼을 표시
 */
export default function FormPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8">로딩 중...</div>}>
      <FormPageContent />
    </Suspense>
  );
}

function FormPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  const { data: rooms = [] } = useRooms();
  const createMutation = useCreateReservation();

  const [dialogState, setDialogState] = useState({ open: false, title: '', message: '' });

  useEffect(() => {
    if (!roomId || !date || !time) router.push('/');
  }, [roomId, date, time, router]);

  const room = rooms.find((r) => r.room_id === Number(roomId));
  if (!room || !date || !time) return null;

  const handleSubmit = async (data: ReservationFormValues) => {
    const result = await createMutation.mutateAsync({
      room_id: Number(roomId),
      reservation_date: date,
      reservation_time: time,
      ...data,
    } as any);

    setDialogState({
      open: true,
      title: result.success ? '예약 완료' : '예약 실패',
      message: result.message,
    });

    if (result.success) {
      setTimeout(() => router.push('/'), 2000);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold">회의실 예약</h1>
      <RoomInfoDisplay room={room} date={date} time={time} />
      <ReservationForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
      <ReservationNotice />
      <ReservationDialog
        open={dialogState.open}
        onClose={() => setDialogState({ ...dialogState, open: false })}
        title={dialogState.title}
        message={dialogState.message}
      />
    </div>
  );
}


