# ผลการทำแลป UI

Tool part ที่เลือก: Part 3 Robot Framework และ Part 4 Cypress

## Part 0
- Step 0.1 เวอร์ชันของ Chrome: Google Chrome 157.0.8103.78 (Official Build) (64-bit) บน Windows 11
- Step 0.3 เวอร์ชันของ ChromeDriver: ChromeDriver 157.0.8103.78
- Step 0.4 locator ของปุ่ม Pizza, Please!: `button[name="pizza-please"]` (เจอ 1 element)
- Step 0.4 locator ของ Excluded tools: `select` (เจอ 1 element)
- Step 0.4 locator ของ Must be vegetarian: `#default-checkbox` (เจอ 1 element)
- Step 0.4 locator ของ Custom Pizza Name: `input#pizza-name` (เจอ 1 element ส่วน `#pizza-name` อย่างเดียวจะเจอ 2 ตัวหลังกด Pizza, Please!)
- Step 0.4 `$$("#floating_filled").length` ได้ 3 ส่วน `//label[normalize-space()='Max Calories per Slice']/preceding-sibling::input` เจอ 1 ตัว
- Step 0.5 ชื่อพิซซ่า tool และแคลอรี่จากการรันด้วยมือใน Chrome: Lab Pizza 20261115-1408, tool Scissors, 425 แคลอรี่ต่อชิ้น (dough Thin, ส่วนผสม 5 อย่าง ไม่มีเนื้อสัตว์)

| Step | ผลที่ได้จริง | ผ่านหรือไม่ผ่าน |
|------|-------------|----------------|
| 1 | หัวข้อแสดง "Looking to break out of your pizza routine?" มุมขวาบนเป็น Login (ยังไม่ได้ล็อกอิน) | ผ่าน |
| 2 | เปิด Advanced แล้วมีช่อง Max Calories per Slice (ค่าเริ่มต้น 1000), Excluded tools, Must be vegetarian และ Custom Pizza Name ขึ้นมา | ผ่าน |
| 3 | ช่องแสดง 600, เลือก Knife, ติ๊ก Must be vegetarian และชื่อ Lab Pizza 20261115-1408 | ผ่าน |
| 4 | คำตอบแสดง Name: Lab Pizza 20261115-1408, Tool: Scissors (ไม่ใช่ Knife), Calories per slice: 425 (ไม่เกิน 600) | ผ่าน |
| 5 | กด Love it! โดยยังไม่ได้ล็อกอิน หน้าแสดง "Please log in first." | ผ่าน |
| 6 | ล็อกอินด้วย admin/admin แล้วหน้าแสดง "Latest pizza recommendations" | ผ่าน |
| 7 | เจอบรรทัด `Lab Pizza 20261115-1408 (tool=Scissors, ingredients_number=5)` เป็นอันดับที่ 4 ของรายการ เพราะมีพิซซ่าของคนอื่นเข้ามาก่อน tool ตรงกับ step 4 | ผ่าน |

หมายเหตุ: รอบก่อนหน้าที่ใช้ชื่อ Lab Pizza 20261115-1403 ผ่าน step 1-6 แต่ตอนเปิดหน้า admin ไม่เจอชื่อนี้ใน 15 บรรทัดล่าสุด น่าจะเพราะมีพิซซ่าของคนอื่นเข้ามาจนดันออกจากรายการ หรือแท็บ admin ไปเจอคนละ server รอบ 1408 จึงเปิดหน้า admin ทันทีหลัง step 5 และเจอพิซซ่าในรายการ เรื่องนี้แสดงว่า step 7 ต้องค้นหาทั้งรายการและต้องทำต่อจาก step 5 ให้เร็ว ซึ่ง test อัตโนมัติทำอยู่แล้ว

## Part 3: Robot Framework
- robot --version: Robot Framework 7.5.1 (Python 3.14.0 on win32)
- Step 3.2 ข้อความ error เมื่อใส่ชื่อหน้าผิด: `Title should have been 'Web Form' but was 'Web form'.`
- Step 3.8 รอบที่ 1 ผล เวลา และชื่อพิซซ่า: PASS, 9.48 วินาที, Lab Pizza 20261115-134011 (tool Scissors, 400 แคลอรี่ต่อชิ้น)
- Step 3.8 รอบที่ 2 ผล เวลา และชื่อพิซซ่า: PASS, 9.78 วินาที, Lab Pizza 20261115-134021 (tool Scissors, 475 แคลอรี่ต่อชิ้น)

