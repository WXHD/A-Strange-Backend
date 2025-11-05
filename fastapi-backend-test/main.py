from fastapi import FastAPI, Query
from src.database import db
from src.user_service import UserService
from src.models import UserCreate, UserUpdate, ApiResponse, UserAuth
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="用户管理API", version="1.0.0")

# 配置 CORS 支持跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:10012"],  # 允许的前端地址
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

# API 路由
@app.post("/add_user/", response_model=ApiResponse, summary="创建用户")
async def create_user(user: UserCreate):
    """创建新用户"""
    try:
        result = UserService.create_user(user.username, user.pwd)
        if result:
            return ApiResponse(
                status="success",
                message="用户创建成功",
                data=None
            )
        else:
            return ApiResponse(
                status="failed",
                message="用户创建失败",
                data=None
            )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=str(e),
            data=None
        )

@app.post("/user/", response_model=ApiResponse, summary="获取所有用户")
async def get_all_users(limit: int = Query(10, ge=1, le=100), offset: int = Query(0, ge=0)):
    """获取所有用户列表"""
    try:
        users = UserService.get_all_users(limit, offset)
        total = UserService.get_total_users()
        return ApiResponse(
            status="success",
            message=f"成功获取 {len(users)} 个用户",
            data={
                "users": users,
                "count": len(users),
                "total": total,
                "limit": limit,
                "offset": offset
            }
        )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=str(e),
            data=None
        )

@app.get("/user/{user_id}", response_model=ApiResponse, summary="获取用户详情")
async def get_user(user_id: int):
    """根据ID获取用户详情"""
    try:
        user = UserService.get_user_by_id(user_id)
        if not user:
            return ApiResponse(
                status="failed",
                message="用户未找到",
                data=None
            )
        return ApiResponse(
            status="success",
            message="用户获取成功",
            data=user[0]
        )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=str(e),
            data=None
        )

@app.post("/update_user/{user_id}", response_model=ApiResponse, summary="更新用户")
async def update_user(user_id: int, user: UserUpdate):
    """更新用户信息"""
    try:
        # 先检查用户是否存在
        existing_user = UserService.get_user_by_id(user_id)
        if not existing_user:
            return ApiResponse(
                status="failed",
                message="用户未找到",
                data=None
            )
        
        result = UserService.update_user(user_id, user.username, user.pwd)
        if result == 0:
            return ApiResponse(
                status="failed",
                message="用户更新失败",
                data=None
            )
        
        # 返回更新后的用户信息
        updated_user = UserService.get_user_by_id(user_id)
        return ApiResponse(
            status="success",
            message="用户更新成功",
            data=updated_user[0]
        )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=str(e),
            data=None
        )

@app.delete("/delete_user/{user_id}", response_model=ApiResponse, summary="删除用户")
async def delete_user(user_id: int):
    """删除用户"""
    try:
        result = UserService.delete_user(user_id)
        if result == 0:
            return ApiResponse(
                status="failed",
                message="用户未找到或删除失败",
                data=None
            )
        return ApiResponse(
            status="success",
            message="用户删除成功",
            data=None
        )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=str(e),
            data=None
        )

@app.post("/authenticate/", response_model=ApiResponse, summary="用户登录")
async def authenticate_user(user: UserAuth):
    """用户登录"""
    try:
        user = UserService.authenticate_user(user.username, user.pwd)
        if user:
            return ApiResponse(
                status="success",
                message="用户登录成功",
                data=user
            )
        else:
            return ApiResponse(
                status="failed",
                message="用户名或密码错误",
            )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=str(e),
            data=None
        )

# 健康检查
@app.get("/health", response_model=ApiResponse)
async def health_check():
    """健康检查端点"""
    try:
        conn = db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        return ApiResponse(
            status="success",
            message="服务健康",
            data={"database": "connected"}
        )
    except Exception as e:
        return ApiResponse(
            status="failed",
            message=f"数据库连接失败: {e}",
            data=None
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10011)
