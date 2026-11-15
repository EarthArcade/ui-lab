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
1. ช่องตัวเลข 3 ช่องของ QuickPizza ใช้ id `floating_filled` ซ้ำกัน ตอนลองใน Console `$$("#floating_filled").length` ได้ 3 ถ้าใช้ id จะได้ช่องแรกเสมอ ซึ่งบังเอิญเป็น Max Calories แต่ถ้าสลับลำดับช่องก็จะผิดทันที test จึงหาช่องผ่านข้อความของ label ที่ระบุได้ช่องเดียว ผมเสนอให้แต่ละช่องมี id ของตัวเอง เช่น `id="max-calories"`, `id="min-toppings"` และ `id="max-toppings"` หรือใส่ attribute `data-testid` id ที่ไม่ซ้ำสั้น หาเร็ว และไม่พังเมื่อมีการแก้ข้อความ label หรือแปลภาษา ทำให้ test ง่ายขึ้นและเปราะน้อยลง

2. Step 7 เป็น test oracle แบบ consistency check คือเทียบผลลัพธ์สองจุดของระบบเดียวกันว่าตรงกันไหม (tool ในคำแนะนำ กับ tool ที่บันทึกในรายการหน้า admin) แทนการเทียบกับค่าที่รู้ล่วงหน้า tool ถูกสุ่มจึงไม่มีค่าคาดหวังตายตัว แต่สองจุดต้องตรงกัน ในการรันของผมหน้าคำแนะนำแสดง Scissors และบรรทัดในหน้า admin แสดง `(tool=Scissors, ...)` เช็กนี้จะจับ bug ที่ server บันทึกพิซซ่าคนละอันกับที่ส่งกลับไปได้ เช่นสุ่ม tool ใหม่ตอนเขียนลงฐานข้อมูล หรือหน้า admin แสดงข้อมูลเก่า

3. เพิ่มเช็กที่อ่านส่วนผสมของพิซซ่าที่แนะนำ แล้วตรวจว่าไม่มีเนื้อสัตว์หรือปลาเลย หน้าเว็บแสดงแค่ชื่อส่วนผสม (เช่น Mozzarella, Spinach, Olive oil) test จึงต้องมีแหล่งข้อมูลเพิ่มที่บอกว่าส่วนผสมไหนเป็นมังสวิรัติ เช่นรายการตายตัวใน test data หรือข้อมูลส่วนผสมจาก API ของ QuickPizza อีกทางที่ง่ายกว่าแต่อ่อนกว่าคือดูคำตอบ JSON ของ `POST /api/pizza` ที่ Cypress ดักไว้อยู่แล้ว ซึ่งมี `"vegetarian": true` แต่วิธีนี้เป็นแค่การเชื่อคำบอกของ server เอง

4. Robot Framework รอเฉพาะจุดที่เขียน keyword สำหรับรอไว้ เช่น `Wait Until Element Is Visible css:h1` และ `Wait Until The Page Is Ready` ก่อน login หน้า admin โดยตั้ง timeout 10 วินาทีไว้ที่ library ส่วน Cypress รอให้เอง ทุก `cy.get` และ `should` จะลองซ้ำได้นานสุด 10 วินาที ผมจึงแทบไม่ต้องเขียนการรอเลย ยกเว้นเช็ก `svelte-announcer` ใน `adminLogin` ข้อเสียคือถ้าเช็กผิด จะใช้เวลาเต็ม 10 วินาทีกว่าจะ fail (กรณีใส่ชื่อหน้าผิดใช้ 12 วินาที) เขียน QP-01 ใน Cypress ได้เร็วกว่าเพราะไม่ต้องคิดว่าจะวางการรอตรงไหน แต่ test ของ Robot อ่านใกล้กับ test case ที่เขียนไว้มากกว่า เพราะมี keyword อย่าง `Turn On Advanced` ด้าน report นั้น log.html ของ Robot แสดงทุก keyword พร้อมข้อความและฝัง screenshot ไว้ ส่วน Cypress ให้วิดีโอ (QP-01 ประมาณ 1.6 MB) ที่แสดง Command Log ข้างหน้าเว็บ รัน QP-01 เต็มรอบใช้ราว 9.5 วินาทีใน Robot และราว 12 วินาทีต่อ spec ใน Cypress รวมการอัดวิดีโอ

5. สำหรับ Project 2 ผมจะเลือก Cypress เหตุผลแรก มันอัดวิดีโอทุกครั้งที่รันแบบ headless ด้วยการตั้งค่าเดียว (`video: true`) ซึ่งตรงกับหลักฐานการรันเต็มรอบที่ Project 2 ต้องการ เหตุผลที่สอง การลองซ้ำอัตโนมัติทำให้ไม่ต้องเขียนการรอเอง และ `cy.intercept` ทำให้ตรวจได้ทั้งสิ่งที่หน้าเว็บแสดงและสิ่งที่ server ส่งกลับมา (tool และแคลอรี่) จึงจับ bug ได้มากกว่าดูแค่หน้าเว็บ แต่ถ้ากลุ่มตกลงใช้ Robot Framework อยู่แล้ว ผมจะใช้ตามกลุ่ม เพราะไฟล์ resource ก็รวม locator ไว้ที่เดียวได้ดีเหมือนกัน

6. (Part 3) locator ของช่องแคลอรี่คือตัวแปร `${MAX CALORIES}` ในส่วน Variables ของ `resources/quickpizza.resource` ซึ่งใช้ใน `Turn On Advanced` และ `Fill In The Pizza Request` ถ้า QuickPizza เปลี่ยนช่องนี้ ผมแก้แค่บรรทัดเดียวตรงนั้น `pizza_scenario.robot` แค่เรียก keyword อย่าง `Fill In The Pizza Request 600 Knife ${name}` และไม่เห็น locator เลย ไฟล์ test จึงไม่ต้องแก้ และ test อื่นที่ใช้ resource นี้ก็หายพังไปพร้อมกัน

7. (Part 4) Cypress ล้าง cookie, local storage และ alias ก่อนทุก test QuickPizza มีหลาย server และ cookie เป็นตัวผูก browser ไว้กับ server เดียว ส่วนรายการหน้า admin แสดงเฉพาะพิซซ่าของ server นั้น ถ้าแยก step 6 และ 7 เป็น test ที่สอง test นั้นจะเริ่มโดยไม่มี cookie อาจไปเจอ server อื่นที่ไม่มีพิซซ่าของเรา แล้ว `cy.contains('li', pizzaName)` จะ timeout นอกจากนี้ test ที่สองจะไม่มี `pizzaName` และ alias `@tool` จาก test แรก จึงเช็ก tool ไม่ได้เลย
