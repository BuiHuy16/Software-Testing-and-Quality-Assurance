// import hàm trong file delivery_fee_charged.js
const deliveryFeeCharged = require('../src/delivery_fee_charged');

describe('Delivery Fee Charged', () => {
    test.each([
        // TC    weight  distance  value       expected
        ['TC01', 5.0,    10,       500000,     'Free shipping'],
        ['TC02', 5.0,    10,       499999,     'Shipping fee type 1'],
        ['TC03', 5.0,    10,       500001,     'Free shipping'],
        ['TC04', 4.9,    10,       500000,     'Free shipping'],
        ['TC05', 5.1,    10,       500000,     'Shipping fee type 1'],
        ['TC06', 5.0,    9,        500000,     'Free shipping'],
        ['TC07', 5.0,    11,       500000,     'Shipping fee type 1'],

        ['TC08', 10.0,   30,       50000,      'Shipping fee type 1'],
        ['TC09', 9.9,    30,       50000,      'Shipping fee type 1'],
        ['TC10', 10.1,   30,       50000,      'Shipping fee type 2'],
        ['TC11', 10.0,   29,       50000,      'Shipping fee type 1'],
        ['TC12', 10.0,   31,       50000,      'Shipping fee type 2'],

        ['TC13', 20.0,   60,       50000,      'Shipping fee type 2'],
        ['TC14', 19.9,   60,       50000,      'Shipping fee type 2'],
        ['TC15', 20.1,   60,       50000,      'Shipping fee type 3'],
        ['TC16', 20.0,   59,       50000,      'Shipping fee type 2'],
        ['TC17', 20.0,   61,       50000,      'Shipping fee type 3'],

        ['TC18', 30.0,   100,      20000000,   'Shipping fee type 3'],
        ['TC19', 30.0,   100,      19999999,   'Shipping fee type 3'],
        ['TC20', 30.0,   100,      20000001,   'Invalid'],
        ['TC21', 29.9,   100,      20000000,   'Shipping fee type 3'],
        ['TC22', 30.1,   100,      20000000,   'Invalid'],
        ['TC23', 30.0,   99,       20000000,   'Shipping fee type 3'],
        ['TC24', 30.0,   101,      20000000,   'Invalid'],

        ['TC25', 0.1,    1,        50000,      'Shipping fee type 1'],
        ['TC26', 0.1,    1,        49999,      'Invalid'],
        ['TC27', 0.1,    1,        50001,      'Shipping fee type 1'],
        ['TC28', 0.0,    1,        50000,      'Invalid'],
        ['TC29', 0.2,    1,        50000,      'Shipping fee type 1'],
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