# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制包文件
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile --ignore-engines

# 复制源代码
COPY . .

# 构建应用
RUN yarn build

# 生产阶段
FROM nginx:1.27.0-alpine

# 删除默认配置和页面
RUN rm -rf /etc/nginx/conf.d/default.conf && \
    rm -rf /usr/share/nginx/html/*

# 创建目标目录
RUN mkdir -p /usr/share/nginx/html/strange

# 复制构建文件到正确路径
COPY --from=builder /app/dist/strange /usr/share/nginx/html/strange

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# # 验证文件
# RUN echo "=== 构建文件验证 ===" && \
#     ls -la /usr/share/nginx/html/strange/ && \
#     echo "=== Nginx 配置验证 ===" && \
#     nginx -t

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]