# ShortenUrl Web Application (Client)

โปรเจคนี้คือเว็บแอปพลิเคชันสำหรับการสร้าง URL ย่อ (Short URL) โดยผู้ใช้สามารถป้อน URL ที่ยาวแล้วให้ระบบแปลงเป็น URL สั้น และสามารถติดตามจำนวนการคลิกได้

## 🚀 Features
- ผู้ใช้สามารถเข้าถึงประวัติการคลิกของตนเอง
- ผู้ใช้สามารถสร้าง URL สั้นจาก URL ยาว
- ระบบแสดงลิงก์ URL ยาวและ URL สั้นที่สร้าง
- การติดตามจำนวนคลิกที่ URL สั้น
- ระบบแสดงพรีวิวของเว็บไซต์ที่สร้าง URL สั้น
- ระบบสามารถแสดง จำนวนการคลิก URL ทั้งหมดในระบบ (All Clicks)  , แสดงจำ URL ทั้งหมดที่ทำการ shot Url (All Links) , แสดงจำนวนการ short Url ของที่ปัจจุบัน (Link Today)

- ผู้ที่ไม่เข้าสู้่ระบบสามารถทำการสร้าง URL สั้นได้ แต่จะไม่สามารถดูประวัติการ Click URL ได้

![Screenshot 2568-05-11 at 01 40 27 (2)](https://github.com/user-attachments/assets/373222fb-f3a7-4067-b5ba-c1316c01976b)

- ผู้ใช้ที่เข้าสู้ระบบจะสามารถดูประวัติการ Click Url ได้ , และ สามารถดูประวัติการสร้าง URL สั้นได้

![Screenshot 2568-05-11 at 01 41 59 (2)](https://github.com/user-attachments/assets/b5cbfdb8-ec6e-411c-be47-952bdfdae2cf)

-หน้าจอการดูประวัติ URL สั้นที่สร้าง และ URL เดิม

![Screenshot 2568-05-11 at 01 46 25 (2)](https://github.com/user-attachments/assets/21bd8c46-8425-4d6c-a474-25de4b65f1f1)

## 📌 ER-Diagram

![Screenshot 2568-05-11 at 01 24 12](https://github.com/user-attachments/assets/01c288a5-6651-419c-9ccb-6d9308d0afa9)

1. **ตาราง User**

ฟิลด์:
- `userId` (Int, Primary Key): เป็น Primary Key ของตาราง User ซึ่งใช้ในการอ้างอิงถึงผู้ใช้งานแต่ละคนในระบบ  
- `userName` (String, Unique): เป็นชื่อผู้ใช้ที่ไม่ซ้ำกันในระบบ  
- `password` (String): เป็นรหัสผ่านของผู้ใช้ที่ใช้สำหรับการตรวจสอบตัวตนเวลาเข้าสู่ระบบ  

2. **ตาราง History**

ฟิลด์:
- `historyId` (Int, Primary Key): รหัสประจำแต่ละประวัติการใช้งาน (สร้างอัตโนมัติ)  
- `userId` (Int, Foreign Key): รหัสผู้ใช้ที่เชื่อมโยงกับตาราง User  
- `beforeLink` (String): ลิงก์ต้นฉบับก่อนถูกย่อ  
- `afterLink` (String): ลิงก์ที่ถูกย่อแล้ว  
- `Clicked` (Int): จำนวนครั้งที่คลิก  
- `createdAt` (DateTime): วันที่และเวลาที่สร้างประวัติการใช้งาน

## 📌 Data flow Diagram Level 0

![แบบแผนที่ยังไม่ได้ตั้งชื่อ drawio](https://github.com/user-attachments/assets/09e22142-34d1-41e9-afc2-55548ed12263)


## External Entity
- User: ผู้ใช้ที่โต้ตอบกับระบบ (เช่น ส่ง URL, คลิก URL, ขอสถิติ หรือดูประวัติ)
## Data Flow 
- Original URL: ผู้ใช้ป้อน URL ต้นฉบับที่ต้องการย่อผ่านระบบ
- Shorten URL: ระบบประมวลผลและสร้าง URL สั้น จากนั้นส่งกลับให้ผู้ใช้
- Click Request: ผู้ใช้ทำการคลิกที่ URL สั้น ซึ่งระบบจะรับคำขอและตรวจสอบ
- Origin URL Redirect: เมื่อมีการคลิก URL สั้น ระบบจะ redirect ไปยัง URL ต้นฉบับที่สัมพันธ์กัน
- Username / Password: ข้อมูลที่ผู้ใช้กรอกสำหรับเข้าสู่ระบบ เพื่อพิสูจน์ตัวตน
- Userdata: ข้อมูลส่วนตัวของผู้ใช้ เช่น ประวัติการย่อ URL และจำนวนคลิกที่เกิดขึ้น
- History Request: คำขอจากผู้ใช้ที่เข้าสู่ระบบ เพื่อดูประวัติการใช้งานหรือการย่อ URL ของตนเอง
- URL History: ระบบส่งข้อมูลประวัติ URL ที่ผู้ใช้เคยสร้างหรือใช้งานกลับไปแสดงผลให้ผู้ใช้

# การติดตั้งและการใช้งาน
## 1️⃣ Clone Repository

```
git clone https://github.com/ofly153351/shorternlinkBackend.git
cd shorternlinkBackend
```
## 2️⃣ Install Database by docker

```
‼️(ต้องมี app Docker ก่อน)
docker compose up -d --build 
```

## 3️⃣ Install Dependencies

```
npm install
# หรือถ้าใช้ yarn
# yarn install
```

## 4️⃣ Setup Environment Variables

```
DATABASE_URL="your_database_url"
```

## 5️⃣ Setup Database

```
npx prisma migrate dev --name init
```

## 6️⃣ Start the Application

```
npm start
```

- เซิฟเวอร์จะรันที่ http://localhost:3001
- สามารถเข้าสู่ฐานข้อมูลได้โดย pgAdmin โดยการพิมพิ์ในช่อง url : http://localhost:5050/
- email : admin@mail.com / password : admin123456

# 🔗 Links
- **Client Repository:** [Short link client side](https://github.com/ofly153351/shorternUrlReact)
- **Server Repository:** [Short link server side](https://github.com/ofly153351/shorternlinkBackend)

Built with ❤️ using Node.js.
