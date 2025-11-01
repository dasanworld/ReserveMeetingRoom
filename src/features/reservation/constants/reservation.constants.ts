'use client';

/**
 * 예약 시스템 상수 정의
 */

export const OPERATING_HOURS = {
  START: 9,
  END: 21,
} as const;

/**
 * 예약 단위 (시간)
 */
export const RESERVATION_UNIT_HOURS = 1;

/**
 * 사용자 안내사항 (UI 표기를 위해 문자열 유지)
 */
export const RESERVATION_NOTICE = `
- 예약은 1시간 단위로 가능합니다.
- 예약 시간 10분 전까지 입실해주세요.
- 예약 취소는 별도 문의 바랍니다.
`.trim();

/**
 * 표시용 시간대 목록 (09:00 ~ 21:00, 1시간 간격)
 */
export const TIME_SLOTS: string[] = Array.from(
  { length: OPERATING_HOURS.END - OPERATING_HOURS.START },
  (_, index) => {
    const hour = OPERATING_HOURS.START + index;
    return `${hour.toString().padStart(2, '0')}:00`;
  }
);


