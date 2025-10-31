-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pwd VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入示例数据
INSERT INTO users (username, pwd) VALUES 
('admin', 'admin_pwd'),
('user1', 'user1_pwd'),
('user2', 'user2_pwd')
ON CONFLICT (username) DO NOTHING;