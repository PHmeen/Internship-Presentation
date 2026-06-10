<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Web นำเสนอผลงานฝึกงาน (Internship Presentation)
description: ระบบนำเสนอผลงานฝึกงานธีมน้ำเงินเข้ม/ฟ้าสว่างที่ทันสมัยและเรียบง่าย
colors:
  primary: "#00a3ff" # Electric Blue (สีฟ้าสว่างสำหรับเน้นจุดสำคัญ)
  neutral-bg: "#090e1a" # Deep Navy (พื้นหลังหลักสีน้ำเงินเข้มจัด)
  neutral-ink: "#f8fafc" # Slate 50 (สีข้อความสีขาวเกือบสะอาด)
  surface: "#121826" # Deep Slate Slate (พื้นหลังการ์ดหรือกรอบข้อมูล)
typography:
  display:
    fontFamily: "Outfit, Inter, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  mono:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
---

# Design System: Internship Presentation Web (Blue Theme)

## 1. Overview

**Creative North Star: "The Oceanic Terminal"**

ธีมการออกแบบที่ขับเคลื่อนด้วยโทนสีน้ำเงินเข้มและสีฟ้าสว่าง มอบความรู้สึกเป็นมืออาชีพ มีความรู้ทางวิศวกรรมที่ลึกซึ้ง (Technical Depth) และความสะอาดสะอ้านแบบเรียบง่าย (Minimalist Utility)

ระบบนี้หลีกเลี่ยงการใช้สไลด์แบบเดิมที่เป็นแผ่นพื้นสีขาวธรรมดาๆ โดยหันมาขับเน้นรายละเอียดด้วยขอบสีที่คมชัด และอนิเมชันเปิดตัวข้อมูลแบบทีละขั้นเพื่อตรึงความสนใจของผู้ฟัง

**Key Characteristics:**
- **Navy Deep Canvas**: พื้นหลังโทนสลัวเฉดน้ำเงินเข้มจัด ป้องกันแสงสะท้อนและถนอมสายตาผู้ฟัง
- **Electric Accents**: สีฟ้าสว่างนำสายตา ใช้ในจุดสำคัญ เช่น ตัวเลขผลงานหลัก หรือขอบการ์ดที่ใช้งานอยู่
- **Fluid Layout**: การจัดระเบียบข้อมูลเป็น 2 คอลัมน์ที่สมดุล สลับกับตารางและรหัสคำสั่ง

## 2. Colors

### Primary
- **Electric Blue** (#00a3ff): สีฟ้าสว่างหลักสำหรับการเน้นจุดประสงค์หลัก ลิงก์ที่ใช้งาน และตัวชี้วัดความสำเร็จ

### Neutral
- **Deep Navy** (#090e1a): พื้นหลังหน้าเว็บทั้งหมด
- **Dark Surface** (#121826): พื้นการ์ด เมนูด้านข้าง และส่วนคอนเทนเนอร์เนื้อหา
- **Slate Text** (#f8fafc): ข้อความหลัก อ่านง่าย ชัดเจน
- **Muted Ink** (#94a3b8): ข้อความย่อย คำอธิบายประกอบ และสีของไอคอนที่ไม่ได้รับความสำคัญ
- **Border Navy** (#1e293b): เส้นขอบของการ์ดและกรอบตาราง

### Named Rules
**The 10% Cyan Rule.** สีฟ้าสว่าง (Electric Blue) ต้องถูกใช้ไม่เกิน 10% ของพื้นที่หน้าจอนั้นๆ เพื่อไม่ให้รบกวนสายตาและคงพลังในการสะกดจุดเด่นไว้

## 3. Typography

**Display Font:** Outfit, Inter, sans-serif
**Body Font:** Inter, sans-serif
**Label/Mono Font:** JetBrains Mono, Fira Code, monospace

### Hierarchy
- **Display** (Bold (700), clamp(2.2rem, 6vw, 3.8rem), 1.15): ใช้สำหรับหัวข้อหลักประจำหน้าสไลด์
- **Headline** (Semi-Bold (600), 1.8rem, 1.2): หัวข้อย่อยหรือหัวการ์ดข้อมูล
- **Body** (Regular (400), 1rem, 1.65): ข้อความอธิบายรายละเอียด มีการจำกัดความกว้างบรรทัดไม่เกิน 70ch เพื่อให้อ่านง่าย
- **Mono** (Regular (400), 0.9rem): รหัสคำสั่งทางวิศวกรรม ตัวเลขสถิติ และแท็กข้อมูลประเภทต่างๆ

## 4. Elevation

เน้นการสร้างเลเยอร์ระดับความลึกด้วยระดับความเข้มของสีพื้นหลังและขอบแบบคมชัด (Dark Surface และ Border Navy) ไม่เน้นการใช้เงาฟุ้งกระจายขนาดใหญ่

## 5. Components

[องค์ประกอบ UI จะถูกประมวลผลอัตโนมัติในสเตจถัดไป]

## 6. Do's and Don'ts

### Do:
- **Do** ใช้ปุ่มกดลูกศรและ Spacebar บนคีย์บอร์ดเพื่อเลื่อนหน้าสไลด์
- **Do** ใช้สีฟ้าสว่างสำหรับตัวเลขความสำเร็จ (Metrics) เพื่อดึงดูดสายตาอย่างเด่นชัด
- **Do** แบ่งคอลัมน์ซ้ายขวาอย่างสมดุล (ข้อมูลนิ่งด้านซ้าย และกราฟิก/โค้ดด้านขวา)

### Don't:
- **Don't** ใช้สีฟ้ากับเนื้อหายาวๆ หรือพารากราฟเนื้อความ
- **Don't** ใช้เอฟเฟกต์การเลื่อนสไลด์แนวตั้งที่เร็วหรือวูบวาบจนผู้ฟังเวียนศีรษะ
- **Don't** ปล่อยให้ขอบสไลด์ลอยโดยไม่มีเส้นแบ่งที่ชัดเจน
