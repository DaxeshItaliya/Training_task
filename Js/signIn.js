// Selector
const signInForm = document.getElementById("signInForm");

const profileImage = document.getElementById("profileImage");
const profileImageView = document.getElementById("profileImageView");
const username = document.getElementById("name");
const email = document.getElementById("email");
const contactNumber = document.getElementById("contactNumber");
const password = document.getElementById("password");
const address = document.getElementById("address");
const country = document.getElementById("country");


// Value Event Listener
signInForm.addEventListener("submit", signInFormSubmit);
profileImage.addEventListener("change", imagePick);
username.addEventListener("input", nameValidate);
email.addEventListener("input", emailValidate);
contactNumber.addEventListener("input", contactNumberValidate);
password.addEventListener("input", passwordValidate);
address.addEventListener("input", addressValidate);
country.addEventListener("input", countryValidate);

let imageFlag = 0;

async function uploadImage(url, method, bodyData) {
    const call = await fetch(url, {
        method: method,
        body: bodyData,
    });
    const result = await call.json();
    return result;
}

async function imagePick(event) {
    // If no file was selected, empty the preview <img>

    if (!event.target.files.length) {
        return 0;
    } else {
        photoLoaderController(1);
        try {
            let upload_image = (
                await uploadImage(
                    "https://www.filestackapi.com/api/store/S3?key=ATBK5hufCQc6s4lHAADbQz",
                    "POST",
                    event.target.files.item(0)
                )
            ).url;
            photoLoaderController(0);
            imageFlag = 1;
            profileImageView.src = upload_image;
            imageValidation();
        } catch (e) {
            alert("Some thing went wrong please try again")
            imageFlag = 0;
            imageValidation();
            photoLoaderController(0);
        }

    }
}

// Validation function
function imageValidation() {
    if (imageFlag == 0) {
        profileImageWarningController(1);
        return 0;
    }
    profileImageWarningController(0);
    return 1;
}

function nameValidate() {
    imageValidation();
    if (username.value.trim().length < 3) {
        nameWarningController(1, "Please Enter Full Name");
        return 0;
    } else if (/[^a-zA-Z\s]+/.test(username.value)) {
        nameWarningController(1, "Number is not allowed in name filed");
        return 0;
    } else {
        nameWarningController(0);
        return 1;
    }
}

function emailValidate() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        emailWarningController(0);
        return 1;
    } else {
        emailWarningController(1, "Please Enter Valid Email");
        return 0;
    }
}

function contactNumberValidate() {
    if (contactNumber.value.trim().length === 10) {
        numberWarningController(0);
        return 1;
    } else {
        numberWarningController(1, "Please Enter Valid Mobile number");
        return 0;
    }
}

function passwordValidate() {
    if (password.value.trim().length >= 8) {
        passWarningController(0);
        return 1;
    } else {
        passWarningController(1, "Please Enter minimum 8 digit Password");
        return 0;
    }
}

function addressValidate() {
    if (address.value.trim().length >= 10) {
        addressWarningController(0);
        return 1;
    } else {
        addressWarningController(1, "Please Enter full Address");
        return 0;
    }
}

function countryValidate() {
    if (country.value.trim() == "") {
        countryWarningController(1, "Please Enter Country Name");
        return 0;
    } else {
        countryWarningController(0);
        return 1;
    }
}

// Warning visibility Controller
function photoLoaderController(flag) {
    const photoLoader = document.getElementById("photoLoader");

    if (flag === 1) photoLoader.style.display = "flex";
    else photoLoader.style.display = "none";
}

function profileImageWarningController(flag) {
    const profileImageWarning = document.getElementById("profileImageWarning");
    if (flag == 1) {
        profileImageWarning.style.display = "block";
    } else {
        profileImageWarning.style.display = "none";
    }
}

function nameWarningController(flag, warning) {
    const nameWarning = document.getElementById("nameWarning");
    if (flag == 1) {
        nameWarning.style.display = "block";
        nameWarning.innerText = warning;
    } else {
        nameWarning.style.display = "none";
    }
}

function emailWarningController(flag, warning) {
    const emailWarning = document.getElementById("emailWarning");

    if (flag == 1) {
        emailWarning.style.display = "block";
        emailWarning.innerText = warning;
    } else {
        emailWarning.style.display = "none";
    }
}

function numberWarningController(flag, warning) {
    const numberWarning = document.getElementById("numberWarning");

    if (flag == 1) {
        numberWarning.style.display = "block";
        numberWarning.innerText = warning;
    } else {
        numberWarning.style.display = "none";
    }
}

function passWarningController(flag, warning) {
    const passWarning = document.getElementById("passWarning");

    if (flag == 1) {
        passWarning.style.display = "block";
        passWarning.innerText = warning;
    } else {
        passWarning.style.display = "none";
    }
}

function addressWarningController(flag, warning) {
    const addressWarning = document.getElementById("addressWarning");
    if (flag == 1) {
        addressWarning.style.display = "block";
        addressWarning.innerText = warning;
    } else {
        addressWarning.style.display = "none";
    }
}

function countryWarningController(flag, warning) {
    const countryWarning = document.getElementById("countryWarning");

    if (flag == 1) {
        countryWarning.style.display = "block";
        countryWarning.innerText = warning;
    } else {
        countryWarning.style.display = "none";
    }
}

// OnSubmit Form
function signInFormSubmit(event) {
    event.preventDefault();

    if (
        imageValidation() &&
        nameValidate() &&
        emailValidate() &&
        contactNumberValidate() &&
        passwordValidate() &&
        addressValidate() &&
        countryValidate()
    ) {
        countryWarningController(0);
        let userPassword = getCookie(email.value.trim() + "password");
        if (userPassword === "") {
            const d = new Date();
            d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();

            document.cookie = `${email.value.trim()}username=${username.value.trim()}; ${expires}; path=/`;
            document.cookie = `${email.value.trim()}email=${email.value.trim()}; ${expires}; path=/`;
            document.cookie = `${email.value.trim()}contactNumber=${contactNumber.value.trim()}; ${expires}; path=/`;
            document.cookie = `${email.value.trim()}password=${password.value.trim()}; ${expires}; path=/`;
            document.cookie = `${email.value.trim()}address=${address.value.trim()}; ${expires}; path=/`;
            document.cookie = `${email.value.trim()}country=${country.value.trim()}; ${expires}; path=/`;
            document.cookie = `${email.value.trim()}image=${
        profileImageView.src
      }; ${expires}; path=/`;
            alert("Your Account Successfully created ");
            window.location.replace("/index.html");
        } else {
            countryWarningController(1, "Your Account is already register");
        }
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