## Part 4: Cypress
- node --version, npm --version และ npx cypress version: v22.20.0, 10.9.3, Cypress 16.2.1
- Step 4.3 ข้อความ error เมื่อใส่ชื่อหน้าผิด: `Timed out retrying after 10000ms` โดยแสดง `-'Web form'` (ค่าจริง) และ `+'Web Form'` (ค่าที่คาดไว้)
- Step 4.6 tool และแคลอรี่ในคำตอบของ POST /api/pizza: รอบที่ 2 ได้ tool Scissors, calories 350 (test ตรวจว่าหน้าเว็บแสดงค่าเดียวกันนี้)
- Step 4.7 บรรทัดในรายการหน้า admin ที่แสดงพิซซ่าของเรา: `Lab Pizza 20261115-134746 (tool=Scissors, ingredients_number=5) (newest)`
- Step 4.8 รอบที่ 1 ผล เวลา และชื่อพิซซ่า: All specs passed, 00:16 (pizza-scenario 00:12, web-form 00:04), Lab Pizza 20261115-134703 (Scissors, 375)
- Step 4.8 รอบที่ 2 ผล เวลา และชื่อพิซซ่า: All specs passed, 00:16 (pizza-scenario 00:12, web-form 00:03), Lab Pizza 20261115-134746 (Scissors, 350)
- Step 4.9 (optional) browser และผล: ไม่ได้ทำ

## Part B
1. ช่องตัวเลข 3 ช่องในหน้า QuickPizza ใช้ id `floating_filled` ซ้ำกันหมด พอลองพิมพ์ `$$("#floating_filled").length` ใน Console ก็ได้ 3 ถ้าหาด้วย id นี้จะได้ช่องแรกเสมอ ซึ่งบังเอิญเป็นช่อง Max Calories พอดี แต่ถ้าวันหนึ่งมีการสลับลำดับช่อง test ก็จะไปกรอกผิดช่องทันที เราเลยเปลี่ยนไปหาช่องจากข้อความของ label แทน เพราะ label แต่ละอันชี้ได้แค่ช่องเดียว

   ข้อเสนอของเราคือให้แต่ละช่องมี id ไม่ซ้ำกัน เช่น `id="max-calories"`, `id="min-toppings"`, `id="max-toppings"` หรือจะเพิ่ม `data-testid` ก็ได้ id ที่ไม่ซ้ำทั้งสั้นและหาได้เร็ว แถมไม่พังเวลามีคนแก้ข้อความ label หรือแปลหน้าเว็บเป็นภาษาอื่น test ก็จะเขียนง่ายขึ้นและพังยากขึ้น

2. Step 7 ใช้ test oracle แบบ consistency check คือไม่ได้เทียบกับค่าที่รู้ไว้ก่อน แต่เทียบสองจุดในระบบเดียวกันว่าตรงกันไหม ในที่นี้คือ tool ที่หน้าคำแนะนำแสดง กับ tool ที่หน้า admin บันทึกไว้ tool ถูกสุ่มมา เราเลยไม่รู้ล่วงหน้าว่าจะได้อะไร แต่ยังไงสองจุดนี้ก็ต้องตรงกัน

   ตอนเรารัน หน้าคำแนะนำขึ้น Scissors และหน้า admin ก็ขึ้น `(tool=Scissors, ...)` ตรงกัน เช็กแบบนี้จะจับ bug ได้ในกรณีที่ server บันทึกพิซซ่าคนละอันกับที่ส่งกลับมาให้ผู้ใช้ เช่น สุ่ม tool ใหม่อีกรอบตอนเขียนลงฐานข้อมูล หรือหน้า admin ไปดึงข้อมูลเก่ามาแสดง

3. ถ้าจะเพิ่มเช็กว่าพิซซ่าที่ได้เป็นมังสวิรัติจริง คือไม่มีเนื้อสัตว์หรือปลาเลย จะทำจากหน้าเว็บอย่างเดียวไม่ได้ เพราะหน้าเว็บแสดงแค่ชื่อส่วนผสม เช่น Mozzarella, Spinach, Olive oil โดยไม่บอกว่าอันไหนเป็นมังสวิรัติ test เลยต้องมีข้อมูลเพิ่ม อาจเป็นรายการส่วนผสมที่เขียนไว้ใน test data เอง หรือดึงข้อมูลส่วนผสมจาก API ของ QuickPizza

   อีกทางที่ง่ายกว่าคือดู JSON ที่ได้กลับมาจาก `POST /api/pizza` ซึ่ง Cypress ดักไว้อยู่แล้ว ในนั้นมี `"vegetarian": true` แต่วิธีนี้อ่อนกว่า เพราะเท่ากับเราเชื่อสิ่งที่ server บอกเองโดยไม่ได้ตรวจซ้ำ

