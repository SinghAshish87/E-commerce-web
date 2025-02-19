// Function to toggle navigation menu
function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    menu.classList.toggle("show");
}

// Function to toggle dropdowns
function toggleDropdown(dropdownId, element) {
    var dropdown = document.getElementById(dropdownId);
    var allDropdowns = document.querySelectorAll(".dropdown-menu");

    // Hide other dropdowns
    allDropdowns.forEach(function (item) {
        if (item !== dropdown) {
            item.style.display = "none";
        }
    });

    // Toggle selected dropdown
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    var menu = document.getElementById("nav-menu");
    var menuBtn = document.querySelector(".menu-btn");

    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove("show");
    }
});
