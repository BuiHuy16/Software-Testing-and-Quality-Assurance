# Bài toán 1: Hệ thống xét học bổng sinh viên

## 1 Đặc tả
**Input:**

- Điểm rèn luyện (đrl): $drl\in[0...100]$
- GPA: $gpa \in [0,00......4,00]$

**Output:**

| Điều kiện | Output |
|---|---|
| $gpa\ge3.60$ và đrl $\ge$ 90 | Học bổng 1 |
| $gpa\ge3.20$ và $drl\ge80$ | Học bổng 2 |
| $gpa<3.20$ hoặc đrl $<$ 80 | Không có học bồng |
| gpa ngoài [0,00..4,00] hoặc đi ngoài [0..100] | Invalid |

## 2 Xác định các biên
### a) Biến gpa:
Biên 1: $gpa=0.00$
- Các cận biên: -0.01, 0.00, 0,01

Biên 2: $gpa=3.20$
- Các cận biên: 3.19, 3.20, 3.21

Biên 3: $gpa=3.60$
- Các cận biên: 3.59, 3.60, 3.61

Biên 4: $gpa=4.00$
- Các cận biên: 3.99, 4.00, 4,01

### b) Biến đrl:
Biên 1: $drl=0$
- Các cận biên: -1, 0, 1

Biên 2: $drl=80$
- Các cận biên: 79, 80, 81

Biên 3: $drl=90$
- Các cận biên: 89, 90, 91

Biên 4: $drl=100$
- Các cận biên: 99, 100, 101

## 3 Áp dụng BVA
Ta có các test cases:

| Test Case | GPA | DRL | Expected output |
|---|---|---|---|
| TC01 | 3.60 | 90 | Học bổng 1 |
| TC02 | 3.59 | 90 | Học bổng 2 |
| TC03 | 3.61 | 90 | Học bổng 1 |
| TC04 | 3.60 | 89 | Học bổng 2 |
| TC05 | 3.60 | 91 | Học bổng 1 |
| TC06 | 3.20 | 80 | Học bổng 2 |
| TC07 | 3.19 | 80 | Không có học bồng |
| TC08 | 3.21 | 80 | Học bổng 2 |
| TC09 | 3.20 | 79 | Không có học bổng |
| TC10 | 3.20 | 81 | Học bổng 2 |
| TC11 | 0.00 | 0 | Không có học bổng |
| TC12 | -0.01 | 0 | Invalid |
| TC13 | 0.01 | 0 | Không có học bổng |
| TC14 | 0.00 | -1 | Invalid |
| TC15 | 0.00 | 1 | Không có học bổng |
| TC16 | 4.00 | 100 | Học bổng 1 |
| TC17 | 3.99 | 100 | Học bổng 1 |
| TC18 | 4.01 | 100 | Invalid |
| TC19 | 4.00 | 99 | Học bổng 1 |
| TC20 | 4.00 | 101 | Invalid |

---

# Bài toán 2: Hệ thống tính phí giao hàng

## 1 Đặc tả yêu cầu
**Input:**
- Khối lượng hàng: weight (kg)
- Khoảng cách giao hàng: distance (km)
- Giá trị đơn hàng: value (VNĐ)

**Miền đầu vào:**
- $weight\in[0,1..30,0]$
- $distance\in[1, 100]$
- $value\in[50000, 20000000]$

**Output:**

| Điều kiện | Output |
|---|---|
| value $\ge$ 500.000 và weight $\le$ 5 kg và distance $\le$ 10 km | Miễn phí vận chuyển |
| $weight\le10~kg~v\dot{a}distance\le30~km$ | Phí vận chuyển loại 1 |
| weight 20 kg và distance $\le$ 60 km | Phí vận chuyển loại 2 |
| weight 30 kg và distance $\le$ 100 km | Phí vận chuyển loại 3 |
| Các trường hợp còn lại | Invalid |

## 2 Xác định các biên
### a) Biến weight:
Biên 1: $weight=0.1$
- Các cận biên: 0.0, 0.1, 0,2

Biên 2: $weight=5.0$
- Các cận biên: 4.9, 5.0, 5.1

Biên 3: $weight=10.0$
- Các cận biên: 9.9, 10, 10.1

Biên 4: $weight=20.0$
- Các cận biên: 19.9, 20.0, 20,1

Biên 5: $weight=30.0$
- Các cận biên: 29.9, 30.0, 30,1

### b) Biến distance:
Biên 1: $distance=1$
- Các cận biên: 0, 1, 2

Biên 2: $distance=10$
- Các cận biên: 9, 10, 11

Biên 3: $distance=30$
- Các cận biên: 29, 30, 31

Biên 4: $distance=60$
- Các cận biên: 59, 60, 61

Biên 5: $distance=100$
- Các cận biên: 99, 100, 101

### c) Biến value:
Biên 1: $value=50000$
Các cận biên: 49999, 50000, 50001

Biên 2: $value=500000$
Các cận biên: 499999, 500000, 500001

Biên 3: $value=20000000$
Các cận biên: 19999999, 20000000, 20000001

## 3 Áp dụng BVA
Ta có các test cases:

| Test Case | Khối lượng (weight) Giá trị (value) | Khoảng cách (distance) | Expected output |
|---|---|---|---|
| TC01 | 500.000 5.0 | 10 | Miễn phí |
| TC02 | 499.999 5.0 | 10 | Phí Loại 1 |
| TC03 | 500.001 5.0 | 10 | Miễn phí |
| TC04 | 500.000 4.9 | 10 | Miễn phí |
| TC05 | 500.000 5.1 | 10 | Phí Loại 1 |
| TC06 | 500.000 5.0 | 9 | Miễn phí |
| TC07 | 500.000 5.0 | 11 | Phí Loại 1 |
| TC08 | 50.000 10.0 | 30 | Phí Loại 1 |
| TC09 | 50.000 9.9 | 30 | Phí Loại 1 |
| TC10 | 50.000 10.1 | 30 | Phí Loại 2 |
| TC11 | 50.000 10.0 | 29 | Phí Loại 1 |
| TC12 | 50.000 10.0 | 31 | Phí Loại 2 |
| TC13 | 50.000 20.0 | 60 | Phí Loại 2 |
| TC14 | 50.000 19.9 | 60 | Phí Loại 2 |
| TC15 | 50.000 20.1 | 60 | Phí Loại 3 |
| TC16 | 50.000 | 20.0 | 59 Phí Loại 2 |
| TC17 | 50.000 | 20.0 | Phí Loại 3 61 |
| TC18 | 20.000.000 | 30.0 | Phí Loại 3 100 |
| TC19 | 19.999.999 | 30.0 | Phí Loại 3 100 |
| TC20 | 20.000.001 | 30.0 | Invalid 100 |
| TC21 | 20.000.000 | 29.9 | 100 Phí Loại 3 |
| TC22 | 20.000.000 | 30.1 | Invalid 100 |
| TC23 | 20.000.000 | 30.0 | 99 Phí Loại 3 |
| TC24 | 20.000.000 | 30.0 | Invalid 101 |
| TC25 | 50.000 | 0.1 | Phí Loại 1 1 |
| TC26 | 49.999 | 0.1 | Invalid 1 |
| TC27 | 50.001 | 0.1 | Phí Loại 1 1 |
| TC28 | 50.000 | 0.0 | Invalid 1 |
| TC29 | 50.000 | 0.2 | Phí Loại 1 1 |
| TC30 | 50.000 | 0.1 | Invalid 0 |
| TC31 | 50.000 | 0.1 | Phí Loại 1 2 |