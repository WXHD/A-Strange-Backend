# 在当前目录下执行以下命令启动服务
docker compose up -d
# 生成镜像postgresql-test-postgres、容器my_postgres、数据卷postgresql-test_my_postgres_data

# 进入容器内部
docker exec -it my_postgres bash

# 在/backups创建文件测试共享文件夹
touch /backups/niyehao

# 访问数据库
psql -U postgres
\l
\c postgresql
\conninfo
\dt
\d users
SELECT * FROM users;
\q

# 退出容器
exit