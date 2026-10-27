let globalStorage = {};

const form = document.getElementById("concertForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const genreInput = document.getElementById("genre");
const dateInput = document.getElementById("date");
const ticketsInput = document.getElementById("tickets");
const messageInput = document.getElementById("message");
const termsInput = document.getElementById("terms");

const result = document.getElementById("result");

const saveLocalBtn = document.getElementById("saveLocal");
const saveSessionBtn = document.getElementById("saveSession");
const loadDataBtn = document.getElementById("loadData");
const clearDataBtn = document.getElementById("clearData");


function getFormData() {

    let session = document.querySelector(
        'input[name="session"]:checked'
    );

    return {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        age: ageInput.value,
        city: cityInput.value,
        genre: genreInput.value,
        date: dateInput.value,
        tickets: ticketsInput.value,
        session: session ? session.value : "",
        message: messageInput.value,
        terms: termsInput.checked
    };
}


function fillForm(data) {

    nameInput.value = data.name || "";
    emailInput.value = data.email || "";
    phoneInput.value = data.phone || "";
    ageInput.value = data.age || "";
    cityInput.value = data.city || "";
    genreInput.value = data.genre || "";
    dateInput.value = data.date || "";
    ticketsInput.value = data.tickets || "";
    messageInput.value = data.message || "";
    termsInput.checked = data.terms || false;

    if (data.session) {

        let session = document.querySelector(
            'input[name="session"][value="' + data.session + '"]'
        );

        if (session) {
            session.checked = true;
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

    phoneInput.value =
        phoneInput.value.replace(/[^0-9]/g, "");

});


ageInput.addEventListener("change", function () {

    result.textContent =
        "Age selected: " + ageInput.value;

});


genreInput.addEventListener("change", function () {

    result.textContent =
        "Selected Genre: " + genreInput.value;

});


ticketsInput.addEventListener("change", function () {

    result.textContent =
        "Number of Tickets: " + ticketsInput.value;

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
        "concertData",
        JSON.stringify(data)
    );

    globalStorage = data;

    result.textContent =
        "Concert data saved in Local Storage.";

    result.className = "success";

});


saveSessionBtn.addEventListener("click", function () {

    let data = getFormData();

    sessionStorage.setItem(
        "concertData",
        JSON.stringify(data)
    );

    globalStorage = data;

    result.textContent =
        "Concert data saved in Session Storage.";

    result.className = "success";

});


loadDataBtn.addEventListener("click", function () {

    let data =
        localStorage.getItem("concertData") ||
        sessionStorage.getItem("concertData");

    if (data) {

        data = JSON.parse(data);

        globalStorage = data;

        fillForm(data);

        result.textContent =
            "Saved concert data loaded successfully.";

        result.className = "success";

    } else {

        result.textContent =
            "No saved data found.";

        result.className = "error";

    }

});


clearDataBtn.addEventListener("click", function () {

    localStorage.removeItem("concertData");

    sessionStorage.removeItem("concertData");

    globalStorage = {};

    result.textContent =
        "Local, Session and Global Storage cleared.";

    result.className = "success";

});


form.addEventListener("submit", function (event) {

    event.preventDefault();

    let data = getFormData();

    if (
        data.name === "" ||
        data.email === "" ||
        data.phone === "" ||
        data.age === "" ||
        data.city === "" ||
        data.genre === "" ||
        data.date === "" ||
        data.tickets === "" ||
        data.session === "" ||
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
        "concertData",
        JSON.stringify(data)
    );


    result.textContent =
        "Concert registration successful!";

    result.className = "success";

});


form.addEventListener("reset", function () {

    setTimeout(function () {

        result.textContent =
            "Form has been reset.";

        result.className = "";

    }, 0);

});