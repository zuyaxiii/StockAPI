## ขั้นตอนในการรันโปรเจกต์

### 1. ติดตั้ง Docker และ Redis

ติดตั้ง Docker ตามคู่มือในลิงก์นี้:  
[คู่มือการติดตั้ง Docker](https://docs.docker.com/get-docker/)

### 2. เพิ่มไฟล์ `.env`

ในโฟลเดอร์หลักของโปรเจกต์ ให้สร้างไฟล์ `.env` และเพิ่มค่าดังนี้:

```plaintext
REDIS_URL=yourREDIS_URL
PORT=yourPort
CACHE_TTL=yourTTL
```

### 3. ติดตั้ง Dependencies

ติดตั้ง dependencies ที่จำเป็นโดยใช้คำสั่ง:

```bash
npm install
```

### 4. รัน Redis ผ่าน Docker (ถ้ายังไม่ได้รัน)

หากยังไม่ได้รัน Redis สามารถรันได้ผ่าน Docker ด้วยคำสั่งนี้:

```bash
docker run --name redis -p 6379:6379 -d redis
```

### 5. รันโปรเจกต์

ในการรันโปรเจกต์ในโหมดพัฒนา (development mode) ใช้คำสั่ง:

```bash
npm run dev
```

### 6. ทดสอบ API ผ่าน Postman

สามารถ **import** ไฟล์ Postman ที่แนบมาในโฟลเดอร์ `Stock Price API` ไปยัง Postman ได้โดยตรง เพื่อทดสอบ API

- **ดึงข้อมูลราคาหุ้นแบบเดียว (Single Stock Price):**
  - Method: `GET`
  - URL: `http://localhost:3000/api/stocks/AAPL`
  
- **ดึงข้อมูลราคาหุ้นหลายตัว (Multiple Stock Prices):**
  - Method: `GET`
  - URL: `http://localhost:3000/api/stocks?symbols=AAPL,MSFT,GOOGL`

**หรือ** คุณสามารถทำการทดสอบ API ด้วยการส่งคำขอแบบ `GET` ตามลิงก์ด้านบน

### 7. ข้อมูลเพิ่มเติม

- API นี้ ดึงข้อมูลราคาหุ้นจาก Yahoo Finance และเก็บข้อมูลใน Redis เพื่อการแคชข้อมูล