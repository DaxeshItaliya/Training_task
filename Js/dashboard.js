// Selector
const profileImage = document.getElementById("profileImage");
const profileImageView = document.getElementById("profileImageView");
const profileHeaderImg = document.getElementById("profileHeaderImg");
const tableList = document.getElementById("tableList");
const editPopup = document.getElementById("Edit-popup");
const updateForm = document.getElementById("updateForm");
const tableLoader = document.getElementById("tableLoader");
const addAgencyBtn = document.getElementById("addAgencyBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");
const countryListBox = document.getElementById("countryList");
const selectedCity = document.getElementById("selectedCity");
const searchName = document.getElementById("searchName");
const pageLeft = document.getElementById("pageLeft");
const pageRight = document.getElementById("pageRight");
const pageNumber = document.getElementById("pageNumber");

// Warning
const nameWarning = document.getElementById("nameWarning");
const emailWarning = document.getElementById("emailWarning");
const numberWarning = document.getElementById("numberWarning");
const passWarning = document.getElementById("passWarning");
const addressWarning = document.getElementById("addressWarning");
const countryWarning = document.getElementById("countryWarning");

// popup Form Input
const username = document.getElementById("name");
const email = document.getElementById("email");
const contactNumber = document.getElementById("contactNumber");
const address = document.getElementById("address");
const country = document.getElementById("country");
const logOutBtn = document.getElementById("logOutBtn");

// variable
let agencyList = [];
// let oldAgencyList = [];
let countryList = new Set();
let popupFlag = "notSet";
let USER;

let getDataUrl =
    "https://api.airtable.com/v0/appkvzNCBEX38b5Mb/Table%201?maxRecords=20&view=Grid%20view";

// Debouncing
const debouncingInput = function(delay) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            Filter(pageNumber.innerText.trim() - 1 + 1, context, args);
        }, delay);
    };
};

// Event listener
tableList.addEventListener("click", tableClick);
addAgencyBtn.addEventListener("click", addAgency);
deleteUserBtn.addEventListener("click", deleteUser);
updateForm.addEventListener("submit", updateEntry);
countryListBox.addEventListener("click", countryFilter);
searchName.addEventListener("input", debouncingInput(300));
profileImage.addEventListener("change", imagePick);
profileHeaderImg.addEventListener("click", profileBtnClick);
username.addEventListener("input", nameValidate);
email.addEventListener("input", emailValidate);
contactNumber.addEventListener("input", contactNumberValidate);
address.addEventListener("input", addressValidate);
country.addEventListener("input", countryValidate);
logOutBtn.addEventListener("click", logOut);
pageRight.addEventListener("click", () =>
    Filter(pageNumber.innerText.trim() - 1 + 2)
);

pageLeft.addEventListener("click", () =>
    Filter(pageNumber.innerText.trim() - 1)
);

function imagePick(event) {
    // If no file was selected, empty the preview <img>
    console.log(event.target.files.item(0));
    if (!event.target.files.length) return (imgElement.src = "");
    return (profileImageView.src = URL.createObjectURL(
        event.target.files.item(0)
    ));
}

(async function call() {
    autoLoginCheck();
    tableLoaderController(1);
    getTableEntries((await getData(getDataUrl)).records);
})();

function autoLoginCheck() {
    USER = getCookie("current");
    if (USER == "") {
        window.location.replace("/index.html");
    } else {
        setName(getCookie(USER + "username"));
    }
}

