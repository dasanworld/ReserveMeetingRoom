'use client';

import { TIME_SLOTS } from '../constants/reservation.constants';
import { Reservation, TimeSlot } from '../types/reservation.types';

/**
 * 특정 회의실/날짜에 대한 예약 가능 시간대 목록을 생성합니다.
 * - O(N) 필터링으로 구현 (예약 데이터는 날짜별 조회로 제한)
 */
// "HH:MM:SS" | "HH:MM" → "HH:MM" 형태로 정규화
const toHHMM = (time: string): string => {
  const [h, m] = time.split(':');
  return `${h.padStart(2, '0')}:${(m ?? '00').padStart(2, '0')}`;
};

export const generateTimeSlots = (
  roomId: number,
  date: string,
  reservations: Reservation[]
): TimeSlot[] => {
  const reservedTimes = new Set(
    reservations
      .filter((r) => r.room_id === roomId && r.reservation_date === date)
      .map((r) => toHHMM(r.reservation_time))
  );

  return TIME_SLOTS.map((time) => ({
    time,
    isAvailable: !reservedTimes.has(toHHMM(time)),
  }));
};

/**
 * 시간 문자열(예: "09:00")을 표시용으로 변환합니다. (오전/오후 N시)
 */
export const formatTimeForDisplay = (time: string): string => {
  const [hourStr] = toHHMM(time).split(':');
  const hour = Number.parseInt(hourStr, 10);

  if (Number.isNaN(hour)) return time;

  if (hour < 12) return `오전 ${hour}시`;
  if (hour === 12) return '오후 12시';
  return `오후 ${hour - 12}시`;
};


