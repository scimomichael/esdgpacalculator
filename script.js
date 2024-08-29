let semesterCount = 1;
let decimalPlaces = 3; // Default decimal places for GPA
let previousGPAs = []; // Array to store imported GPAs

// Function to add a new semester
function addSemester() {
    semesterCount++;
    const semesterContainer = document.getElementById('semesters-container');
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'semester shadow p-4 mb-5 bg-white rounded position-relative';
    semesterDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-4">Semester ${semesterCount}</h3>
            <button class="btn btn-link text-danger" onclick="confirmRemoveSemester(${semesterCount})"><i class="fas fa-trash"></i></button>
        </div>
        <div id="classes-container-${semesterCount}" class="classes-container">
            <div class="class-item form-row align-items-end mb-3">
                <div class="col-md-4 mb-3">
                    <label for="class-name-${semesterCount}-1">Class Name</label>
                    <input type="text" class="form-control" id="class-name-${semesterCount}-1" placeholder="Enter class name">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-grade-${semesterCount}-1">Class Grade</label>
                    <select class="form-control" id="class-grade-${semesterCount}-1">
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-type-${semesterCount}-1">Class Type</label>
                    <select class="form-control" id="class-type-${semesterCount}-1">
                        <option value="Regular">Regular</option>
                        <option value="Honors">Honors</option>
                        <option value="AP">AP</option>
                    </select>
                </div>
                <div class="col-md-2 mb-3 text-center">
                    <button class="btn btn-outline-danger" onclick="removeClass(this)"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-secondary" onclick="addClass(${semesterCount})"><i class="fas fa-plus"></i> Add Class</button>
            <button class="btn btn-outline-info" onclick="calculateSemesterGPA(${semesterCount})"><i class="fas fa-calculator"></i> Calculate Semester GPA</button>
        </div>
        <div class="text-center mt-2">
            <button class="btn btn-link text-secondary" onclick="confirmClearSemester(${semesterCount})"><i class="fas fa-eraser"></i> Clear Semester</button>
        </div>
    `;
    semesterContainer.appendChild(semesterDiv);
    updateCalculateSemesterButtons();
}

// Function to add a new class
function addClass(semesterId) {
    const classesContainer = document.getElementById(`classes-container-${semesterId}`);
    const classCount = classesContainer.querySelectorAll('.class-item').length + 1;
    const classItem = document.createElement('div');
    classItem.className = 'class-item form-row align-items-end mb-3';
    classItem.innerHTML = `
        <div class="col-md-4 mb-3">
            <label for="class-name-${semesterId}-${classCount}">Class Name</label>
            <input type="text" class="form-control" id="class-name-${semesterId}-${classCount}" placeholder="Enter class name">
        </div>
        <div class="col-md-3 mb-3">
            <label for="class-grade-${semesterId}-${classCount}">Class Grade</label>
            <select class="form-control" id="class-grade-${semesterId}-${classCount}">
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        </div>
        <div class="col-md-3 mb-3">
            <label for="class-type-${semesterId}-${classCount}">Class Type</label>
            <select class="form-control" id="class-type-${semesterId}-${classCount}">
                <option value="Regular">Regular</option>
                <option value="Honors">Honors</option>
                <option value="AP">AP</option>
            </select>
        </div>
        <div class="col-md-2 mb-3 text-center">
            <button class="btn btn-outline-danger" onclick="removeClass(this)"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
    classesContainer.appendChild(classItem);
}

// Function to remove a class with checks for last class removal
function removeClass(element) {
    const semesterContainer = element.closest('.semester');
    const classesContainer = semesterContainer.querySelector('.classes-container');
    const classItems = classesContainer.querySelectorAll('.class-item');

    if (classItems.length === 1) {
        if (semesterCount === 1) {
            showAlert('You cannot remove this class because it is the last class in the semester.', 'error');
        } else {
            showConfirmation('Are you sure you want to remove the only class in this semester?', 'warning', () => {
                semesterContainer.remove();
                semesterCount--;
                updateCalculateSemesterButtons();
            });
        }
    } else {
        element.closest('.class-item').remove();
    }
}

// Function to confirm removal of semester
function confirmRemoveSemester(semesterId) {
    showConfirmation('Are you sure you want to remove this semester? It will remove all class information entered for this semester.', 'warning', () => {
        document.getElementById(`classes-container-${semesterId}`).closest('.semester').remove();
        semesterCount--;
        updateCalculateSemesterButtons();
    });
}

