'use client';

import { z } from 'zod';

/**
 * 예약 폼 유효성 검사 스키마
 * - 숫자/하이픈 허용 휴대폰 번호
 * - 숫자 4자리 비밀번호
 */
export const reservationFormSchema = z.object({
  user_name: z.string().min(1, '예약자명을 입력해주세요'),
  phone_number: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .regex(/^[0-9-]+$/, '올바른 휴대폰 번호 형식이 아닙니다'),
  password: z
    .string()
    .length(4, '비밀번호는 4자리여야 합니다')
    .regex(/^[0-9]{4}$/u, '비밀번호는 숫자 4자리여야 합니다'),
});

/**
 * 예약 조회 폼 유효성 검사 스키마
 */
export const queryFormSchema = z.object({
  phone_number: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .regex(/^[0-9-]+$/, '올바른 휴대폰 번호 형식이 아닙니다'),
  password: z
    .string()
    .length(4, '비밀번호는 4자리여야 합니다')
    .regex(/^[0-9]{4}$/u, '비밀번호는 숫자 4자리여야 합니다'),
});


