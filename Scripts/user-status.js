const loginButtons = document.querySelector(".button-logsign"); // Usa el contenedor correcto
const userIcon = document.getElementById("user-icon");
const userInitials = document.getElementById("user-initials");

function checkLoginStatus() {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");

    if (token && name) {
        loginButtons.classList.add("hidden");
        const initials = name
            .split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        userInitials.textContent = initials;
        userIcon.style.display = "flex";
    } else {
        loginButtons.classList.remove("hidden");
        userIcon.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
});
