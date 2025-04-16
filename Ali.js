document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const grade = document.getElementById('grade').value;

    // Check if ID already exists
    const existingStudents = JSON.parse(localStorage.getItem('students')) || [];
    if (existingStudents.some(student => student.id === id)) {
        alert('Student ID already exists!');
        return;
    }

    // Add new student
    const student = { name, id, grade };
    existingStudents.push(student);
    localStorage.setItem('students', JSON.stringify(existingStudents));

    // Clear form
    document.getElementById('studentForm').reset();

    // Update table
    displayStudents();
});

function displayStudents() {
    const studentTableBody = document.getElementById('studentTableBody');
    const students = JSON.parse(localStorage.getItem('students')) || [];

    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.grade}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        studentTableBody.appendChild(row);
    });
}

function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Load students on page load
document.addEventListener('DOMContentLoaded', displayStudents);