// Function to confirm clearing semester data
function confirmClearSemester(semesterId) {
    showConfirmation('Are you sure you want to clear all class data for this semester?', 'warning', () => {
        const classesContainer = document.getElementById(`classes-container-${semesterId}`);
        classesContainer.innerHTML = `
            <div class="class-item form-row align-items-end mb-3">
                <div class="col-md-4 mb-3">
                    <label for="class-name-${semesterId}-1">Class Name</label>
                    <input type="text" class="form-control" id="class-name-${semesterId}-1" placeholder="Enter class name">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-grade-${semesterId}-1">Class Grade</label>
                    <select class="form-control" id="class-grade-${semesterId}-1">
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-type-${semesterId}-1">Class Type</label>
                    <select class="form-control" id="class-type-${semesterId}-1">
                        <option value="Regular">Regular</option>
                        <option value="Honors">Honors</option>
                        <option value="AP">AP</option>
                    </select>
                </div>
                <div class="col-md-2 mb-3 text-center">
                    <button class="btn btn-outline-danger" onclick="removeClass(this)"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });
}

// Function to handle importing previous GPAs
function addPreviousGPAInput() {
    const container = document.getElementById('previous-gpas-container');
    const gpaInputDiv = document.createElement('div');
    gpaInputDiv.className = 'form-group';
    gpaInputDiv.innerHTML = `
        <input type="number" step="0.001" class="form-control mt-2" placeholder="Enter GPA (e.g., 3.567)">
    `;
    container.appendChild(gpaInputDiv);
}

function importPreviousGPAs() {
    const container = document.getElementById('previous-gpas-container');
    const gpaInputs = container.querySelectorAll('input[type="number"]');
    previousGPAs = [];

    gpaInputs.forEach(input => {
        const gpa = parseFloat(input.value);
        if (!isNaN(gpa)) {
            previousGPAs.push(gpa);
        }
    });

    showAlert('Previous GPAs imported successfully.', 'success');
    $('#importGPAModal').modal('hide');
}

// Function to calculate GPA for a semester
function calculateSemesterGPA(semesterId) {
    const classesContainer = document.getElementById(`classes-container-${semesterId}`);
    const classItems = classesContainer.querySelectorAll('.class-item');
    const grades = [];

    classItems.forEach(classItem => {
        const letterGrade = classItem.querySelector(`[id^="class-grade"]`).value;
        const courseType = classItem.querySelector(`[id^="class-type"]`).value;
        if (letterGrade && courseType) {
            grades.push({ letterGrade, courseType });
        }
    });

    const semesterGPA = calculateGPA(grades);
    showAlert(`GPA for Semester ${semesterId}: ${semesterGPA}`, 'success');
}

// Function to calculate grade points
function getGradePoints(letterGrade, courseType) {
    const gradeScale = {
        "A+": 4.3, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "F": 0.0
    };

    let basePoints = gradeScale[letterGrade];
    if (courseType === "Honors") {
        basePoints += 0.5;
    } else if (courseType === "AP") {
        basePoints += 1.0;
    }
    return basePoints;
}

// Function to calculate GPA
function calculateGPA(grades) {
    let totalPoints = 0.0;
    let totalClasses = 0;

    grades.forEach(course => {
        const { letterGrade, courseType } = course;
        totalPoints += getGradePoints(letterGrade, courseType);
        totalClasses += 1;
    });

    if (totalClasses === 0) {
        return 0.0;
    }
    return (totalPoints / totalClasses).toFixed(decimalPlaces);
}

// Function to calculate cumulative GPA
function calculateCumulativeGPA() {
    const semesters = document.getElementsByClassName('semester');
    const allGrades = [];
    let totalGPA = 0.0;
    let totalCount = 0;

    Array.from(semesters).forEach((semester) => {
        const classItems = semester.querySelectorAll('.class-item');
        classItems.forEach((classItem) => {
            const className = classItem.querySelector(`[id^="class-name"]`).value;
            const letterGrade = classItem.querySelector(`[id^="class-grade"]`).value;
            const courseType = classItem.querySelector(`[id^="class-type"]`).value;

            if (className && letterGrade && courseType) {
                allGrades.push({ className, letterGrade, courseType });
            }
        });
    });

    // Calculate GPA from current semesters
    const currentGPA = calculateGPA(allGrades);
    if (currentGPA > 0) {
        totalGPA += parseFloat(currentGPA);
        totalCount++;
    }

    // Add previous GPAs
    previousGPAs.forEach(gpa => {
        totalGPA += gpa;
        totalCount++;
    });

    const cumulativeGPA = totalCount > 0 ? (totalGPA / totalCount).toFixed(decimalPlaces) : 0.0;
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Cumulative GPA: ${cumulativeGPA}`;
    resultElement.classList.add('visible');
}

// Function to update visibility of semester GPA calculation buttons
function updateCalculateSemesterButtons() {
    const calculateSemesterButtons = document.querySelectorAll('[id^="calculate-semester-gpa"]');
    if (semesterCount > 1) {
        calculateSemesterButtons.forEach(button => button.style.display = 'inline-block');
    } else {
        calculateSemesterButtons.forEach(button => button.style.display = 'none');
    }
}

// Function to show alerts
function showAlert(message, type) {
    const alertModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    document.getElementById('confirmationMessage').textContent = message;
    document.getElementById('confirmAction').style.display = 'none';
    alertModal.show();
}

// Function to show confirmation dialogs
function showConfirmation(message, type, onConfirm) {
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    document.getElementById('confirmationMessage').textContent = message;
    const confirmButton = document.getElementById('confirmAction');
    confirmButton.style.display = 'inline-block';
    confirmButton.onclick = () => {
        onConfirm();
        confirmationModal.hide();
    };
    confirmationModal.show();
}

// Function to open settings modal
function openSettings() {
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
    settingsModal.show();
}

// Function to apply settings
function applySettings() {
    const selectedDecimalPlaces = document.getElementById('decimal-places').value;
    decimalPlaces = parseInt(selectedDecimalPlaces, 10);
    showAlert(`Settings applied. GPA will now be calculated to ${decimalPlaces} decimal place(s).`, 'success');
}

// Function to confirm clearing all data
function confirmClearAll() {
    showConfirmation('Are you sure you want to clear all data? This action cannot be undone.', 'warning', () => {
        const semesterContainer = document.getElementById('semesters-container');
        semesterContainer.innerHTML = '';
        semesterCount = 1;
        addSemester();
        showAlert('All data has been cleared.', 'success');
        const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
        settingsModal.hide();
    });
}
