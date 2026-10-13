// import hàm trong file delivery_fee_charged.js
const deliveryFeeCharged = require('../src/delivery_fee_charged');

// 1 Áp dụng phân tích biên (BVA)
describe('Delivery Fee Charged - BVA', () => {
    test.each([
        // =====================================================
        // Nhóm 1: BVA tại điều kiện miễn phí vận chuyển
        // Các ngưỡng: weight = 5 kg, distance = 10 km,
        // value = 500000 VNĐ.
        // TC01: Tất cả biến tại ngưỡng miễn phí.
        // =====================================================
        ['TC01', 5.0,    10,       500000,     'Free shipping'],

        // BVA tại ngưỡng value = 500000:
        // 499999 (dưới biên), 500000 (tại biên),
        // 500001 (trên biên). TC01 đã kiểm tra tại biên.
        ['TC02', 5.0,    10,       499999,     'Shipping fee type 1'],
        ['TC03', 5.0,    10,       500001,     'Free shipping'],

        // BVA tại ngưỡng weight = 5 kg:
        // 4.9 (dưới biên), 5.0 (tại biên), 5.1 (trên biên).
        // Giữ distance = 10 và value = 500000.
        // TC01 đã kiểm tra weight = 5.0.
        ['TC04', 4.9,    10,       500000,     'Free shipping'],
        ['TC05', 5.1,    10,       500000,     'Shipping fee type 1'],

        // BVA tại ngưỡng distance = 10 km:
        // 9 (dưới biên), 10 (tại biên), 11 (trên biên).
        // Giữ weight = 5 và value = 500000.
        // TC01 đã kiểm tra distance = 10.
        ['TC06', 5.0,    9,        500000,     'Free shipping'],
        ['TC07', 5.0,    11,       500000,     'Shipping fee type 1'],

        // =====================================================
        // Nhóm 2: BVA tại ngưỡng phí vận chuyển loại 1
        // Các ngưỡng: weight = 10 kg, distance = 30 km.
        // Dùng value = 50000 để loại trừ điều kiện miễn phí.
        // =====================================================

        // BVA tại weight = 10 kg:
        // 9.9 (dưới biên), 10.0 (tại biên), 10.1 (trên biên).
        // Giữ distance = 30 và value = 50000.
        ['TC08', 10.0,   30,       50000,      'Shipping fee type 1'],
        ['TC09', 9.9,    30,       50000,      'Shipping fee type 1'],
        ['TC10', 10.1,   30,       50000,      'Shipping fee type 2'],

        // BVA tại distance = 30 km:
        // 29 (dưới biên), 30 (tại biên), 31 (trên biên).
        // Giữ weight = 10 và value = 50000.
        // TC08 đã kiểm tra distance = 30.
        ['TC11', 10.0,   29,       50000,      'Shipping fee type 1'],
        ['TC12', 10.0,   31,       50000,      'Shipping fee type 2'],

        // =====================================================
        // Nhóm 3: BVA tại ngưỡng phí vận chuyển loại 2
        // Các ngưỡng: weight = 20 kg, distance = 60 km.
        // =====================================================

        // BVA tại weight = 20 kg:
        // 19.9 (dưới biên), 20.0 (tại biên), 20.1 (trên biên).
        // Giữ distance = 60 và value = 50000.
        ['TC13', 20.0,   60,       50000,      'Shipping fee type 2'],
        ['TC14', 19.9,   60,       50000,      'Shipping fee type 2'],
        ['TC15', 20.1,   60,       50000,      'Shipping fee type 3'],

        // BVA tại distance = 60 km:
        // 59 (dưới biên), 60 (tại biên), 61 (trên biên).
        // Giữ weight = 20 và value = 50000.
        // TC13 đã kiểm tra distance = 60.
        ['TC16', 20.0,   59,       50000,      'Shipping fee type 2'],
        ['TC17', 20.0,   61,       50000,      'Shipping fee type 3'],

        // =====================================================
        // Nhóm 4: BVA tại biên trên miền đầu vào
        // weight thuộc [0.1, 30.0], distance thuộc [1, 100],
        // value thuộc [50000, 20000000].
        // =====================================================

        // BVA tại value = 20000000:
        // 19999999 (dưới biên), 20000000 (tại biên),
        // 20000001 (trên biên).
        ['TC18', 30.0,   100,      20000000,   'Shipping fee type 3'],
        ['TC19', 30.0,   100,      19999999,   'Shipping fee type 3'],
        ['TC20', 30.0,   100,      20000001,   'Invalid'],

        // BVA tại weight = 30 kg:
        // 29.9 (dưới biên), 30.0 (tại biên), 30.1 (trên biên).
        // Giữ distance = 100 và value = 20000000.
        // TC18 đã kiểm tra weight = 30.0.
        ['TC21', 29.9,   100,      20000000,   'Shipping fee type 3'],
        ['TC22', 30.1,   100,      20000000,   'Invalid'],

        // BVA tại distance = 100 km:
        // 99 (dưới biên), 100 (tại biên), 101 (trên biên).
        // Giữ weight = 30 và value = 20000000.
        // TC18 đã kiểm tra distance = 100.
        ['TC23', 30.0,   99,       20000000,   'Shipping fee type 3'],
        ['TC24', 30.0,   101,      20000000,   'Invalid'],

        // =====================================================
        // Nhóm 5: BVA tại biên dưới miền đầu vào
        // =====================================================

        // BVA tại weight = 0.1 kg:
        // 0.0 (dưới biên, ngoài miền), 0.1 (tại biên),
        // 0.2 (trên biên, trong miền).
        // Giữ distance = 1 và value = 50000.
        ['TC25', 0.1,    1,        50000,      'Shipping fee type 1'],
        ['TC26', 0.1,    1,        49999,      'Invalid'],
        ['TC27', 0.1,    1,        50001,      'Shipping fee type 1'],
        ['TC28', 0.0,    1,        50000,      'Invalid'],
        ['TC29', 0.2,    1,        50000,      'Shipping fee type 1'],

        // BVA tại distance = 1 km:
        // 0 (dưới biên, ngoài miền), 1 (tại biên),
        // 2 (trên biên, trong miền).
        // Giữ weight = 0.1 và value = 50000.
        // TC25 đã kiểm tra distance = 1.
        ['TC30', 0.1,    0,        50000,      'Invalid'],
        ['TC31', 0.1,    2,        50000,      'Shipping fee type 1']
    ])(
        '%s - weight=%f, distance=%f, value=%i',
        (testCase, weight, distance, value, expected) => {
            expect(
                deliveryFeeCharged(weight, distance, value)
            ).toBe(expected);
        }
    );

});

