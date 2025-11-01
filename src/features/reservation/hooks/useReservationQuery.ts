'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReservation,
  fetchReservationsByDate,
  fetchRooms,
  queryReservations,
} from '../api/reservationApi';
import { QueryFormInput } from '../types/reservation.types';

const QUERY_KEYS = {
  rooms: ['rooms'] as const,
  reservations: (date: string) => ['reservations', date] as const,
  query: (phone: string, password: string) => ['query', phone, password] as const,
};

/**
 * 회의실 목록 조회 훅
 */
export const useRooms = () => {
  return useQuery({ queryKey: QUERY_KEYS.rooms, queryFn: fetchRooms });
};

/**
 * 특정 날짜의 예약 목록 조회 훅
 */
export const useReservationsByDate = (date: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.reservations(date),
    queryFn: () => fetchReservationsByDate(date),
  });
};

/**
 * 예약 생성 훅 (성공 시 해당 날짜 캐시 무효화)
 */
export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservation,
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reservations(variables.reservation_date),
      });
    },
  });
};

/**
 * 휴대폰/비밀번호로 예약 조회 훅
 */
export const useQueryReservations = () => {
  return useMutation({
    mutationFn: ({ phone_number, password }: QueryFormInput) =>
      queryReservations(phone_number, password),
  });
};