4. Robot Framework จะรอเฉพาะจุดที่เราเขียน keyword ให้รอไว้ เช่น `Wait Until Element Is Visible css:h1` และ `Wait Until The Page Is Ready` ก่อน login หน้า admin โดยตั้ง timeout ไว้ 10 วินาทีที่ library ส่วน Cypress รอให้เองอัตโนมัติ ทุก `cy.get` กับ `should` จะลองซ้ำได้นานสุด 10 วินาที เราเลยแทบไม่ต้องเขียนการรอเองเลย ยกเว้นตอนเช็ก `svelte-announcer` ใน `adminLogin` ข้อเสียคือถ้าเช็กผิด ต้องรอครบ 10 วินาทีกว่าจะ fail (ตอนลองใส่ชื่อหน้าผิด ใช้ไป 12 วินาที)

   ถ้าเทียบความเร็วตอนเขียน QP-01 ใน Cypress เขียนเสร็จเร็วกว่า เพราะไม่ต้องคิดว่าจะใส่การรอตรงไหน แต่ถ้าเทียบความอ่านง่าย test ของ Robot อ่านแล้วใกล้กับ test case ที่เขียนไว้มากกว่า เพราะมี keyword ชื่อเข้าใจง่ายอย่าง `Turn On Advanced`

   ด้าน report ไฟล์ log.html ของ Robot แสดงทุก keyword พร้อมข้อความ และฝัง screenshot ไว้ในตัว ส่วน Cypress ให้เป็นวิดีโอ (QP-01 ประมาณ 1.6 MB) ที่เห็น Command Log อยู่ข้างหน้าเว็บ ส่วนเวลารัน QP-01 เต็มรอบ Robot ใช้ราว 9.5 วินาที Cypress ใช้ราว 12 วินาทีต่อ spec ซึ่งรวมเวลาอัดวิดีโอแล้ว

5. สำหรับ Project 2 เราจะเลือก Cypress เพราะ
   - อัดวิดีโอให้ทุกครั้งที่รันแบบ headless แค่ตั้ง `video: true` ตัวเดียว ซึ่งตรงกับที่ Project 2 ต้องการหลักฐานการรันเต็มรอบพอดี
   - Cypress ลองซ้ำให้เอง เลยไม่ต้องเขียนการรอเอง
   - มี `cy.intercept` ที่ทำให้เช็กได้ทั้งสิ่งที่หน้าเว็บแสดงและสิ่งที่ server ส่งกลับมา (tool และแคลอรี่) จับ bug ได้มากกว่าการดูหน้าเว็บอย่างเดียว

   แต่ถ้ากลุ่มตกลงกันแล้วว่าจะใช้ Robot Framework เราก็ใช้ตามกลุ่มได้ เพราะไฟล์ resource ของ Robot ก็รวม locator ไว้ที่เดียวได้ดีไม่แพ้กัน

6. (Part 3) locator ของช่องแคลอรี่เก็บอยู่ในตัวแปร `${MAX CALORIES}` ในส่วน Variables ของไฟล์ `resources/quickpizza.resource` และถูกเรียกใช้ใน keyword `Turn On Advanced` กับ `Fill In The Pizza Request` ถ้า QuickPizza เปลี่ยนช่องนี้ เราแก้แค่บรรทัดเดียวตรงนั้นก็พอ

   ส่วน `pizza_scenario.robot` แค่เรียก keyword อย่าง `Fill In The Pizza Request    600    Knife    ${name}` โดยไม่เห็น locator เลย ไฟล์ test จึงไม่ต้องแก้อะไร และ test อื่นที่ใช้ resource เดียวกันก็กลับมาผ่านพร้อมกันหมด

7. (Part 4) Cypress จะล้าง cookie, local storage และ alias ก่อนเริ่มทุก test ซึ่งเป็นปัญหากับ QuickPizza เพราะ QuickPizza มีหลาย server และใช้ cookie ผูก browser ไว้กับ server ตัวเดียว ส่วนหน้า admin ก็แสดงเฉพาะพิซซ่าของ server ตัวนั้น

   ถ้าเราแยก step 6 กับ 7 ออกไปเป็น test ที่สอง test นั้นจะเริ่มโดยไม่มี cookie และอาจไปเจอ server อื่นที่ไม่มีพิซซ่าของเรา `cy.contains('li', pizzaName)` ก็จะ timeout นอกจากนี้ test ที่สองยังไม่มี `pizzaName` กับ alias `@tool` ที่ได้จาก test แรก เลยเช็ก tool ไม่ได้อยู่ดี
