# Bài toán 1: Hệ thống xét học bổng sinh viên

## 1 Đặc tả

**Các biến input:**
- Điểm rèn luyện (đrl): $drl \in [0..100]$
- GPA: $gpa \in [0,00..4,00]$

**Output:**

| Điều kiện | Output | 
| ----- | ----- | 
| $gpa \ge 3.60$ và $drl \ge 90$ | Học bổng 1 | 
| $gpa \ge 3.20$ và $drl \ge 80$ | Học bổng 2 | 
| $gpa < 3.20$ hoặc $drl < 80$ | Không có học bổng | 
| gpa ngoài \[0,00..4,00\] hoặc đrl ngoài \[0..100\] | Invalid | 

## 2 Áp dụng bảng quyết định

| Phân loại | Quy luật / Điều kiện | R1 | R2 | R3 | R4 | R5 | R6 | R7 | 
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | 
| **Điều kiện** | C1: $gpa \in [0,00..4,00]$ | F | T | T | T | T | T | T | 
| | C2: $drl \in [0..100]$ | | F | T | T | T | T | T | 
| | C3: $gpa \ge 3.20$ | | | F | T | T | T | T | 
| | C4: $drl \ge 80$ | | | | F | T | T | T | 
| | C5: $gpa \ge 3.60$ | | | | | F | T | T | 
| | C6: $drl \ge 90$ | | | | | | F | T | 
| **Hành động** | A1: Học bổng 1 | | | | | | | X | 
| | A2: Học bổng 2 | | | | | X | X | | 
| | A3: Không có học bổng | | | X | X | | | | 
| | A4: Invalid | X | X | | | | | | 

## 3 Các test case:

| Test case | Quy tắc | GPA | DRL | Mô tả điều kiện kiểm thử | Expected Output | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| TC01 | R1 | \-1.00 | 85 | gpa không thuộc \[0,00 .. 4,00\] (không hợp lệ) | Invalid | 
| TC02 | R2 | 3.40 | 105 | gpa hợp lệ, nhưng đrl không thuộc \[0.. 100\] (Không hợp lệ) | Invalid | 
| TC03 | R3 | 2.50 | 85 | Hợp lệ, nhưng $gpa < 3.20$ | Không có học bổng | 
| TC04 | R4 | 3.50 | 70 | Hợp lệ, $gpa \ge 3.20$ nhưng $drl < 80$ | Không có học bổng | 
| TC05 | R5 | 3.40 | 85 | gpa thuộc \[3,20 .. 3,59\] và $drl \ge 80$ | Học bổng 2 | 
| TC06 | R6 | 3.80 | 85 | gpa thuộc \[3,60 .. 4,00\] và đrl thuộc \[80 .. 89\] | Học bổng 2 | 
| TC07 | R7 | 3.80 | 95 | gpa thuộc \[3,60 .. 4,00\] và đrl thuộc \[90 .. 100\] | Học bổng 1 | 

# Bài toán 2: Hệ thống tính phí giao hàng

## 1 Đặc tả

**Các biến input:**
- Khối lượng hàng: weight (kg)
- Khoảng cách giao hàng: distance (km)
- Giá trị đơn hàng: value (VNĐ)

**Miền đầu vào:**
* weight $\in [0,1..30,0]$
* distance $\in [1..100]$
* value $\in [50000..20000000]$

**Output:**

| Điều kiện | Output | 
| ----- | ----- | 
| $value \ge 500.000$ và $weight \le 5$ kg và distance $\le$ 10 km | Miễn phí vận chuyển | 
| $weight \le 10$ kg và $distance \le 30$ km | Phí vận chuyển loại 1 | 
| weight $\le$ 20 kg và distance $\le$ 60 km | Phí vận chuyển loại 2 | 
| weight $\le$ 30 kg và distance $\le$ 100 km | Phí vận chuyển loại 3 | 
| Các trường hợp còn lại | Invalid | 

## 2 Áp dụng bảng quyết định

| Phân loại | Quy luật / Điều kiện | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | 
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | 
| **Điều kiện** | C1: weight $\in$ \[0,1..30,0\] | F | T | T | T | T | T | T | T | T | T | T | 
| | C2: distance $\in$ \[1..100\] | | F | T | T | T | T | T | T | T | T | T | 
| | C3: value $\in$ \[50.000..20.000.000\] | | | F | T | T | T | T | T | T | T | T | 
| | C4: weight $\le$ 20 | | | | F | T | T | T | T | T | T | T | 
| | C5: distance $\le$ 60 | | | | | F | T | T | T | T | T | T | 
| | C6: weight $\le$ 10 | | | | | | F | T | T | T | T | T | 
| | C7: distance $\le$ 30 | | | | | | | F | T | T | T | T | 
| | C8: weight $\le$ 5 | | | | | | | | F | T | T | T | 
| | C9: distance $\le$ 10 | | | | | | | | | F | T | T | 
| | C10: value $\ge$ 500.000 | | | | | | | | | | F | T | 
| **Hành động** | A1: Miễn phí vận chuyển | | | | | | | | | | | X | 
| | A2: Phí vận chuyển loại 1 | | | | | | | | X | X | X | | 
| | A3: Phí vận chuyển loại 2 | | | | | | X | X | | | | | 
| | A4: Phí vận chuyển loại 3 | | | | X | X | | | | | | | 
| | A5: Invalid | X | X | X | | | | | | | | | 

## 3 Các test case

| Test case | Quy tắc | Khối lượng (weight) | Khoảng cách (distance) | Giá trị (value) | Mô tả điều kiện kiểm thử | Expected Output | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| TC01 | R1 | 35,0 | 20 | 600.000 | weight không thuộc \[0,1 .. 30,0\] | Invalid | 
| TC02 | R2 | 4,0 | 120 | 600.000 | weight hợp lệ, nhưng distance không thuộc \[1..100\] | Invalid | 
| TC03 | R3 | 4,0 | 20 | 30.000 | weight, distance hợp lệ, nhưng value không thuộc \[50.000 .. 20.000.000\] | Invalid | 
| TC04 | R4 | 25,0 | 20 | 600.000 | Hợp lệ, weight thuộc (20,0 .. 30,0\] | Phí vận chuyển loại 3 | 
| TC05 | R5 | 15,0 | 80 | 600.000 | Hợp lệ, weight $\le 20$ nhưng distance thuộc (60.. 100\] | Phí vận chuyển loại 3 | 
| TC06 | R6 | 15,0 | 20 | 600.000 | Hợp lệ, weight thuộc (10,0 .. 20,0\] và distance $\le 60$ | Phí vận chuyển loại 2 | 
| TC07 | R7 | 8,0 | 45 | 600.000 | Hợp lệ, weight $\le 10$ nhưng distance thuộc (30.. 60\] | Phí vận chuyển loại 2 | 
| TC08 | R8 | 8,0 | 8 | 600.000 | Hợp lệ, weight thuộc (5,0.. 10,0\] và distance $\le 30$ | Phí vận chuyển loại 1 | 
| TC09 | R9 | 3,0 | 20 | 600.000 | Hợp lệ, weight $\le 5$ nhưng distance thuộc (10 .. 30\] | Phí vận chuyển loại 1 | 
| TC10 | R10 | 3,0 | 8 | 200.000 | weight $\le 5$, distance $\le 10$ nhưng value $<$ 500.000 | Phí vận chuyển loại 1 | 
| TC11 | R11 | 3,0 | 8 | 600.000 | weight $\le 5$, distance $\le 10$ và value $\ge 500.000$ | Miễn phí vận chuyển | 