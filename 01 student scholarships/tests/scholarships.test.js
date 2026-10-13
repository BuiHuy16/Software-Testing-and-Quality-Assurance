// import hàm trong file scholarships.js
const studentScholarShips = require('../src/scholarships');

describe('Student Scholarships', () => {
    test.each([
        //TC     gpa   drl    expected

        // =====================================================
        // Nhóm 1: BVA tại ngưỡng GPA = 3.60 (Học bổng 1)
        // Cố định DRL = 90, thay đổi GPA quanh biên 3.60:
        // 3.59 (dưới biên), 3.60 (tại biên), 3.61 (trên biên).
        // =====================================================
        ['TC01', 3.60, 90, 'Scholarships1'],
        ['TC02', 3.59, 90, 'Scholarships2'],
        ['TC03', 3.61, 90, 'Scholarships1'],

        // BVA tại ngưỡng ĐRL = 90: 
        // Cố định GPA = 3.60, thay đổi ĐRL quanh biên: 
        // 89 (dưới biên), 90 (tại biên), 91 (trên biên). 
        // TC01 đã kiểm tra trường hợp ĐRL = 90 nên không lặp lại.
        ['TC04', 3.60, 89, 'Scholarships2'],
        ['TC05', 3.60, 91, 'Scholarships1'],

        // ===================================================== 
        // Nhóm 2: BVA tại ngưỡng GPA = 3.20 (Học bổng 2) 
        // Cố định ĐRL = 80, thay đổi GPA quanh biên 3.20: 
        // 3.19 (dưới biên), 3.20 (tại biên), 3.21 (trên biên). 
        // =====================================================
        ['TC06', 3.20, 80, 'Scholarships2'],
        ['TC07', 3.19, 80, 'No scholarships'],
        ['TC08', 3.21, 80, 'Scholarships2'],

        // BVA tại ngưỡng ĐRL = 80: 
        // Cố định GPA = 3.20, thay đổi ĐRL quanh biên: 
        // 79 (dưới biên), 80 (tại biên), 81 (trên biên).
        // TC06 đã kiểm tra trường hợp ĐRL = 80 nên không lặp lại.
        ['TC09', 3.20, 79, 'No scholarships'],
        ['TC10', 3.20, 81, 'Scholarships2'],

        // ===================================================== 
        // Nhóm 3: BVA tại biên dưới miền GPA hợp lệ [0.00, 4.00] 
        // 0.00 (tại biên), -0.01 (ngoài miền), 0.01 (trong miền). 
        // =====================================================
        ['TC11', 0.00, 0, 'No scholarships'],
        ['TC12', -0.01, 0, 'Invalid'],
        ['TC13', 0.01, 0, 'No scholarships'],

        // BVA tại biên dưới miền ĐRL hợp lệ [0, 100]: 
        // -1 (ngoài miền), 0 (tại biên), 1 (trong miền). 
        // TC11 đã kiểm tra trường hợp ĐRL = 0 nên không lặp lại.
        ['TC14', 0.00, -1, 'Invalid'],
        ['TC15', 0.00, 1, 'No scholarships'],

        // ===================================================== 
        // Nhóm 4: BVA tại biên trên miền GPA hợp lệ [0.00, 4.00] 
        // 3.99 (trong miền), 4.00 (tại biên), 4.01 (ngoài miền). 
        // =====================================================
        ['TC16', 4.00, 100, 'Scholarships1'],
        ['TC17', 3.99, 100, 'Scholarships1'],
        ['TC18', 4.01, 100, 'Invalid'],

        // BVA tại biên trên miền ĐRL hợp lệ [0, 100]: 
        // 99 (trong miền), 100 (tại biên), 101 (ngoài miền). 
        // TC16 đã kiểm tra trường hợp ĐRL = 100 nên không lặp lại.
        ['TC19', 4.00, 99, 'Scholarships1'],
        ['TC20', 4.00, 101, 'Invalid']
    ])(
        '%s: GPA=%f, DRL=%i',
        (testCase, gpa, drl, expected) => {
            expect(studentScholarShips(gpa, drl)).toBe(expected);
        }
    );
});