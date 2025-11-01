# 회의실 예약 관리 시스템

간단한 회의실 예약/조회 기능을 제공하는 Next.js 애플리케이션입니다. 공용 헤더, 회의실 목록, 예약 생성, 예약 조회로 구성되며, 비즈니스 로직과 프리젠테이션 레이어를 명확히 분리하여 유지보수성과 테스트 용이성을 높였습니다.

## 핵심 기능

- 공용 레이아웃: 좌측 `바이브스텍 모임공간` (클릭 시 홈 `/`), 우측 `예약 조회` 버튼(`/view`)
- 회의실 목록 페이지(`/`)
  - 상단 날짜 선택 UI: 이전/다음/오늘로 이동
  - 하단 모든 회의실 목록 표시: 회의실명, 위치, 최대 정원, 예약 가능 시간대(09:00~21:00, 1시간 단위)
  - 이미 예약된 시간대는 비활성화 처리됨
  - 예약 가능한 시간 클릭 시 예약 페이지(`/form`)로 이동
- 예약 페이지(`/form`)
  - 선택된 회의실/일시 정보 표시
  - 예약자명, 휴대폰 번호, 4자리 비밀번호 입력 + 안내사항 표시
  - 예약 성공/실패를 Dialog로 안내
- 예약 조회 페이지(`/view`)
  - 휴대폰 번호 + 4자리 비밀번호로 조회
  - 결과 없으면 메시지, 있으면 회의실명/예약일시/예약자명/연락처 표시

## 아키텍처 개요

- Presentation(UI): `src/features/reservation/components/*`, `src/app/*`
- Business Logic: `src/features/reservation/lib/*`, `src/features/reservation/hooks/*`, `src/features/reservation/api/*`
- Core Types/Schema/Constants: `src/features/reservation/types/*`, `src/features/reservation/constants/*`
- 데이터: Supabase(PostgreSQL), 마이그레이션 SQL은 `supabase/migrations/*`

디렉터리 예시

```
src/
  app/
    page.tsx           # 회의실 목록
    form/page.tsx      # 예약 생성
    view/page.tsx      # 예약 조회
  features/reservation/
    components/        # UI 컴포넌트 (프리젠테이션)
    hooks/             # React Query 훅, 날짜 내비 훅
    api/               # Supabase API 래퍼
    lib/               # 순수 유틸(시간대/날짜/표시 포맷)
    types/             # 타입/스키마(Zod)
    constants/         # 상수(운영 시간, 시간대)
```

## 기술 스택

- Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons
- React Query(@tanstack/react-query), React Hook Form, Zod, date-fns
- Supabase(@supabase/supabase-js)

## 환경 변수 설정

`.env.local` 파일을 프로젝트 루트(`00_03_resevation/`)에 생성하여 아래 값을 설정합니다.

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 데이터베이스(마이그레이션)

다음 SQL을 Supabase 콘솔에서 실행합니다. 파일은 저장소에 포함되어 있습니다.

- `supabase/migrations/001_create_rooms_table.sql`
- `supabase/migrations/002_create_reservations_table.sql`

예약 충돌 방지를 위해 `reservations(room_id, reservation_date, reservation_time)`에 UNIQUE 제약이 설정되어 있습니다. 조회 성능 인덱스도 포함됩니다.

## 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 실행 결과를 확인합니다.

## 기능 동작 개요

- 회의실/예약 조회: React Query로 Supabase API 호출 → 목록/버튼 상태 렌더링
- 예약 가능 슬롯 계산: DB `TIME`(HH:MM:SS)과 UI `HH:MM`을 정규화하여 정확한 비활성화 처리
- 예약 생성: 입력 검증(Zod + RHF) → API 호출 → 성공/실패 Dialog 노출 → 성공 시 홈 이동
- 예약 조회: 휴대폰/비밀번호로 JOIN 조회 → 결과 표시 또는 ‘정보 없음’ 안내

## QA 체크리스트(요약)

- 헤더 네비게이션: 로고 클릭 `/`, 버튼 클릭 `/view`
- 날짜 이동: 이전/다음/오늘로 이동 시 예약 현황 갱신
- 시간대 활성/비활성: 이미 예약된 시간대는 클릭 불가/스타일 흐림
- 예약 폼 검증: 필수값, 4자리 숫자 비밀번호, 형식 검증
- 예약 결과 안내: 성공/실패 Dialog 노출
- 조회 결과: 일치 시 목록, 불일치 시 ‘없음’ 메시지

## 주의 사항

- 운영 시간은 09:00~21:00(1시간 단위)로 고정되어 있습니다. 변경 시 `src/features/reservation/constants/reservation.constants.ts`의 `OPERATING_HOURS`와 `TIME_SLOTS`를 수정하세요.
- Supabase 환경변수가 없으면 API는 빈 결과를 반환하거나 오류 메시지를 안내합니다.

---

문서 요구사항은 `docs/requirement.md`, `docs/userflow.md`, `docs/database.md`에서 확인할 수 있습니다.
