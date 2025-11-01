'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RESERVATION_NOTICE } from '../constants/reservation.constants';

/**
 * 예약 안내사항 카드
 */
export const ReservationNotice = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>안내사항</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{RESERVATION_NOTICE}</p>
      </CardContent>
    </Card>
  );
};


