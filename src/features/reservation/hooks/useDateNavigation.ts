'use client';

import { useState } from 'react';
import { getTodayDate, navigateDate } from '../lib/dateUtils';

/**
 * 날짜 이동(이전/다음/오늘) 상태를 관리하는 훅
 */
export const useDateNavigation = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(getTodayDate());

  const goToToday = () => setSelectedDate(getTodayDate());
  const goToPrevDay = () => setSelectedDate((prev) => navigateDate(prev, 'prev'));
  const goToNextDay = () => setSelectedDate((prev) => navigateDate(prev, 'next'));

  return { selectedDate, goToToday, goToPrevDay, goToNextDay };
};


