'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReservationWithRoom } from '../types/reservation.types';
import { formatReservationForDisplay } from '../lib/reservationUtils';

interface ReservationResultItemProps {
  reservation: ReservationWithRoom;
}

/**
 * 예약 조회 결과 단일 항목 카드
 */
export const ReservationResultItem = ({ reservation }: ReservationResultItemProps) => {
  const display = formatReservationForDisplay(reservation);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">회의실명</span>
            <span>{display.roomName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">예약일시</span>
            <span>{display.dateTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">예약자명</span>
            <span>{display.userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">연락처</span>
            <span>{display.phoneNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


