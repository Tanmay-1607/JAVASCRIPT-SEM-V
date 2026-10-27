let globalStorage = {};

const form = document.getElementById("workshopForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const collegeInput = document.getElementById("college");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const workshopInput = document.getElementById("workshop");
const dateInput = document.getElementById("date");
const messageInput = document.getElementById("message");
const termsInput = document.getElementById("terms");

const result = document.getElementById("result");

const saveLocalBtn = document.getElementById("saveLocal");
const saveSessionBtn = document.getElementById("saveSession");
const loadDataBtn = document.getElementById("loadData");
const clearDataBtn = document.getElementById("clearData");
const resetBtn = document.getElementById("resetBtn");


function getFormData() {

    let ticket = document.querySelector(
        'input[name="ticket"]:checked'
    );

    return {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        college: collegeInput.value,
        course: courseInput.value,
        year: yearInput.value,
        workshop: workshopInput.value,
        date: dateInput.value,
        ticket: ticket ? ticket.value : "",
        message: messageInput.value,
        terms: termsInput.checked
    };
}


function fillForm(data) {

    nameInput.value = data.name || "";
    emailInput.value = data.email || "";
    phoneInput.value = data.phone || "";
    collegeInput.value = data.college || "";
    courseInput.value = data.course || "";
    yearInput.value = data.year || "";
    workshopInput.value = data.workshop || "";
    dateInput.value = data.date || "";
    messageInput.value = data.message || "";
    termsInput.checked = data.terms || false;

    if (data.ticket) {
        let ticket = document.querySelector(
            'input[name="ticket"][value="' + data.ticket + '"]'
        );

        if (ticket) {
            ticket.checked = true;
        }
    }
}


nameInput.addEventListener("focus", function () {
    nameInput.style.borderColor = "#2563eb";
});


nameInput.addEventListener("blur", function () {
    if (nameInput.value.trim() === "") {
        nameInput.style.borderColor = "#ef4444";
    } else {
        nameInput.style.borderColor = "#22c55e";
    }
});


emailInput.addEventListener("input", function () {

    if (emailInput.value.includes("@")) {
        emailInput.style.borderColor = "#22c55e";
    } else {
        emailInput.style.borderColor = "#ef4444";
    }

});


phoneInput.addEventListener("input", function () {

    phoneInput.value = phoneInput.value.replace(
        /[^0-9]/g,
        ""
    );

});


yearInput.addEventListener("change", function () {

    result.textContent =
        "Selected Year: " + yearInput.value;

});


workshopInput.addEventListener("change", function () {

    result.textContent =
        "Selected Workshop: " + workshopInput.value;

});


termsInput.addEventListener("change", function () {

    if (termsInput.checked) {
        result.textContent =
            "Terms and conditions accepted.";
    } else {
        result.textContent =
            "Please accept the terms and conditions.";
    }

});


saveLocalBtn.addEventListener("click", function () {

    let data = getFormData();

    localStorage.setItem(
        "workshopData",
        JSON.stringify(data)
    );

    globalStorage = data;

    result.textContent =
        "Data saved in Local Storage.";
    result.className = "success";

});


saveSessionBtn.addEventListener("click", function () {

    let data = getFormData();

    sessionStorage.setItem(
        "workshopData",
        JSON.stringify(data)
    );

    globalStorage = data;

    result.textContent =
        "Data saved in Session Storage.";
    result.className = "success";

});


loadDataBtn.addEventListener("click", function () {

    let data =
        localStorage.getItem("workshopData") ||
        sessionStorage.getItem("workshopData");

    if (data) {

        data = JSON.parse(data);

        globalStorage = data;

        fillForm(data);

        result.textContent =
            "Saved data loaded successfully.";

        result.className = "success";

    } else {

        result.textContent =
            "No saved data found.";

        result.className = "error";
    }

});


clearDataBtn.addEventListener("click", function () {

    localStorage.removeItem("workshopData");

    sessionStorage.removeItem("workshopData");

    globalStorage = {};

    result.textContent =
        "Local Storage, Session Storage and Global Storage cleared.";

    result.className = "success";

});


form.addEventListener("submit", function (event) {

    event.preventDefault();

    let data = getFormData();

    if (
        data.name === "" ||
        data.email === "" ||
        data.phone === "" ||
        data.college === "" ||
        data.course === "" ||
        data.year === "" ||
        data.workshop === "" ||
        data.date === "" ||
        data.ticket === "" ||
        !data.terms
    ) {

        result.textContent =
            "Please fill all required fields.";

        result.className = "error";

        return;
    }

    if (!data.email.includes("@")) {

        result.textContent =
            "Please enter a valid email address.";

        result.className = "error";

        return;
    }

    globalStorage = data;

    localStorage.setItem(
        "workshopData",
        JSON.stringify(data)
    );

    result.textContent =
        "Technical Workshop ticket booked successfully!";

    result.className = "success";

});


form.addEventListener("reset", function () {

    setTimeout(function () {

        result.textContent =
            "Form has been reset.";

        result.className = "";

    }, 0);

});