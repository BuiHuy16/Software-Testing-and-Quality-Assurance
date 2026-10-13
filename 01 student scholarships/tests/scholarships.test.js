// import hàm trong file scholarships.js
const studentScholarShips = require('../src/scholarships');

// 1 Áp dụng phân tích biên (BVA)
describe('Student Scholarships - BVA', () => {
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


// 2 Áp dụng phân hoạch tương đương (ECT)
describe('Student Scholarships - ECT', () => {
    test.each([
        // TC, GPA class, DRL class, GPA, DRL, Expected

        // G1: GPA thuộc [3.60, 4.00]
        // D1: DRL thuộc [90, 100]
        ['TC01', 'G1', 'D1', 3.8, 95, 'Scholarships1'],

        // GPA thuộc G1, DRL thuộc D2 [80, 90)
        ['TC02', 'G1', 'D2', 3.8, 85, 'Scholarships2'],

        // GPA thuộc G1, DRL thuộc D3 [0, 80)
        ['TC03', 'G1', 'D3', 3.8, 75, 'No scholarships'],

        // G2: GPA thuộc [3.20, 3.60)
        // GPA thuộc G2, DRL thuộc D1
        ['TC04', 'G2', 'D1', 3.4, 95, 'Scholarships2'],

        // GPA thuộc G2, DRL thuộc D2
        ['TC05', 'G2', 'D2', 3.4, 85, 'Scholarships2'],

        // GPA thuộc G2, DRL thuộc D3
        ['TC06', 'G2', 'D3', 3.4, 75, 'No scholarships'],

        // G3: GPA thuộc [0, 3.20)
        // GPA thuộc G3, DRL thuộc D1
        ['TC07', 'G3', 'D1', 2.5, 95, 'No scholarships'],

        // GPA thuộc G3, DRL thuộc D2
        ['TC08', 'G3', 'D2', 2.5, 85, 'No scholarships'],

        // GPA thuộc G3, DRL thuộc D3
        ['TC09', 'G3', 'D3', 2.5, 75, 'No scholarships'],

        // G4: GPA < 0, đầu vào không hợp lệ
        ['TC10', 'G4', 'D1', -0.5, 95, 'Invalid'],

        // G5: GPA > 4.00, đầu vào không hợp lệ
        ['TC11', 'G5', 'D1', 4.5, 95, 'Invalid'],

        // D4: DRL < 0, đầu vào không hợp lệ
        ['TC12', 'G1', 'D4', 3.8, -5, 'Invalid'],

        // D5: DRL > 100, đầu vào không hợp lệ
        ['TC13', 'G1', 'D5', 3.8, 110, 'Invalid'],
    ])(
        '%s - GPA class=%s, DRL class=%s, GPA=%f, DRL=%f',
        (testCase, gpaClass, drlClass, gpa, drl, expected) => {
            // Chỉ GPA và DRL là input của hàm cần kiểm thử.
            // gpaClass và drlClass chỉ dùng để mô tả test case.
            expect(studentScholarShips(gpa, drl)).toBe(expected);
        }
    );
});

// 3 Áp dụng kiểm thử dựa trên bảng quyết định (DTT)
describe('Student Scholarships - DTT', () => {
    test.each([
        // TC, Rule, GPA,  DRL, Expected

        // R1: GPA nằm ngoài miền hợp lệ [0, 4]
        ['TC01', 'R1', -1.00, 85,  'Invalid'],

        // R2: GPA hợp lệ nhưng DRL nằm ngoài miền [0, 100]
        ['TC02', 'R2',  3.40, 105, 'Invalid'],

        // R3: GPA < 3.20 nên không đủ điều kiện nhận học bổng
        ['TC03', 'R3',  2.50, 85,  'No scholarships'],

        // R4: GPA >= 3.20 nhưng DRL < 80
        ['TC04', 'R4',  3.50, 70,  'No scholarships'],

        // R5: GPA thuộc [3.20, 3.60) và DRL >= 80
        ['TC05', 'R5',  3.40, 85,  'Scholarships2'],

        // R6: GPA >= 3.60 và DRL thuộc [80, 90)
        ['TC06', 'R6',  3.80, 85,  'Scholarships2'],

        // R7: GPA >= 3.60 và DRL >= 90
        ['TC07', 'R7',  3.80, 95,  'Scholarships1'],

    ])(
        '%s - Rule %s, GPA=%f, DRL=%i',
        (testCase, rule, gpa, drl, expected) => {
            // Rule chỉ dùng để mô tả test case.
            // Hàm cần kiểm thử chỉ nhận GPA và DRL.
            expect(studentScholarShips(gpa, drl)).toBe(expected);
        }
    );
});