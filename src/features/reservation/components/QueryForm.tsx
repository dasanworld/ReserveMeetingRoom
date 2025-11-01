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
import { QueryFormInput } from '../types/reservation.types';
import { queryFormSchema } from '../types/reservation.schema';

interface QueryFormProps {
  onSubmit: (data: QueryFormInput) => void;
  isLoading: boolean;
}

/**
 * 예약 조회 폼
 */
export const QueryForm = ({ onSubmit, isLoading }: QueryFormProps) => {
  const form = useForm<QueryFormInput>({
    resolver: zodResolver<QueryFormInput>(queryFormSchema),
    defaultValues: { phone_number: '', password: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {isLoading ? '조회 중...' : '조회하기'}
        </Button>
      </form>
    </Form>
  );
};


