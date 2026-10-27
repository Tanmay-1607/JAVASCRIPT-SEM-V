function addEmployee() {

    let employeeId = document.getElementById("employeeId").value;
    let employeeName = document.getElementById("employeeName").value;
    let department = document.getElementById("department").value;
    let salary = document.getElementById("salary").value;

    if (employeeId === "" || employeeName === "" || department === "" || salary === "") {
        alert("Please enter all employee details.");
        return;
    }

    let employee = {
        employeeId: employeeId,
        employeeName: employeeName,
        department: department,
        salary: salary
    };

    let jsonData = JSON.stringify(employee, null, 4);

    document.getElementById("jsonOutput").textContent = jsonData;

    let tableBody = document.getElementById("employeeTableBody");

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${employee.employeeId}</td>
        <td>${employee.employeeName}</td>
        <td>${employee.department}</td>
        <td>₹${employee.salary}</td>
    `;

    tableBody.appendChild(row);

    document.getElementById("employeeId").value = "";
    document.getElementById("employeeName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";
}


function loadEmployees() {

    fetch("employees.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load employees.json");
            }

            return response.json();
        })

        .then(data => {

            let tableBody = document.getElementById("employeeTableBody");

            tableBody.innerHTML = "";

            data.forEach(employee => {

                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${employee.employeeId}</td>
                    <td>${employee.employeeName}</td>
                    <td>${employee.department}</td>
                    <td>₹${employee.salary}</td>
                `;

                tableBody.appendChild(row);
            });

        })

        .catch(error => {
            console.error(error);
            alert("Error loading employee data. Run the project using Live Server.");
        });
}