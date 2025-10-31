import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
        
    def get_connection(self):
        """获取数据库连接"""
        if self.connection is None or self.connection.closed:
            self.connection = psycopg2.connect(
                host=os.getenv('DB_HOST', 'localhost'),
                port=os.getenv('DB_PORT', '5432'),
                database=os.getenv('DB_NAME', 'postgresql'),
                user=os.getenv('DB_USER', 'postgres'),
                password=os.getenv('DB_PASSWORD', 'wxhd')
            )
        return self.connection
    
    def execute_query(self, query, params=None):
        """执行查询并返回结果"""
        conn = self.get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params)
            if query.strip().upper().startswith('SELECT'):
                return cursor.fetchall()
            else:
                conn.commit()
                return cursor.rowcount
    
    def close(self):
        """关闭连接"""
        if self.connection and not self.connection.closed:
            self.connection.close()

# 创建全局数据库实例
db = Database()