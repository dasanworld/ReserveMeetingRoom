-- 예약 테이블 생성
CREATE TABLE IF NOT EXISTS reservations (
  reservation_id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES rooms(room_id) ON DELETE CASCADE,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  password VARCHAR(4) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_reservation_slot UNIQUE (room_id, reservation_date, reservation_time)
);

-- 조회 최적화 인덱스
CREATE INDEX IF NOT EXISTS idx_reservations_phone_password ON reservations (phone_number, password);
CREATE INDEX IF NOT EXISTS idx_reservations_room_date ON reservations (room_id, reservation_date);


