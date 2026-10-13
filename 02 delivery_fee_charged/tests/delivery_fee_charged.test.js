// import hàm trong file delivery_fee_charged.js
const deliveryFeeCharged = require('../src/delivery_fee_charged');

describe('Delivery Fee Charged', () => {
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
