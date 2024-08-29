# 使用官方 Node.js 映像作为基础映像
FROM node:18

# 设置工作目录
WORKDIR /app

# 複製專案文件到工作目录
COPY . .

# 安装依赖
RUN npm install

# 暴露开发服务器端口（Vite 默认端口为 5173）
EXPOSE 5173

# 使用 npm run dev 启动开发服务器
CMD ["npm", "run", "dev"]