// Validation function
function nameValidate() {
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
function nameWarningController(flag, warning) {
    if (flag == 1) {
        nameWarning.style.display = "block";
        nameWarning.innerText = warning;
    } else {
        nameWarning.style.display = "none";
    }
}

function emailWarningController(flag, warning) {
    if (flag == 1) {
        emailWarning.style.display = "block";
        emailWarning.innerText = warning;
    } else {
        emailWarning.style.display = "none";
    }
}

function numberWarningController(flag, warning) {
    if (flag == 1) {
        numberWarning.style.display = "block";
        numberWarning.innerText = warning;
    } else {
        numberWarning.style.display = "none";
    }
}

function addressWarningController(flag, warning) {
    if (flag == 1) {
        addressWarning.style.display = "block";
        addressWarning.innerText = warning;
    } else {
        addressWarning.style.display = "none";
    }
}

function countryWarningController(flag, warning) {
    if (flag == 1) {
        countryWarning.style.display = "block";
        countryWarning.innerText = warning;
    } else {
        countryWarning.style.display = "none";
    }
}

// Url Call
async function getData(url) {
    const call = await fetch(url, {
        headers: {
            Authorization: "Bearer keybfuV1p2xIjEABW",
        },
    });
    const result = await call.json();
    return result;
}

async function updateData(url, method, bodyData) {
    const call = await fetch(url, {
        method: method,
        headers: {
            Authorization: "Bearer keybfuV1p2xIjEABW",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
    });
    const result = await call.json();
    return result;
}

// Get Function
function getTableEntries(entries) {
    // Add new Data
    countryList = new Set();
    agencyList = [];
    countryList.add("All Country");
    for (let i = entries.length - 1; i >= 0; i--) {
        agencyList.unshift(
            new RECORD(
                i + 1,
                entries[i].id,
                entries[i].fields.Name,
                entries[i].fields.Email,
                entries[i].fields.Phone,
                entries[i].fields.Address,
                entries[i].fields.Country
            )
        );
        countryList.add(entries[i].fields.Country);
        // addTableRow(agencyList[0], 1);
    }
    // oldAgencyList = agencyList;
    setCountryList(countryList);
    Filter(1);
}

// Set Function

function addTableRow(entry, atIndex) {
    let row = tableList.insertRow(atIndex);
    let index = row.insertCell(0);
    let name = row.insertCell(1);
    let email = row.insertCell(2);
    let phone = row.insertCell(3);
    let address = row.insertCell(4);
    let country = row.insertCell(5);
    let image = row.insertCell(6);
    let action = row.insertCell(7);
    index.classList.add("tbIndex");
    action.classList.add("tbAction");
    action.innerHTML = "<button class='editBtn'>Edit</button>";
    index.innerText = entry.index;
    name.innerText = entry.name;
    email.innerText = entry.email;
    phone.innerText = entry.phone;
    address.innerText = entry.address;
    country.innerText = entry.country;
}

function setName(currentUserName) {
    const userFname = document.getElementById("userFname");
    const userLname = document.getElementById("userLname");
    const name = currentUserName.split(" ");

    if (name.length >= 2) {
        userFname.innerText = name[0];
        userLname.innerText = name[1];
        userLname.style.display = "block";
    } else {
        userFname.innerText = name[0];
        userLname.style.display = "none";
    }
}

function cleanTableData() {
    var tableHeaderRowCount = 1;
    var rowCount = tableList.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tableList.deleteRow(tableHeaderRowCount);
    }
}

function setCountryList(list, page) {
    let countryListDropDown = document.getElementById("countryList");
    countryListDropDown.innerHTML = "";
    for (let item of list) {
        let entry = document.createElement("li");
        entry.innerText = item;
        countryListDropDown.appendChild(entry);
    }
    tableLoaderController(0);
}

// on Edit button Click
function setInEditPopup(index) {
    popupFlag = "editAgency";
    document.getElementById("id").value = agencyList[index - 1].id;
    document.getElementById("name").value = agencyList[index - 1].name;
    document.getElementById("email").value = agencyList[index - 1].email;
    document.getElementById("contactNumber").value = agencyList[index - 1].phone;
    document.getElementById("address").value = agencyList[index - 1].address;
    document.getElementById("country").value = agencyList[index - 1].country;
    document.getElementById("submitBtn").innerText = "Update Data";
    popupController(1);
}

function addAgency() {
    popupFlag = "addAgency";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contactNumber").value = "";
    document.getElementById("address").value = "";
    document.getElementById("country").value = "";
    document.getElementById("submitBtn").innerText = "Add User";
    popupController(1);
}

function profileBtnClick() {
    popupFlag = "profile";
    document.getElementById("name").value = getCookie(USER + "username");
    document.getElementById("email").value = getCookie(USER + "email");
    document.getElementById("contactNumber").value = getCookie(
        USER + "contactNumber"
    );
    document.getElementById("address").value = getCookie(USER + "address");
    document.getElementById("country").value = getCookie(USER + "country");
    document.getElementById("submitBtn").innerText = "Update Profile";
    popupController(2);
}

// function
function tableClick(event) {
    let target = event.target;
    let raw = target.parentElement.parentElement.cells;
    if (target.classList[0] == "editBtn") setInEditPopup(raw[0].innerText);
}

async function updateEntry(event) {
    event.preventDefault();
    let body;

    try {
        if (popupFlag === "addAgency") {
            popupController(0);
            tableLoaderController(1);
            body = {
                records: [{
                    fields: {
                        Name: updateForm.elements["name"].value,
                        Email: updateForm.elements["email"].value,
                        Phone: updateForm.elements["contactNumber"].value,
                        Address: updateForm.elements["address"].value,
                        Country: updateForm.elements["country"].value,
                    },
                }, ],
            };
            let response = (
                await updateData(
                    "https://api.airtable.com/v0/appkvzNCBEX38b5Mb/Table%201",
                    "POST",
                    body
                )
            ).records[0];

            getTableEntries((await getData(getDataUrl)).records);
        } else if (popupFlag === "profile") {
            if (
                nameValidate() &&
                emailValidate() &&
                contactNumberValidate() &&
                addressValidate() &&
                countryValidate()
            ) {
                const d = new Date();
                d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
                let expires = "expires=" + d.toUTCString();
                document.cookie = `${email.value.trim()}username=${username.value.trim()}; ${expires}; path=/`;
                document.cookie = `${email.value.trim()}email=${email.value.trim()}; ${expires}; path=/`;
                document.cookie = `${email.value.trim()}contactNumber=${contactNumber.value.trim()}; ${expires}; path=/`;
                document.cookie = `${email.value.trim()}address=${address.value.trim()}; ${expires}; path=/`;
                document.cookie = `${email.value.trim()}country=${country.value.trim()}; ${expires}; path=/`;
                alert("Profile Data Updated");
                popupController(0);
                setName(username.value.trim());
            }
        } else {
            body = {
                records: [{
                    id: updateForm.elements["id"].value,
                    fields: {
                        Name: updateForm.elements["name"].value,
                        Email: updateForm.elements["email"].value,
                        Phone: updateForm.elements["contactNumber"].value,
                        Address: updateForm.elements["address"].value,
                        Country: updateForm.elements["country"].value,
                    },
                }, ],
            };

            let response = await updateData(
                "https://api.airtable.com/v0/appkvzNCBEX38b5Mb/Table%201",
                "PATCH",
                body
            );
            getTableEntries((await getData(getDataUrl)).records);
            popupController(0);
            tableLoaderController(1);
        }

        // tableLoaderController(1);
        // getTableEntries((await getData(getDataUrl)).records);
    } catch (e) {
        console.log(e);
    }
}

async function deleteUser() {
    try {
        popupController(0);
        tableLoaderController(1);
        body = {
            id: updateForm.elements["id"].value,
            deleted: true,
        };

        let response = await updateData(
            "https://api.airtable.com/v0/appkvzNCBEX38b5Mb/Table%201/recK0gvvZddXJRZdm",
            "DELETE",
            body
        );
        getTableEntries((await getData(getDataUrl)).records);
    } catch (e) {
        console.log(e);
    }
}

/******************************** 
        Filter 
        *********************************/

function countryFilter(event) {
    let country = event.target.innerText;
    selectedCity.innerText = country;
    Filter(pageNumber.innerText.trim() - 1 + 1);
}

function Filter(page) {
    pageNumber.innerText = page;
    console.log(page);
    let userName = searchName.value.trim();
    let countryName = selectedCity.innerText;
    let countryFlag = 0;
    let nameFlag = 0;

    if (userName == "") {
        nameFlag = 1;
    }

    if (countryName === "All Country") {
        countryFlag = 1;
    }

    diff = 10;
    cleanTableData();
    let index = 0;
    for (
        let i = (page - 1) * diff; i < agencyList.length && i < page * diff; i++
    ) {
        if (
            (countryFlag == 1 || agencyList[i].country == countryName) &&
            (nameFlag == 1 || agencyList[i].name.toLowerCase().startsWith(userName))
        ) {
            // agencyList.push(entry);
            addTableRow(agencyList[i], ++index);
        }
    }

    if (page == 1) {
        pageLeft.style.background = "#7d5acf";
    } else {
        pageLeft.style.background = "#40189d";
    }

    if (page * diff + 1 <= agencyList.length) {
        pageRight.style.background = "#40189d";
    } else {
        pageRight.style.background = "#7d5acf";
    }
}

// VIsibility Controller
function popupController(flag) {
    if (flag === 2) document.getElementById("logOutBtn").style.display = "block";
    else document.getElementById("logOutBtn").style.display = "none";
    if (flag === 0) editPopup.style.display = "none";
    else editPopup.style.display = "flex";
}

function tableLoaderController(flag) {
    if (flag === 1) tableLoader.style.display = "flex";
    else tableLoader.style.display = "none";
}

// Model
function RECORD(index, id, name, email, phone, address, country) {
    this.index = index;
    this.name = name;
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.country = country;
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

function logOut() {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = `current=;${expires}; path=/`;
    alert("User Log Out");
    window.location.replace("/index.html");
}