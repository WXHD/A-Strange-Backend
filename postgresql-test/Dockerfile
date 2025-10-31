# 使用官方 PostgreSQL 镜像（包含了默认启动命令、暴露端口5432、工作目录/var/lib/postgresql）作为基础镜像
FROM postgres:15

# 复制自定义配置文件
COPY conf/postgresql.conf /etc/postgresql/
COPY conf/pg_hba.conf /etc/postgresql/

# 复制初始化脚本（数据库为空时会自动执行）
COPY scripts/01-init.sql /docker-entrypoint-initdb.d/

# 设置初始化脚本权限
RUN chmod -R 755 /docker-entrypoint-initdb.d/

# 创建备份目录
RUN mkdir -p /backups && chmod 755 /backups