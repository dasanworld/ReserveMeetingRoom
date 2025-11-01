'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ReservationFormInput } from '../types/reservation.types';
import { reservationFormSchema } from '../types/reservation.schema';

interface ReservationFormProps {
  onSubmit: (data: ReservationFormInput) => void;
  isLoading: boolean;
}

/**
 * 예약 입력 폼 (유효성 검증 포함)
 */
export const ReservationForm = ({ onSubmit, isLoading }: ReservationFormProps) => {
  const form = useForm<ReservationFormInput>({
    resolver: zodResolver<ReservationFormInput>(reservationFormSchema),
    defaultValues: {
      user_name: '',
      phone_number: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>예약자명</FormLabel>
              <FormControl>
                <Input placeholder="홍길동" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>휴대폰 번호</FormLabel>
              <FormControl>
                <Input placeholder="010-1234-5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4자리 비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="1234" maxLength={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? '예약 중...' : '예약하기'}
        </Button>
      </form>
    </Form>
  );
};


