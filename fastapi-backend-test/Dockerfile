FROM python:3.10

WORKDIR /app

# 复制requirements文件
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 10011

# 启动应用
CMD ["python", "main.py"]