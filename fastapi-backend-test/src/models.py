from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

# 请求模型
class UserCreate(BaseModel):
    username: str
    pwd: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    pwd: Optional[str] = None

class UserAuth(BaseModel):
    username: str
    pwd: str

# 响应模型
class UserResponse(BaseModel):
    id: int
    username: str
    pwd: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ApiResponse(BaseModel):
    status: str  # "success" 或 "failed"
    message: str
    data: Optional[Any] = None