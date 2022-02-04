// Selector
const tableList = document.getElementById("tableList");
const editPopup = document.getElementById("Edit-popup");
const updateForm = document.getElementById("updateForm");
const tableLoader = document.getElementById("tableLoader");
const addAgencyBtn = document.getElementById("addAgencyBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");
const countryListBox = document.getElementById("countryList");
const selectedCity = document.getElementById("selectedCity");
const searchName = document.getElementById("searchName");

let agencyList = [];
let oldAgencyList = [];
let countryList = new Set();
let popupFlag = "notSet";

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
            Filter(context, args);
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

(async function call() {
    tableLoaderController(1);
    getTableEntries((await getData(getDataUrl)).records);
})();

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
    oldAgencyList = agencyList;
    setCountryList(countryList);
    Filter();
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

function cleanTableData() {
    var tableHeaderRowCount = 1;
    var rowCount = tableList.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tableList.deleteRow(tableHeaderRowCount);
    }
}

function setCountryList(list) {
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

// function
function tableClick(event) {
    let target = event.target;
    let raw = target.parentElement.parentElement.cells;
    if (target.classList[0] == "editBtn") setInEditPopup(raw[0].innerText);
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

async function updateEntry(event) {
    event.preventDefault();
    let body;

    try {
        popupController(0);
        tableLoaderController(1);
        if (popupFlag == "addAgency") {
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
        }

        popupController(0);
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
    Filter();
}

function Filter() {
    let userName = searchName.value.trim();
    let countryName = selectedCity.innerText;
    console.log(countryName);
    let countryFlag = 0;
    let nameFlag = 0;

    if (userName == "") {
        nameFlag = 1;
    }

    if (countryName === "All Country") {
        countryFlag = 1;
    }

    cleanTableData();
    let index = 0;
    for (let entry of oldAgencyList) {
        console.log("1 -> " + countryFlag == 1 || entry.country == countryName);
        console.log(
            "2 -> " + nameFlag == 1 || entry.name.toLowerCase().startsWith(userName)
        );

        if (
            (countryFlag == 1 || entry.country == countryName) &&
            (nameFlag == 1 || entry.name.toLowerCase().startsWith(userName))
        ) {
            addTableRow(entry, ++index);
        }
    }
}

// VIsibility Controller
function popupController(flag) {
    if (flag === 1) editPopup.style.display = "flex";
    else editPopup.style.display = "none";
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