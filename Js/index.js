// Elements
const loader = document.getElementById("loader");
const cityDropDownList = document.getElementById("placeList");
const placeList = document.getElementById("placeList");
const selectedPlaceItem = document.getElementById("selectedPlaceItem");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const goBtn = document.querySelector(".goBtn");

(async function getDataList() {
  try {
    //   Set Date
    setDate();

    // set City List
    setCityDropDown(
      (
        await getItemList(
          "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json"
        )
      ).city
    );

    setPlaceCard(
      await getItemList(
        "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/make-your-trip-package.json"
      )
    );

    // set Date
  } catch (e) {
    console.log(e);
  }
})();

// Event Lister
placeList.addEventListener("click", selectCity);
goBtn.addEventListener("click", getPlaceDetails);

// get Items
async function getItemList(url) {
  let cityApiCall = await fetch(url);
  return await cityApiCall.json();
}

function getDayName(day) {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
  }
}

async function getPlaceDetails() {
  await setWetherDetails(selectedPlaceItem.innerText);
}

function getMonthName(month) {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
}

// set Items
function setCityDropDown(list) {
  cityDropDownList.innerHTML = "";
  setWetherDetails(list[0].name);
  selectedPlaceItem.innerText = list[0].name;
  for (let entry of list) {
    const item = document.createElement("li");
    item.classList.add("cityItem");
    item.appendChild(document.createTextNode(entry.name));
    cityDropDownList.appendChild(item);
  }
}

function setDate() {
  let today = new Date();
  let date = document.getElementById("date");
  let day = document.getElementById("day");
  let monthYear = document.getElementById("monthYear");

  date.innerText = today.getDate();
  day.innerText = getDayName(today.getDay());
  monthYear.innerText =
    getMonthName(today.getMonth()) + ", " + today.getFullYear();
}

function selectCity(event) {
  console.log(placeList.classList.add());
  let target = event.target;
  if (target.classList[0] == "cityItem") {
    selectedPlaceItem.innerText = target.innerText;
    placeListControl(0);
  }
}

function setPlaceCard(list) {
  let cardHolder = document.getElementById("cardHolder");
  cardHolder.innerHTML = "";

  for (let x of list) {
    let card = document.createElement("card");
    card.classList.add("card");

    let bookMark = document.createElement("i");
    bookMark.classList.add("bookMark");
    bookMark.classList.add("fas");
    bookMark.classList.add("cardCategory");
    card.appendChild(bookMark);

    //   Header
    let cardHeader = document.createElement("div");

    let cardHeading = document.createElement("p");
    cardHeading.innerText = x.cityName;
    cardHeading.classList.add("dark-font");
    cardHeading.classList.add("medium-font");
    cardHeading.classList.add("bold-font");
    cardHeading.classList.add("cardHeading");

    let cardDate = document.createElement("p");
    cardDate.innerText = x.tourDate;
    cardDate.classList.add("cardDate");

    let cardCategory = document.createElement("p");
    cardCategory.innerText = x.category;
    cardCategory.classList.add("cardCategory");

    cardHeader.appendChild(cardHeading);
    cardHeader.appendChild(cardDate);
    cardHeader.appendChild(cardCategory);

    card.appendChild(cardHeader);

    // Card Temperature
    let temperatureDiv = document.createElement("div");
    temperatureDiv.classList.add("cardTemperature");

    let label = document.createElement("p");
    label.classList.add("label");
    label.innerText = "Average Temperature";

    let line = document.createElement("div");
    line.classList.add("line");

    let temperature = document.createElement("p");
    temperature.classList.add("dark-font");
    temperature.classList.add("medium-font");
    temperature.classList.add("bold-font");
    temperature.classList.add("temperatureText");
    temperature.innerHTML = "+ " + x.temp + "&#8451";

    let temperatureImage = document.createElement("img");
    temperatureImage.src = "/image/sunIcon.png";
    temperatureImage.style.height = "20px";

    temperature.appendChild(temperatureImage);

    temperatureDiv.appendChild(label);
    temperatureDiv.appendChild(line);
    temperatureDiv.appendChild(temperature);

    card.appendChild(temperatureDiv);

    // Card Image
    let cardImage = document.createElement("img");
    cardImage.classList.add("cardImage");
    cardImage.src = x.cityImg;

    card.appendChild(cardImage);

    // Card Bottom
    let cardBottom = document.createElement("div");
    cardBottom.classList.add("cardBottom");

    let priceDiv = document.createElement("div");

    let priceLabel = document.createElement("p");
    priceLabel.classList.add("label");
    priceLabel.innerText = "Total Price";

    let price = document.createElement("p");
    price.classList.add("bold-font");
    price.innerText = x.price;

    priceDiv.appendChild(priceLabel);
    priceDiv.appendChild(price);

    cardBottom.appendChild(priceDiv);

    let exploreBtn = document.createElement("button");
    exploreBtn.classList.add("exploreBtn");
    exploreBtn.innerText = "Explore";

    cardBottom.appendChild(exploreBtn);

    card.appendChild(cardBottom);

    cardHolder.appendChild(card);
  }
}

async function setWetherDetails(city) {
  // Get let log using mapbox
  loader.style.display = "flex";
  cityName.innerText = city;
  const latLong = (
    await getItemList(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        city +
        ".json?access_token=pk.eyJ1Ijoic2h1YmhhbWhpcmFuaTQ1IiwiYSI6ImNreTN3OHBiaTA2OXoyd3E5YjJ2b2xicWkifQ.hQfD_1Mmlpta37azNXVyvQ"
    )
  ).features[0].center;

  // get Wether using lat long

  const Wether = await getItemList(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      latLong[1] +
      "&lon=" +
      latLong[0] +
      "&exclude=hourly,daily&units=metric&appid=d57f8c3baf6bb12c1c6f23e9e1315929"
  );
  console.log(Wether.current.weather[0].icon);
  const icon = document.getElementById("wetherStatus");
  icon.src =
    "https://openweathermap.org/img/wn/" +
    Wether.current.weather[0].icon +
    "@2x.png";

  temperature.innerText = Wether.current.temp;
  loader.style.display = "none";
}

// Element controller
function placeListControl(flag) {
  if (flag === 1) {
    placeList.style.display = "block";
  } else {
    placeList.style.display = "none";
  }
}

// // Model
// function CITY(id, name, topListed, airportCode, secondaryAirportCode) {
//   this.id = id;
//   this.name = name;
//   this.topListed = topListed;
//   this.airportCode = airportCode;
//   this.secondaryAirportCode = secondaryAirportCode;
// }

// function PLACE(cityName, tourDate, category, temp, cityImg, price, isBookmark) {
//   this.cityName = cityName;
//   this.tourDate = tourDate;
//   this.category = category;
//   this.temp = temp;
//   this.cityImg = cityImg;
//   this.price = price;
//   this.isBookmark = isBookmark;
// }
