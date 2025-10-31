from .database import db

class UserService:
    @staticmethod
    def get_all_users():
        """获取所有用户"""
        query = "SELECT * FROM users ORDER BY id;"
        return db.execute_query(query)
    
    @staticmethod
    def get_user_by_id(user_id):
        """根据ID获取用户"""
        query = "SELECT * FROM users WHERE id = %s;"
        return db.execute_query(query, (user_id,))
    
    @staticmethod
    def create_user(username, pwd):
        """创建新用户"""
        query = """
        INSERT INTO users (username, pwd) 
        VALUES (%s, %s) 
        RETURNING *;
        """
        return db.execute_query(query, (username, pwd))
    
    @staticmethod
    def update_user(user_id, username=None, pwd=None):
        """更新用户信息"""
        if username and pwd:
            query = "UPDATE users SET username = %s, pwd = %s WHERE id = %s;"
            params = (username, pwd, user_id)
        elif username:
            query = "UPDATE users SET username = %s WHERE id = %s;"
            params = (username, user_id)
        elif pwd:
            query = "UPDATE users SET pwd = %s WHERE id = %s;"
            params = (pwd, user_id)
        else:
            return 0
        
        return db.execute_query(query, params)
    
    @staticmethod
    def delete_user(user_id):
        """删除用户"""
        query = "DELETE FROM users WHERE id = %s;"
        return db.execute_query(query, (user_id,))
        
    @staticmethod
    def authenticate_user(username, password):
        """验证用户凭据"""
        query = "SELECT * FROM users WHERE username = %s AND pwd = %s"
        result = db.execute_query(query, (username, password))
        return result[0] if result else None