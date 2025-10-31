from src.database import db
from src.user_service import UserService

def login():
    """处理用户登录流程"""
    while True:
        print("\n=== 用户登录 ===")
        username = input("请输入用户名 (输入'exit'退出): ")
        
        # 检查是否要退出
        if username.lower() == 'exit':
            print("👋 再见!")
            break
            
        password = input("请输入密码: ")
        
        # 验证用户凭据
        user = UserService.authenticate_user(username, password)
        if user:
            print(f"✅ 登录成功! 欢迎, {user['username']}!")
            print(f"用户信息 - ID: {user['id']}, 用户名: {user['username']}, 创建时间: {user['created_at']}")
        else:
            print("❌ 用户名或密码错误，请重试!")

def main():
    try:
        # 测试数据库连接
        print("🔗 连接数据库中...")
        users = UserService.get_all_users()
        print(f"✅ 连接成功！找到 {len(users)} 个用户")
        
        # 显示所有用户
        print("\n📋 用户列表:")
        for user in users:
            print(f"  ID: {user['id']}, 用户名: {user['username']}, 创建时间: {user['created_at']}")
            
        # 启动登录流程
        login()
        
    except Exception as e:
        print(f"❌ 错误: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    main()