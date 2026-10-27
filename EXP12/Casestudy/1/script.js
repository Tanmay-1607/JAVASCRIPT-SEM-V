
document.addEventListener("DOMContentLoaded", function () {
    const heading = document.querySelector("h1");

    heading.addEventListener("click", function () {
        alert("Welcome to Smart India Hackathon!");
    });

    const links = document.querySelectorAll("nav a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            console.log("Navigation selected: " + link.textContent);
        });
    });
});
