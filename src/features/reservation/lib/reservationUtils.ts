'use client';

import { ReservationWithRoom } from '../types/reservation.types';
import { formatDateForDisplay } from './dateUtils';
import { formatTimeForDisplay } from './timeSlotUtils';

/**
 * 예약 목록을 날짜/시간 기준 최신순으로 정렬합니다.
 */
export const sortReservationsByDate = (
  reservations: ReservationWithRoom[]
): ReservationWithRoom[] => {
  return [...reservations].sort((a, b) => {
    const dateCompare = b.reservation_date.localeCompare(a.reservation_date);
    if (dateCompare !== 0) return dateCompare;
    return b.reservation_time.localeCompare(a.reservation_time);
  });
};

/**
 * UI 표시를 위한 예약 정보를 포맷팅합니다.
 */
export const formatReservationForDisplay = (
  reservation: ReservationWithRoom
): {
  roomName: string;
  dateTime: string;
  userName: string;
  phoneNumber: string;
} => {
  const date = new Date(reservation.reservation_date);
  const dateStr = formatDateForDisplay(date);
  const timeStr = formatTimeForDisplay(reservation.reservation_time);

  return {
    roomName: reservation.room.name,
    dateTime: `${dateStr} ${timeStr}`,
    userName: reservation.user_name,
    phoneNumber: reservation.phone_number,
  };
};


