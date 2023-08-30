class GPACalculator {
    constructor() {
        this.courses = [];
    }

    addCourse(name, creditHours, gradePoints) {
        this.courses.push({ name, creditHours, gradePoints });
    }

    calculateGPA() {
        let totalCreditPoints = 0.0;
        let totalCreditHours = 0;

        this.courses.forEach((course) => {
            totalCreditPoints += course.creditHours * course.gradePoints;
            totalCreditHours += course.creditHours;
        });

        if (totalCreditHours === 0) {
            return 0.0;
        }

        return totalCreditPoints / totalCreditHours;
    }
}

const courseInputs = document.getElementById('courseInputs');
const resultDiv = document.getElementById('result');

function addCourses() {
    const numCourses = parseInt(document.getElementById('numCourses').value);
    courseInputs.innerHTML = '';

    for (let i = 1; i <= numCourses; i++) {
        const courseDiv = document.createElement('div');
        courseDiv.innerHTML = `
            <label for="courseName${i}">Course ${i}:</label>
            <input type="text" id="courseName${i}" >
            <label for="creditHours${i}">Credit Hours:</label>
            <input type="number" id="creditHours${i}" max="5">
            <label for="gradePoints${i}">Grade Points:</label>
            <input type="number" step="0.01" id="gradePoints${i}" min="0" max="10">
        `;
        courseInputs.appendChild(courseDiv);
    }
}

function calculateGPA() {
    const gpaCalculator = new GPACalculator();
    const numCourses = parseInt(document.getElementById('numCourses').value);

    for (let i = 1; i <= numCourses; i++) {
        const courseName = document.getElementById(`courseName${i}`).value;
        const creditHours = parseInt(document.getElementById(`creditHours${i}`).value);
        const gradePoints = parseFloat(document.getElementById(`gradePoints${i}`).value);

        gpaCalculator.addCourse(courseName, creditHours, gradePoints);
    }

    const gpa = gpaCalculator.calculateGPA();
    resultDiv.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
}
