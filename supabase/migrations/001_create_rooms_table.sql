-- 회의실 테이블 생성
CREATE TABLE IF NOT EXISTS rooms (
  room_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  capacity INTEGER NOT NULL
);

-- 초기 데이터 삽입 (샘플)
INSERT INTO rooms (name, location, capacity) VALUES
  ('미팅룸 A', '본관 3층', 8),
  ('미팅룸 B', '본관 3층', 6),
  ('회의실 C', '본관 4층', 12),
  ('소회의실 D', '별관 2층', 4);


