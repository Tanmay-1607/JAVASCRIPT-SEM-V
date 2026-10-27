
import { getTimeRemaining, formatDate } from "./scheduler.js";

const form = document.getElementById("scheduleForm");
const className = document.getElementById("className");
const classDate = document.getElementById("classDate");

const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const status = document.getElementById("status");

let countdownInterval = null;
let targetDate = null;

function updateCountdown() {
    if (!targetDate) {
        return;
    }

    const time = getTimeRemaining(targetDate);

    document.getElementById("days").textContent =
        String(time.days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(time.hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(time.minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(time.seconds).padStart(2, "0");

    if (time.expired) {
        status.textContent = "Your class time has arrived!";
        clearInterval(countdownInterval);
        countdownInterval = null;
    } else {
        status.textContent = "Countdown is running...";
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedName = className.value.trim();
    const selectedDate = new Date(classDate.value);

    if (!selectedName || !classDate.value ||
        Number.isNaN(selectedDate.getTime()) ||
        selectedDate.getTime() <= Date.now()) {
        status.textContent = "Please enter a valid future date and time.";
        return;
    }

    targetDate = selectedDate;

    eventTitle.textContent = selectedName;
    eventDate.textContent = formatDate(targetDate);

    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
});

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

classDate.min = now.toISOString().slice(0, 16);
