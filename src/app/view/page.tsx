'use client';

import { useState } from 'react';
import { QueryForm } from '@/features/reservation/components/QueryForm';
import { ReservationResultList } from '@/features/reservation/components/ReservationResultList';
import { useQueryReservations } from '@/features/reservation/hooks/useReservationQuery';
import { QueryFormInput, ReservationWithRoom } from '@/features/reservation/types/reservation.types';

/**
 * 예약 조회 페이지 (/view)
 */
export default function ViewPage() {
  const queryMutation = useQueryReservations();
  const [results, setResults] = useState<ReservationWithRoom[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (data: QueryFormInput) => {
    const reservations = await queryMutation.mutateAsync(data);
    setResults(reservations);
    setHasSearched(true);
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold">예약 조회</h1>
      <QueryForm onSubmit={handleSubmit} isLoading={queryMutation.isPending} />
      {hasSearched && <ReservationResultList reservations={results} />}
    </div>
  );
}