// 2 Áp dụng phân hoạch tương đương (ECT)
describe('Delivery Fee Charged - ECT', () => {
    test.each([
        // TC, Phân hoạch (V-W-D), value, weight, distance, Expected

        // TC01: V1-W1-D1
        // Giá trị cao, khối lượng và khoảng cách thấp
        // Thỏa điều kiện miễn phí vận chuyển
        ['TC01', 'V1-W1-D1', 1000000, 3.0, 5, 'Free shipping'],

        // TC02: V2-W2-D2
        // Giá trị thấp hơn ngưỡng miễn phí
        // Khối lượng và khoảng cách thuộc mức phí loại 1
        ['TC02', 'V2-W2-D2', 200000, 8.0, 20, 'Shipping fee type 1'],

        // TC03: V1-W3-D3
        // Khối lượng và khoảng cách thuộc mức phí loại 2
        ['TC03', 'V1-W3-D3', 1000000, 15.0, 45, 'Shipping fee type 2'],

        // TC04: V2-W4-D4
        // Khối lượng và khoảng cách thuộc mức phí loại 3
        ['TC04', 'V2-W4-D4', 200000, 25.0, 80, 'Shipping fee type 3'],

        // TC05: V1-W5-D1
        // Weight thuộc lớp không hợp lệ: weight < 0.1
        ['TC05', 'V1-W5-D1', 1000000, 0.0, 5, 'Invalid'],

        // TC06: V1-W6-D1
        // Weight thuộc lớp không hợp lệ: weight > 30
        ['TC06', 'V1-W6-D1', 1000000, 35.0, 5, 'Invalid'],

        // TC07: V1-W1-D5
        // Distance thuộc lớp không hợp lệ: distance < 1
        ['TC07', 'V1-W1-D5', 1000000, 3.0, 0, 'Invalid'],

        // TC08: V1-W1-D6
        // Distance thuộc lớp không hợp lệ: distance > 100
        ['TC08', 'V1-W1-D6', 1000000, 3.0, 120, 'Invalid'],

        // TC09: V3-W1-D1
        // Value thuộc lớp không hợp lệ: value < 50000
        ['TC09', 'V3-W1-D1', 40000, 3.0, 5, 'Invalid'],

        // TC10: V4-W1-D1
        // Value thuộc lớp không hợp lệ: value > 20000000
        ['TC10', 'V4-W1-D1', 25000000, 3.0, 5, 'Invalid'],

    ])(
        '%s - Partition=%s, value=%i, weight=%f, distance=%i',
        (testCase, partition, value, weight, distance, expected) => {
            // Chỉ value, weight và distance là input của hàm.
            // partition chỉ dùng để mô tả lớp tương đương.
            expect(
                deliveryFeeCharged(weight, distance, value)
            ).toBe(expected);
        }
    );
});

