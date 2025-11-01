'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

/**
 * 공용 헤더 컴포넌트
 * - 좌측: 서비스 명 (클릭 시 홈으로 이동)
 * - 우측: 예약 조회 버튼 (클릭 시 /view 이동)
 */
export const Header = () => {
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/')}
          className="text-xl font-bold hover:text-primary transition-colors"
        >
          바이브스텍 모임공간
        </button>
        <Button onClick={() => router.push('/view')}>예약 조회</Button>
      </div>
    </header>
  );
};


