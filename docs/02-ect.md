# Bài toán 1: Hệ thống xét học bổng sinh viên

## 1 Đặc tả

**Các biến input:**
- Điểm rèn luyện (đrl): $drl\in[0..100]$
- GPA: $gpa \in [0,00..4,00]$

**Output:**

| Điều kiện | Output | 
| ----- | ----- | 
| $gpa\ge3.60$ và $drl\ge90$ | Học bổng 1 | 
| $gpa\ge3.20$ và $drl\ge80$ | Học bổng 2 | 
| $gpa<3.20$ hoặc $drl<80$ | Không có học bổng | 
| gpa ngoài \[0,00..4,00\] hoặc đrl ngoài \[0..100\] | Invalid | 

## 2 Phân hoạch tương đương

### a) Phân hoạch của gpa:

$G = G1 \cup G2 \cup G3 \cup G4 \cup G5$

Trong đó:
- $G1=\{gpa\in R|3.60\le gpa\le4.00\}$
- $G2=\{gpa\in R|3.20\le gpa<3.60\}$
- $G3=\{gpa\in R|0.00\le gpa<3.20\}$
- $G4=\{gpa \in R | gpa < 0.00\}$ (lớp không hợp lệ)
- $G5=\{gpa\in R|gpa>4.00\}$ (lớp không hợp lệ)

### b) Phân hoạch của đrl:

$D = D1 \cup D2 \cup D3 \cup D4 \cup D5$

Trong đó:
- $D1=\{drl\in N|90\le drl\le100\}$
- $D2=\{drl\in N|80\le drl<90\}$
- $D3=\{drl\in N|0\le drl<80\}$
- $D4=\{drl\in N|drl<0\}$ (lớp không hợp lệ)
- $D5=\{drl\in N|drl>100\}$ (lớp không hợp lệ)

## 3 Áp dụng ECT

Ở đây ta dùng ECT mạnh đối với các lớp dữ liệu hợp lệ và ECT mạnh mẽ yếu đối với các lớp dữ liệu không hợp lệ.

Ta có các test cases:

| Test case | Lớp GPA | Lớp DRL | GPA | DRL | Expected Output | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| TC01 | G1 | D1 | 3.8 | 95 | Học bổng 1 | 
| TC02 | G1 | D2 | 3.8 | 85 | Học bổng 2 | 
| TC03 | G1 | D3 | 3.8 | 75 | Không có học bổng | 
| TC04 | G2 | D1 | 3.4 | 95 | Học bổng 2 | 
| TC05 | G2 | D2 | 3.4 | 85 | Học bổng 2 | 
| TC06 | G2 | D3 | 3.4 | 75 | Không có học bổng | 
| TC07 | G3 | D1 | 2.5 | 95 | Không có học bổng | 
| TC08 | G3 | D2 | 2.5 | 85 | Không có học bổng | 
| TC09 | G3 | D3 | 2.5 | 75 | Không có học bổng | 
| TC10 | G4 | D1 | \-0.5 | 95 | Invalid | 
| TC11 | G5 | D1 | 4.5 | 95 | Invalid | 
| TC12 | G1 | D4 | 3.8 | \-5 | Invalid | 
| TC13 | G1 | D5 | 3.8 | 110 | Invalid | 

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
| $value \ge 500.000$ và $weight \le 5$ kg và $distance \le 10$ km | Miễn phí vận chuyển | 
| $weight \le 10$ kg và $distance \le 30$ km | Phí vận chuyển loại 1 | 
| $weight \le 20$ kg và $distance \le 60$ km | Phí vận chuyển loại 2 | 
| $weight \le 30$ kg và $distance \le 100$ km | Phí vận chuyển loại 3 | 
| Các trường hợp còn lại | Invalid | 

## 2 Phân hoạch tương đương

### a) Phân hoạch của weight:

$W = W1 \cup W2 \cup W3 \cup W4 \cup W5 \cup W6$

Trong đó:
- $W1=\{weight\in R|0.1\le weight\le5.0\}$
- $W2=\{weight\in R|5.0<weight\le10.0\}$
- $W3=\{weight\in R|10.0<weight\le20.0\}$
- $W4=\{weight\in R|20.0<weight\le30.0\}$
- $W5=\{weight\in R|weight<0.1\}$ (lớp không hợp lệ)
- $W6=\{weight\in R|weight>30.0\}$ (lớp không hợp lệ)

### b) Phân hoạch của distance:

$D = D1 \cup D2 \cup D3 \cup D4 \cup D5 \cup D6$

Trong đó:
- $D1=\{distance\in N|1\le distance\le10\}$
- $D2=\{distance\in N|10<distance\le30\}$
- $D3=\{distance\in N|30<distance\le60\}$
- $D4=\{distance\in N|60<distance\le100\}$
- $D5=\{distance \in N | distance < 1\}$ (lớp không hợp lệ)
- $D6=\{distance \in N | distance > 100\}$ (lớp không hợp lệ)

### c) Phân hoạch của value:

$V = V1 \cup V2 \cup V3 \cup V4$

Trong đó:
- $V1=\{value\in N|500000\le value\le200000000\}$
- $V2=\{value\in N|50000\le value<500000\}$
- $V3=\{value\in N|value<50000\}$ (lớp không hợp lệ)
- $V4=\{value\in N|value>20000000\}$ (lớp không hợp lệ)

## 3 Áp dụng ECT

Ở đây ta dùng ECT mạnh mẽ yếu.

Ta có các test cases:

| Test case | Phân hoạch (V - W - D) | Giá trị (value) | Khối lượng (weight) | Khoảng cách (distance) | Expected Output | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| TC01 | V1-W1-D1 | 1,000,000 | 3.0 | 5 | Miễn phí vận chuyển | 
| TC02 | V2-W2-D2 | 200,000 | 8.0 | 20 | Phí vận chuyển loại 1 | 
| TC03 | V1-W3-D3 | 1,000,000 | 15.0 | 45 | Phí vận chuyển loại 2 | 
| TC04 | V2-W4-D4 | 200,000 | 25.0 | 80 | Phí vận chuyển loại 3 | 
| TC05 | V1-W5-D1 | 1,000,000 | 0.0 | 5 | Invalid | 
| TC06 | V1-W6-D1 | 1,000,000 | 35.0 | 5 | Invalid | 
| TC07 | V1-W1-D5 | 1,000,000 | 3.0 | 0 | Invalid | 
| TC08 | V1-W1-D6 | 1,000,000 | 3.0 | 120 | Invalid | 
| TC09 | V3-W1-D1 | 40,000 | 3.0 | 5 | Invalid | 
| TC10 | V4-W1-D1 | 25,000,000 | 3.0 | 5 | Invalid | 
