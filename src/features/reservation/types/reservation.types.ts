'use client';

/**
 * 회의실 예약 도메인의 핵심 타입 정의
 * - 가독성과 유지보수를 위해 명확한 타입 이름을 사용합니다.
 * - 모든 문자열 시간/날짜는 표준 포맷(YYYY-MM-DD, HH:MM)을 따릅니다.
 */

export interface Room {
  /** 고유 식별자 (PK) */
  room_id: number;
  /** 회의실명 */
  name: string;
  /** 회의실 위치 */
  location: string;
  /** 최대 정원 */
  capacity: number;
}

export interface Reservation {
  /** 고유 식별자 (PK) */
  reservation_id: number;
  /** 참조되는 회의실 ID (FK) */
  room_id: number;
  /** 예약 날짜 (예: 2025-11-01) */
  reservation_date: string;
  /** 예약 시작 시간 (예: 09:00) */
  reservation_time: string;
  /** 예약자명 */
  user_name: string;
  /** 연락처(휴대폰 번호) */
  phone_number: string;
  /** 숫자 4자리 비밀번호 (실운영 시 해시 권장) */
  password: string;
}

export interface TimeSlot {
  /** 시간 문자열 (예: 09:00) */
  time: string;
  /** 예약 가능 여부 */
  isAvailable: boolean;
}

export interface ReservationFormInput {
  user_name: string;
  phone_number: string;
  password: string;
}

export interface QueryFormInput {
  phone_number: string;
  password: string;
}

export interface ReservationWithRoom extends Reservation {
  /** JOIN 결과로 포함된 회의실 정보 */
  room: Room;
}


