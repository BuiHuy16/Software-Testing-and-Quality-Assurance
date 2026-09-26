# Software Testing Exercises

Bài tập thực hành môn **Kiểm thử và Đảm bảo chất lượng phần mềm**, sử dụng **JavaScript** và **Jest**

## Mục lục

1. [Bài toán học bổng (student scholarships)](#1-bài-toán-học-bổng-student-scholarships)
2. [Bài toán giao hàng (delivery fee charged)](#2-bài-toán-giao-hàng-delivery-fee-charged)
3. [Hướng dẫn cài đặt](#3-hướng-dẫn-cài-đặt)

---

## 1. Bài toán học bổng (student scholarships)

### Input

* **Điểm rèn luyện (ĐRL):** `drl ∈ [0, 100]`
* **GPA:** `gpa ∈ [0.00, 4.00]`

### Output

| Điều kiện                                              | Output            |
| ------------------------------------------------------ | ----------------- |
| `gpa ≥ 3.60` và `drl ≥ 90`                             | Học bổng 1        |
| `gpa ≥ 3.20` và `drl ≥ 80`                             | Học bổng 2        |
| `gpa < 3.20` hoặc `drl < 80`                           | Không có học bổng |
| `gpa` ngoài `[0.00, 4.00]` hoặc `drl` ngoài `[0, 100]` | Invalid           |


---

## 2. Bài toán giao hàng (delivery fee charged)

### Input

* **Khối lượng hàng:** `weight` (kg)
* **Khoảng cách giao hàng:** `distance` (km)
* **Giá trị đơn hàng:** `value` (VNĐ)

### Miền đầu vào

* `weight ∈ [0.1, 30.0]`
* `distance ∈ [1, 100]`
* `value ∈ [50,000, 20,000,000]`

### Output

| Điều kiện                                                  | Output                 |
| ---------------------------------------------------------- | ---------------------- |
| `value ≥ 500,000` và `weight ≤ 5 kg` và `distance ≤ 10 km` | Miễn phí vận chuyển    |
| `weight ≤ 10 kg` và `distance ≤ 30 km`                     | Phí vận chuyển loại 1  |
| `weight ≤ 20 kg` và `distance ≤ 60 km`                     | Phí vận chuyển loại 2  |
| `weight ≤ 30 kg` và `distance ≤ 100 km`                    | Phí vận chuyển loại 3  |
| Các trường hợp hợp lệ còn lại                              | Không hỗ trợ giao hàng |
| Các trường hợp nằm ngoài miền đầu vào                      | Invalid                |


---

## 3. Hướng dẫn cài đặt

### Yêu cầu

* [Node.js](https://nodejs.org/) phiên bản 18 trở lên
* npm

Kiểm tra Node.js và npm:

```bash
node -v
npm -v
```

### Cài đặt project

Clone repository:

```bash
git clone https://github.com/BuiHuy16/INT3317-Software-Testing-and-Quality-Assurance.git
```

Di chuyển vào thư mục project:

```bash
cd INT3317-Software-Testing-and-Quality-Assurance
```

Cài đặt các package cần thiết:

```bash
npm install
```

Đảm bảo sau khi chạy xong dòng này thì type phải là "commonjs"

Project sử dụng **Jest** để thực hiện unit test.

Nếu cần cài Jest thủ công:

```bash
npm install --save-dev jest
```

---

## Chạy test

Chạy toàn bộ test:

```bash
npm test
```

Chạy test của bài toán học bổng:

```bash
npx jest "01 student scholarships"
```

Chạy test của bài toán giao hàng:

```bash
npx jest "02 delivery_fee_charged"
```

Chạy test với thông tin chi tiết:

```bash
npx jest --verbose
```

---

## Công nghệ sử dụng

* **JavaScript**
* **Node.js**
* **Jest**
* **Boundary Value Analysis (BVA)**
* **Unit Testing**
