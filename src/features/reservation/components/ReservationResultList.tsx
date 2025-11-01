'use client';

import { ReservationWithRoom } from '../types/reservation.types';
import { sortReservationsByDate } from '../lib/reservationUtils';
import { ReservationResultItem } from './ReservationResultItem';

interface ReservationResultListProps {
  reservations: ReservationWithRoom[];
}

/**
 * 예약 조회 결과 목록
 */
export const ReservationResultList = ({ reservations }: ReservationResultListProps) => {
  const sorted = sortReservationsByDate(reservations);

  if (sorted.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">조회된 예약 정보가 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      {sorted.map((res) => (
        <ReservationResultItem key={res.reservation_id} reservation={res} />
      ))}
    </div>
  );
};


