'use client';

import { addDays, format, isToday, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 YYYY-MM-DD 문자열로 변환합니다.
 */
export const formatDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * 화면 표시용 날짜 문자열을 반환합니다. (예: 2025년 11월 1일 (토))
 */
export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'yyyy년 M월 d일 (eee)', { locale: ko });
};

/**
 * 오늘 날짜인지 여부를 반환합니다.
 */
export const isTodayDate = (date: Date): boolean => {
  return isToday(date);
};

/**
 * 기준 날짜에서 하루 전/다음 날짜를 반환합니다.
 */
export const navigateDate = (
  currentDate: Date,
  direction: 'prev' | 'next'
): Date => {
  return addDays(currentDate, direction === 'prev' ? -1 : 1);
};

/**
 * 오늘 날짜(00:00)로 정규화된 Date 객체를 반환합니다.
 */
export const getTodayDate = (): Date => {
  return startOfDay(new Date());
};


