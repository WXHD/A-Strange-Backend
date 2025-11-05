```
# 当前目录下启动后端服务
docker compose up -d

# 生成:
# images: a-strange-backend-backend a-strange-backend-postgres
# containers: my_backend my_postgres
# networks: a-strange-backend_my_postgres_net
# volumes: a-strange-backend_my_postgres_data

# 查看接口访问: localhost:10011/docs#
```