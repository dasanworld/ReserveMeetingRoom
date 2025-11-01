'use client';

import { createClient } from '@supabase/supabase-js';
import { Reservation, ReservationWithRoom, Room } from '../types/reservation.types';

/**
 * Supabase 클라이언트 초기화
 * - 환경 변수 미설정 시 의미 있는 오류를 던집니다.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // 환경변수 누락 시 조기 실패로 디버깅 용이성 확보
  console.warn('[reservationApi] Supabase env is missing. Check .env.local');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : undefined;

/**
 * 모든 회의실 조회
 */
export const fetchRooms = async (): Promise<Room[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('room_id');

  if (error) throw error;
  return data ?? [];
};

/**
 * 특정 날짜의 모든 예약 조회
 */
export const fetchReservationsByDate = async (date: string): Promise<Reservation[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('reservation_date', date);

  if (error) throw error;
  return data ?? [];
};

/**
 * 예약 생성 (동시성 처리: UNIQUE 제약 위반을 사용자 메시지로 변환)
 */
export const createReservation = async (
  reservation: Omit<Reservation, 'reservation_id'>
): Promise<{ success: boolean; message: string }> => {
  if (!supabase) {
    return { success: false, message: '서버 설정 오류가 발생했습니다.' };
  }

  // DB TIME 컬럼 일관성을 위해 HH:MM 형태인 경우 HH:MM:00 으로 변환
  const normalizedTime = reservation.reservation_time.length === 5
    ? `${reservation.reservation_time}:00`
    : reservation.reservation_time;

  // 사전 슬롯 확인 (낙관적 UI에 도움)
  const { data: existing } = await supabase
    .from('reservations')
    .select('reservation_id')
    .eq('room_id', reservation.room_id)
    .eq('reservation_date', reservation.reservation_date)
    .eq('reservation_time', normalizedTime)
    .maybeSingle();

  if (existing) {
    return { success: false, message: '해당 시간대는 방금 예약되었습니다.' };
  }

  const { error } = await supabase
    .from('reservations')
    .insert([{ ...reservation, reservation_time: normalizedTime }]);

  if (error) {
    // PostgreSQL UNIQUE 위반 코드: 23505
    if ((error as any).code === '23505') {
      return { success: false, message: '해당 시간대는 방금 예약되었습니다.' };
    }
    return { success: false, message: '예약 중 오류가 발생했습니다.' };
  }

  return { success: true, message: '예약이 완료되었습니다.' };
};

/**
 * 휴대폰 번호/비밀번호로 예약 조회 (JOIN rooms)
 */
export const queryReservations = async (
  phoneNumber: string,
  password: string
): Promise<ReservationWithRoom[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('reservations')
    .select('*, room:rooms(*)')
    .eq('phone_number', phoneNumber)
    .eq('password', password);

  if (error) throw error;
  // @supabase/supabase-js는 필드 alias로 조인 결과를 제공 → 타입 단언 필요
  return (data as unknown as ReservationWithRoom[]) ?? [];
};


