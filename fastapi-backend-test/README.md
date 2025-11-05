```
# 单独启动后端服务需要修改.env文件的DB_HOST

# 在当前目录下执行以下命令启动服务
docker compose up -d
# 生成镜像fastapi-backend-test-backend、容器my_backend、网络fastapi-backend-test_my_backend_net
docker images  # fastapi-backend-test-backend
docker ps -a  # my_backend
docker network ls  # fastapi-backend-test_my_backend_net

# 访问localhost:10011/docs#查看接口
```