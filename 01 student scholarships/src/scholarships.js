// gpa: điểm gpa của sinh viên
// drl: điểm rèn luyện của sinh viên

const studentScholarShips = (gpa, drl) => {
    if (gpa < 0 || gpa > 4 || drl < 0 || drl > 100) {
        return "Invalid";
    }
    else if (gpa >= 3.6 && drl >= 90) {
        return "Scholarships1";
    }
    else if (gpa >= 3.2 && drl >= 80) {
        return "Scholarships2";
    }
    else return "No scholarships";
}

module.exports = studentScholarShips;