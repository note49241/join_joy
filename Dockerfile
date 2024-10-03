# ใช้ Node.js 18 เป็นเบสอิมเมจ
FROM node:18

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# อัปเดต npm และล้าง cache
RUN npm install -g npm@latest && npm cache clean --force

# ติดตั้ง dependencies
RUN npm install  # ใช้ npm install แทน npm ci

# คัดลอกไฟล์โปรเจกต์
COPY . .

# สร้างโปรเจกต์
RUN npm run build

# ตั้งค่า port ที่จะใช้งาน
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["npm", "run", "start:prod"]
