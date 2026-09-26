// import hàm trong file scholarships.js
const studentScholarShips = require('../src/scholarships');

describe('Student Scholarships', () => {
    test.each([
        //TC     gpa   drl    expected
        ['TC01', 3.60, 90, 'Scholarships1'],
        ['TC02', 3.59, 90, 'Scholarships2'],
        ['TC03', 3.61, 90, 'Scholarships1'],
        ['TC04', 3.60, 89, 'Scholarships2'],
        ['TC05', 3.60, 91, 'Scholarships1'],

        ['TC06', 3.20, 80, 'Scholarships2'],
        ['TC07', 3.19, 80, 'No scholarships'],
        ['TC08', 3.21, 80, 'Scholarships2'],
        ['TC09', 3.20, 79, 'No scholarships'],
        ['TC10', 3.20, 81, 'Scholarships2'],

        ['TC11', 0.00, 0, 'No scholarships'],
        ['TC12', -0.01, 0, 'Invalid'],
        ['TC13', 0.01, 0, 'No scholarships'],
        ['TC14', 0.00, -1, 'Invalid'],
        ['TC15', 0.00, 1, 'No scholarships'],

        ['TC16', 4.00, 100, 'Scholarships1'],
        ['TC17', 3.99, 100, 'Scholarships1'],
        ['TC18', 4.01, 100, 'Invalid'],
        ['TC19', 4.00, 99, 'Scholarships1'],
        ['TC20', 4.00, 101, 'Invalid']
    ])(
        '%s: GPA=%f, DRL=%i',
        (testCase, gpa, drl, expected) => {
            expect(studentScholarShips(gpa, drl)).toBe(expected);
        }
    );
});