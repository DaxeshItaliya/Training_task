// Selector
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const warningMessage = document.getElementById("warning");

console.log(getCookie("current"));

(function autoLoginCheck() {
    let userPassword = getCookie("current");
    if (userPassword != "") {
        window.location.replace("/dashboard.html");
    }
})();
// event listener
loginForm.addEventListener("submit", login);

function login(event) {
    event.preventDefault();
    warningController(0);
    let userPassword = getCookie(email.value.trim() + "password");
    if (userPassword === "") {
        warningController(1, "Your Account is not register");
    } else if (userPassword !== password.value.trim()) {
        warningController(1, "Wrong Password");
    } else {
        const d = new Date();
        d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = `current=${email.value.trim()}; ${expires}; path=/`;
        window.location.replace("/dashboard.html");
    }
}

function warningController(flag, warning) {
    if (flag == 1) {
        warningMessage.style.visibility = "visible";
        warningMessage.innerText = warning;
    } else {
        warningMessage.style.visibility = "hidden";
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}