// 3 Áp dụng kiểm thử dựa trên bảng quyết định (DTT)
describe('Delivery Fee Charged - DTT', () => {
    test.each([
        // TC, Rule, weight, distance, value, Expected

        // R1: Weight không hợp lệ (weight > 30)
        ['TC01', 'R1', 35.0, 20, 600000, 'Invalid'],

        // R2: Weight hợp lệ nhưng distance không hợp lệ (distance > 100)
        ['TC02', 'R2', 4.0, 120, 600000, 'Invalid'],

        // R3: Weight và distance hợp lệ nhưng value < 50000
        ['TC03', 'R3', 4.0, 20, 30000, 'Invalid'],

        // R4: Weight thuộc (20, 30]
        ['TC04', 'R4', 25.0, 20, 600000, 'Shipping fee type 3'],

        // R5: Weight <= 20 nhưng distance thuộc (60, 100]
        ['TC05', 'R5', 15.0, 80, 600000, 'Shipping fee type 3'],

        // R6: Weight thuộc (10, 20] và distance <= 60
        ['TC06', 'R6', 15.0, 20, 600000, 'Shipping fee type 2'],

        // R7: Weight <= 10 nhưng distance thuộc (30, 60]
        ['TC07', 'R7', 8.0, 45, 600000, 'Shipping fee type 2'],

        // R8: Weight thuộc (5, 10] và distance <= 30
        ['TC08', 'R8', 8.0, 8, 600000, 'Shipping fee type 1'],

        // R9: Weight <= 5 nhưng distance thuộc (10, 30]
        ['TC09', 'R9', 3.0, 20, 600000, 'Shipping fee type 1'],

        // R10: Weight <= 5, distance <= 10 nhưng value < 500000
        ['TC10', 'R10', 3.0, 8, 200000, 'Shipping fee type 1'],

        // R11: Weight <= 5, distance <= 10 và value >= 500000
        ['TC11', 'R11', 3.0, 8, 600000, 'Free shipping'],

    ])(
        '%s - Rule %s, weight=%f, distance=%i, value=%i',
        (testCase, rule, weight, distance, value, expected) => {
            // Rule chỉ dùng để mô tả quy tắc trong bảng quyết định.
            // Hàm thực tế chỉ nhận weight, distance và value.
            expect(
                deliveryFeeCharged(weight, distance, value)
            ).toBe(expected);
        }
    );
});