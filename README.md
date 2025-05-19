# ⚙️ ระบบจัดการผู้ใช้งาน (User Management System)

[![NPM Version](https://img.shields.io/npm/v/your-package-name)](https://www.npmjs.com/package/your-package-name)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/your-username/your-repo-name/graphs/commit-activity)

ระบบจัดการผู้ใช้งานนี้เป็นแอปพลิเคชันที่ช่วยให้คุณสามารถจัดการข้อมูลผู้ใช้งานได้อย่างมีประสิทธิภาพ ไม่ว่าจะเป็นการแสดงรายชื่อผู้ใช้งาน การดูรายละเอียด การเพิ่มผู้ใช้งานใหม่ การแก้ไขข้อมูล และการลบผู้ใช้งานที่มีอยู่

## 🚀 การเริ่มต้นใช้งาน

### 🛠️ ขั้นตอนการติดตั้งและเริ่มใช้งาน

1.  **ติดตั้ง dependencies:**
    เปิด Terminal หรือ Command Prompt แล้วไปยังโฟลเดอร์โปรเจกต์ของคุณ จากนั้นรันคำสั่ง:
    ```bash
    npm install
    ```

2.  **เริ่มต้นใช้งานทั้ง Frontend และ Backend พร้อมกัน:**
    หลังจากติดตั้ง dependencies เสร็จสิ้น ให้รันคำสั่ง:
    ```bash
    npm run start
    ```
    คำสั่ง `npm run start` นี้จะใช้ [Concurrently](https://www.npmjs.com/package/concurrently) เพื่อรันทั้งฝั่ง Server (Node.js) และ Client (Vite) พร้อมกัน

    * **Frontend:** จะทำงานที่ [http://localhost:5173](http://localhost:5173)
    * **Backend:** จะทำงานที่ [http://localhost:5000](http://localhost:5000)

## 💻 เทคโนโลยีที่ใช้

### 🌐 Frontend

* **React v19.1.0** - Library JavaScript สำหรับสร้าง User Interfaces ที่มีความยืดหยุ่นและมีประสิทธิภาพ
* **Vite v6.3.5** - Build tool ยุคใหม่ที่มีความเร็วสูงสำหรับการพัฒนา Frontend
* **CSS Modules** - เทคนิคการเขียน CSS ที่ช่วยให้ styles ไม่ชนกันในแต่ละ Component

### ⚙️ Backend

* **Node.js** - JavaScript runtime environment สำหรับการพัฒนาฝั่ง Server
* **Express** - Web framework ที่เรียบง่ายและมีประสิทธิภาพสำหรับ Node.js
* **MongoDB** - NoSQL Database ที่มีความยืดหยุ่นสูง

## 💾 ฐานข้อมูล

โปรเจกต์นี้ใช้ **MongoDB Atlas** เป็นบริการฐานข้อมูลบนคลาวด์ โดยมีรายละเอียดดังนี้:

dowload database (https://drive.google.com/file/d/13BehQLRYHxV8d_C9ECX5b_a_6ieCP3g-/view?usp=sharing)

* **Database Name:** `sample_mflix`
* **Collection:** `users`

### 📄 ข้อมูลในตาราง `users`:

| Field        | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `_id`        | ObjectId | รหัสผู้ใช้งาน (สร้างอัตโนมัติโดย MongoDB)   |
| `name`       | String   | ชื่อผู้ใช้งาน                                |
| `email`      | String   | อีเมลผู้ใช้งาน                               |
| `password`   | String   | รหัสผ่าน (ควรเข้ารหัสก่อนบันทึก)            |
| `sex`        | String   | เพศ                                          |
| `address`    | String   | ที่อยู่                                        |
| `phone`      | String   | เบอร์โทรศัพท์                                |
| `created_at` | Date     | วันที่สร้างข้อมูลผู้ใช้งาน                   |
| `updated_at` | Date     | วันที่อัพเดทข้อมูลผู้ใช้งานล่าสุด             |



## ✨ ความสามารถหลัก

ระบบจัดการผู้ใช้งานนี้มีความสามารถดังนี้:

* **แสดงรายการผู้ใช้งาน:** ดูข้อมูลผู้ใช้งานทั้งหมดที่อยู่ในระบบได้อย่างรวดเร็ว
* **ดูรายละเอียดผู้ใช้งาน:** เข้าถึงข้อมูลเชิงลึกของผู้ใช้งานแต่ละคน
* **เพิ่มผู้ใช้งานใหม่:** ลงทะเบียนผู้ใช้งานใหม่เข้าสู่ระบบได้อย่างง่ายดาย
* **แก้ไขข้อมูลผู้ใช้งาน:** ปรับปรุงข้อมูลของผู้ใช้งานที่มีอยู่ให้ทันสมัย
* **ลบผู้ใช้งาน:** นำผู้ใช้งานที่ไม่ต้องการออกจากระบบ



