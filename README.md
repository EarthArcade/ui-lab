# ui-lab

แลป Automated UI Testing ของวิชา ITDS362 นำ test case QP-01 (พิซซ่าที่สั่งแบบกำหนดเงื่อนไขต้องไปโผล่ในรายการของหน้า admin บน QuickPizza) มาทำเป็น test อัตโนมัติด้วยเครื่องมือ 2 ตัว

Tool part ที่เลือก: **Part 3 Robot Framework** และ **Part 4 Cypress**

ผลการรัน เวอร์ชันของเครื่องมือ และคำตอบ reflection อยู่ใน [RESULTS.md](RESULTS.md)

## robot/ (Part 3 Robot Framework)

ใช้ Robot Framework 7.5.1 กับ SeleniumLibrary 6.9.0 ไฟล์ `first.robot` และ `web_form.robot` ทดสอบ web form ของ Selenium ส่วน `pizza_scenario.robot` รัน QP-01 โดยใช้ keyword ใน `resources/quickpizza.resource` โฟลเดอร์ `results/run1` และ `results/run2` เก็บ log, report และ screenshot ของการรันเต็ม 2 รอบ

ต้องตั้งตัวแปร `CHROMEDRIVER` ให้ชี้ไปที่ไฟล์ ChromeDriver ก่อน ติดตั้งครั้งแรกแล้วรันจากโฟลเดอร์ `robot`:

```
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
robot -d results/run1 -v BROWSER:headlesschrome pizza_scenario.robot
```

## cypress/ (Part 4 Cypress)

ใช้ Cypress 16.2.1 ไฟล์ `cypress/e2e/web-form.cy.js` ทดสอบ web form ของ Selenium ส่วน `cypress/e2e/pizza-scenario.cy.js` รัน QP-01 โดยใช้คำสั่ง `adminLogin` ที่เขียนเองใน `cypress/support/commands.js` โฟลเดอร์ `cypress/videos` และ `cypress/screenshots` เก็บหลักฐานของการรันเต็มรอบล่าสุด

รันจากโฟลเดอร์ `cypress`:

```
npm install
npx cypress run --browser chrome
```
